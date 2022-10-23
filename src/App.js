import React, {useEffect} from 'react';
import './styles/App.css';
import HomeScreen from "./components/HomeScreen";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import {auth} from "./firebase";
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./features/userSlice";
import ProfileScreen from "./components/ProfileScreen";

const App = () => {
    const {user} = useSelector(selectUser)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                dispatch(login({
                        uid: userAuth.uid,
                        email: userAuth.email
                    }
                ))
            } else {
                dispatch(logout())
            }
        })

        return unsubscribe
    }, [dispatch])


    return (<div className="app">
        <Router basename="/netflix-2">
            {!user ?
                <Routes>
                    <Route path="/*" element={<LoginScreen/>}/>
                </Routes>
                :
                <Routes>
                    <Route path="/*" element={<HomeScreen/>}/>
                    <Route path="profile" element={<ProfileScreen/>}/>
                </Routes>
            }
        </Router>
    </div>);
}

export default App;
