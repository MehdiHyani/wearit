import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { EuiProvider } from '@elastic/eui';

const Providers = ({ children }: { children: JSX.Element }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <EuiProvider colorMode="light">
                    {children}
                </EuiProvider>
            </Provider>
        </BrowserRouter>
    );
};

export default Providers;
