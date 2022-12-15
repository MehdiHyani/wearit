import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const Providers = ({ children }: { children: JSX.Element }) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}

export default Providers
