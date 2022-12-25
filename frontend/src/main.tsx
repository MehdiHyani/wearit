import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Providers from './components/Providers';
import './index.css';
import '@elastic/eui/dist/eui_theme_light.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>
);
