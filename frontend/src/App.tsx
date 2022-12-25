import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { setCredentials } from './app/auth/authSlice';
import { useAppDispatch } from './app/hooks';
import { useLazyGetCurrentUserQuery } from './app/user/userApiSlice';
import RequireAuth from './components/RequireAuth';
import RequireManager from './components/RequireManager';
import Forbidden from './pages/Forbidden';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Manager from './pages/Manager';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

const App = () => {
    const dispatch = useAppDispatch();
    const [getCurrentUser] = useLazyGetCurrentUserQuery();
    const [loading, setLoading] = React.useState(true);

    async function fetchCurrentUserIfAny() {
        try {
            const user = await getCurrentUser({}, false).unwrap();
            dispatch(setCredentials({ user }));
        } catch (error) { console.clear(); } finally {
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
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
                <Route element={<Navbar />}>
                    <Route index element={<Landing />} />
                    <Route element={<RequireAuth />}>
                        <Route path='products' element={< Products />} />
                        <Route path='profile' />
                        <Route element={<RequireManager />}>
                            <Route path='manager' element={<Manager />} />
                        </Route>
                        <Route />
                    </Route>
                </Route>
                <Route path="403" element={<Forbidden />} />
                <Route path="404" element={<NotFound />} />
                <Route path='*' element={<Navigate to='/404' replace />} />
            </Routes>
    );
};

export default App;
