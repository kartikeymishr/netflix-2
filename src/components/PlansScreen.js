import '../styles/plansscreen.css'
import {useEffect, useState} from "react";
import db from '../firebase'
import {addDoc, collection, getDocs, onSnapshot, query, where} from "firebase/firestore"
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {loadStripe} from "@stripe/stripe-js";

const PlansScreen = () => {
    const [products, setProducts] = useState([])
    const [subscription, setSubscription] = useState(null)
    const {user} = useSelector(selectUser)

    useEffect(() => {
        const colRef = collection(db, "products");
        const whereClause = where("active", "==", true);
        const qProduct = query(colRef, whereClause);

        (async () => {
            const productSnap = await getDocs(qProduct)
            const mappedProducts = {}
            productSnap.forEach((productDoc) => {
                mappedProducts[productDoc.id] = productDoc.data()
                const subColRef = collection(db, "products", productDoc.id, "prices");
                (async () => {
                    const qPrice = query(subColRef, whereClause)
                    const pricesSnap = await getDocs(qPrice)
                    pricesSnap.forEach((priceDoc) => {
                        mappedProducts[productDoc.id].price = {
                            priceId: priceDoc.id,
                            priceData: priceDoc.data()
                        }
                    })
                })()
            })

            setProducts(mappedProducts)
        })()
    }, [])

    useEffect(() => {
        const colRef = collection(db, "customers", user.uid, "subscriptions");

        (async () => {
            const subsSnap = await getDocs(query(colRef))
            subsSnap.forEach((sub) => {
                setSubscription({
                    role: sub.data().role,
                    current_period_end: sub.data().current_period_end.seconds,
                    current_period_start: sub.data().current_period_start.seconds
                })
            })
        })()
    }, [user.uid])

    const loadCheckout = async (priceId) => {
        const docRef = await addDoc(
            collection(db, "customers", user.uid, "checkout_sessions"), {
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            })

        onSnapshot(docRef, (snap) => {
            const {error, sessionId} = snap.data()
            if (error) {
                // Show an error to your customer and
                // Inspect your Cloud Function logs in the Firebase Console
                alert(`An Error Occurred :: ${error.message}`)
            }

            if (sessionId) {
                // We have a session, let's redirect to Checkout
                // Init Stripe
                console.log("session id receieved. redirecting to checkout url");
                (async () => {
                    const stripe = await loadStripe('pk_test_51Luy3SSIG6GogvfEtUZWglpfivExKT1RdmETdqS1pdcr7ErofFhpkRck7IGbcj7kscVF2QGQYvEYUZhezyguwSRL00fyR5ASX6')
                    stripe.redirectToCheckout({sessionId}).then(r => console.log(r)).catch((err) => console.error(err))
                })()
            }
        })
    }

    return (
        <div className="plansScreen">
            {subscription &&
                <p className="plansScreen-date">
                    Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
                </p>
            }
            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)

                return (
                    <div key={productId}
                         className={`${isCurrentPackage && `plansScreen-plan-disabled`} plansScreen-plan`}>
                        <div className="plansScreen-info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button
                            onClick={() => !isCurrentPackage && loadCheckout(productData.price.priceId)}
                        >
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlansScreen