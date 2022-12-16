import React from 'react';
import { selectCurrentUser } from '../app/auth/authSlice';
import { useAppSelector } from '../app/hooks';

const Profile = () => {
    const user = useAppSelector(selectCurrentUser);
    return (
        <div>
            <h1>Profile role: {user?.USR_ROLE}</h1>
            <p>{JSON.stringify(user)}</p>
        </div>
    );
};

export default Profile;
