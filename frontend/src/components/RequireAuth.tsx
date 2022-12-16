import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { selectCurrentUser } from '../app/auth/authSlice';
import { useAppSelector } from '../app/hooks';

const RequireAuth = () => {
    const user = useAppSelector(selectCurrentUser);

    return (
        user
            ? <Outlet />
            : <Navigate to='/login' replace />
    );
};

export default RequireAuth;
