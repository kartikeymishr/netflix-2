import '../styles/loginscreen.css'
import {useState} from "react";
import SignUpScreen from "./SignUpScreen";

const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false)
    const [email, setEmail] = useState(null)

    return (
        <div className="loginScreen">
            <div className="loginScreen-background">
                <img
                    className="loginScreen-logo"
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                    alt=""
                />
                {!signIn && <button
                    className="loginScreen-button"
                    onClick={() => setSignIn(true)}
                >
                    Sign In
                </button>}
                <div className="loginScreen-gradient"/>
            </div>

            <div className="loginScreen-body">
                {signIn ? (
                    <SignUpScreen email={email}/>
                ) : (
                    <>
                        <h1>Unlimited Films, TV programmes and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to create or restart a membership.</h3>

                        <div className="loginScreen-input">
                            <form>
                                <input type="email" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}/>
                                <button
                                    className="loginScreen-get-started-button"
                                    onClick={() => {
                                        setSignIn(true)
                                    }}
                                >
                                    GET STARTED
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default LoginScreen