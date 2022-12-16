import React from 'react';
import { selectCurrentUser } from '../app/auth/authSlice';
import { useAppSelector } from '../app/hooks';

const Manager = () => {
    const user = useAppSelector(selectCurrentUser);
    return (
        <div>{JSON.stringify(user)}</div>
    );
};

export default Manager;
