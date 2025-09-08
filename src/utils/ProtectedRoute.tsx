import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute: React.FC = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/signin" />;
    }
    try {
        const decodedToken: any = jwtDecode(token);

        if (decodedToken.role === "ADMIN") {
            return <Outlet />;
        } else {
            return <Navigate to="/" />;
        }
    } catch (error) {
        return <Navigate to="/signin" />;
    }
};

export default ProtectedRoute;
