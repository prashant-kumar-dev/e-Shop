import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom"; //for nested routing
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/user-auth`);
                // console.log("Authentication Response:", res.data);
                setOk(res.data.ok); // Update ok based on authentication response

            } catch (error) {
                console.log("Authentication Error:", error);
                setOk(false); // Set ok to false in case of errors
            }
        };
        if (auth?.token) authCheck(); // Perform auth check if token exists
    }, [auth?.token]);

    // The Outlet component is used for nested routing in React Router
    // When this PrivateRoute component is rendered, the Outlet component renders the child routes defined in the parent route component (look in app.js routes)

    return ok ? <Outlet /> : <Spinner />
}