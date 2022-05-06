import {Routes, Route, Link, Navigate} from "react-router-dom";
import * as React from "react";
import Homepage from "./pages/Homepage"
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <div>
            <h1>Welcome to React Router!</h1>

            <Routes>
                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path="/home" element={<Homepage/>}/>
                <Route path="/login" element={<Register/>}/>
                <Route path="/register" element={<Login/>}/>
                <Route
                    path="*"
                    element={
                        <NotFound/>
                    }
                />
                {/*<Route path="about" element={<About/>}/>*/}
            </Routes>

        </div>
    );
}

export default App;
