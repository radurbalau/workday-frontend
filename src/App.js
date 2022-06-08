import {Routes, Route, Link, Navigate} from "react-router-dom";
import * as React from "react";
import Homepage from "./pages/Homepage"
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Navbar from './pages/Navbar'
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import Footer from "./pages/Footer"

function App() {
    return (
        <div>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path="/home" element={<Homepage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route
                    path="users/:userId"
                    element={<UserHomePage />}
                />
                <Route
                    path="admin/:adminId"
                    element={<AdminHomePage />}
                />
                <Route
                    path="*"
                    element={
                        <NotFound/>
                    }
                />

                {/*<Route path="about" element={<About/>}/>*/}
            </Routes>
            <Footer></Footer>
        </div>
    );
}

export default App;
