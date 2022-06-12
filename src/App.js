import {Routes, Route, Link, Navigate, useLocation} from "react-router-dom";
import * as React from "react";
import Homepage from "./pages/Homepage"
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Navbar from './pages/Navbar'
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import Footer from "./pages/Footer"




function RequireAuth({ children }) {
    let auth = localStorage.getItem("user")
    let location = useLocation();

    if (auth===null) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

function App() {
    return (
        <div>
            <Navbar/>

            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path="/home" element={<Homepage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route
                    path="users/:userId"
                    element={

                        <RequireAuth>
                    <UserHomePage />
                        </RequireAuth>}
                />
                <Route
                    path="admin/:adminId"
                    element={
                        <RequireAuth>
                        <AdminHomePage />
                        </RequireAuth>}
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
