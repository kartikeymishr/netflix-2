import React from 'react';
import './styles/App.css';
import HomeScreen from "./components/HomeScreen";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";

function App() {
    const user = null

    return (<div className="app">
        <BrowserRouter>
            <Routes>
                {!user ? (
                    <Route path="/" element={<LoginScreen/>}/>
                ) : (
                    <Route path="/" element={<HomeScreen/>}/>
                )}
            </Routes>
        </BrowserRouter>
    </div>);
}

export default App;
