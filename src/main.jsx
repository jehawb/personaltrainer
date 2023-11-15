import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Error from './components/Error.jsx';
import Home from './components/Home.jsx';
import Training from './components/Training.jsx';
import { RouterProvider } from 'react-router';
import Customers from './components/Customers.jsx';
// import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                element: <Home />,
                index: true
            },
            {
                path: "training",
                element: <Training />,
            },
            {
                path: "customers",
                element: <Customers />,
            },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
