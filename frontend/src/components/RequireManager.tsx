import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { selectCurrentUser } from '../app/auth/authSlice';
import { useAppSelector } from '../app/hooks';

const RequireManager = () => {
    const user = useAppSelector(selectCurrentUser);

    return (
        user && user.USR_ROLE === 'manager'
            ? <Outlet />
            : <Navigate to='/403' replace />
    );
};

export default RequireManager;
