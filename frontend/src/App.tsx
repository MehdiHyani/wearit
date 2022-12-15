import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
	return (
		<Routes>
			<Route index element={<Landing />} />
			<Route path='login' element={<Login />} />
			<Route path='404' element={<NotFound />} />
			<Route path='*' element={<Navigate to='/404' replace />} />
		</Routes>
	)
}

export default App
