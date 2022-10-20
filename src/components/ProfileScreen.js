import '../styles/profilescreen.css'
import Nav from "./Nav";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {auth, signOut} from "../firebase";

const ProfileScreen = () => {
    const {user} = useSelector(selectUser)

    return (
        <div className="profileScreen">
            <Nav/>
            <div className="profileScreen-body">
                <h1>Edit Profile</h1>
                <div className="profileScreen-info">
                    <img
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"
                        alt=""
                    />
                    <div className="profileScreen-details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen-plans">
                            <h3>Plans</h3>
                            <button
                                onClick={() => {
                                    signOut(auth).then(user => {
                                        console.log("user signed out");
                                    }).catch(err => alert(err.message))
                                }}
                                className="profileScreen-sign-out">
                                Sign Out
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen