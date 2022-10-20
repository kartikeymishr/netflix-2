import "../styles/nav.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Nav = () => {
    const [show, handleShow] = useState(false)
    const navigate = useNavigate()

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar)
        // Clean up after attaching Event Listeners
        return () => window.removeEventListener("scroll", transitionNavBar)
    }, [])

    return (
        <div className={`nav ${show && "nav-black"}`}>
            <div className="nav-content">
                <img
                    onClick={() => navigate("/")}
                    className="nav-logo"
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                    alt=""
                />

                <img
                    onClick={() => navigate("/profile")}
                    className="nav-avatar"
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"
                    alt=""
                />
            </div>
        </div>
    )
}

export default Nav