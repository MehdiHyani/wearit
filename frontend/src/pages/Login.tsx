import React from 'react';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../app/auth/authSlice';
import { useAppSelector } from '../app/hooks';

const Login = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);

    React.useEffect(() => {
        if (user) { navigate('/'); }
    }, []);

    return (
        <div>Login</div>
    );
};

export default Login;
