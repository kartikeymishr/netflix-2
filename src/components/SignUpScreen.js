import '../styles/signupscreen.css'
import {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '../firebase'
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const SignUpScreen = ({email}) => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const navigate = useNavigate()

    const register = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth,
            emailRef.current.value,
            passwordRef.current.value)
            .then(() => navigate('/'))
            .catch(err => alert(err.message))
    }

    const signIn = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth,
            emailRef.current.value,
            passwordRef.current.value)
            .then(() => navigate('/'))
            .catch(err => alert(err.message))
    }

    return (
        <div className="signUpScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder="Email Address" defaultValue={email}/>
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