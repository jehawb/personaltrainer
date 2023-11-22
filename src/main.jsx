import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Customers from './components/Customers.jsx';
import Error from './components/Error.jsx';
import Home from './components/Home.jsx';
import Trainings from './components/Trainings.jsx';
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
                path: "trainings",
                element: <Trainings />,
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
