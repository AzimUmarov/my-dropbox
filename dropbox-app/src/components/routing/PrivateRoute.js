import React from 'react';
import { useAuth } from './../store/AuthStore';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if(!currentUser) {
        return <Navigate to="/signin"/>
    }

    return children;
};

export default PrivateRoute;