import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { setCredentials } from './app/auth/authSlice';
import { useAppDispatch } from './app/hooks';
import { useLazyGetCurrentUserQuery } from './app/user/userApiSlice';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const App = () => {
    const dispatch = useAppDispatch();
    const [getCurrentUser] = useLazyGetCurrentUserQuery();
    const [loading, setLoading] = React.useState(true);

    async function fetchCurrentUserIfAny() {
        try {
            const user = await getCurrentUser({}, false).unwrap();
            dispatch(setCredentials({ user }));
        } catch (error) { } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchCurrentUserIfAny();
    }, []);

    return (
        loading
            ? <h1>Loading...</h1>
            : <Routes>
                <Route index element={<Landing />} />
                <Route path='login' element={<Login />} />
                <Route path="404" element={<NotFound />} />
                <Route path='*' element={<Navigate to='/404' replace />} />
            </Routes>
    );
};

export default App;
