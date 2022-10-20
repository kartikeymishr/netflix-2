import '../styles/signupscreen.css'
import db, {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '../firebase'
import {useEffect, useRef} from "react";

const SignUpScreen = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth,
            emailRef.current.value,
            passwordRef.current.value)
            .then(userCredential => {
                console.log("User Created", userCredential)
            })
            .catch(err => alert(err.message))
    }

    const signIn = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth,
            emailRef.current.value,
            passwordRef.current.value)
            .then(userCredential => {
                console.log("User Signed In", userCredential);
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className="signUpScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder="Email Address"/>
                <input ref={passwordRef} type="password" placeholder="Password"/>
                <button type="submit" onClick={signIn}>Sign In</button>

                <h4>
                    <span className="signUpScreen-gray">New to Netflix? </span>
                    <span className="signUpScreen-link" onClick={register}>Sign Up now.</span>
                </h4>
            </form>
        </div>
    )
}

export default SignUpScreen