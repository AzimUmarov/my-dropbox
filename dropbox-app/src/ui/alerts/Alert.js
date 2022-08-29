import React from 'react';
import AlertError from './AlertError';
import AlertSuccess from './AlertSuccess';

const Alert = ({ type, children }) => {
    const typeOfAlert = {
        error: <AlertError content={children}/>,
        success: <AlertSuccess content={children}/>
    }

    return typeOfAlert[type];
};

export default Alert;