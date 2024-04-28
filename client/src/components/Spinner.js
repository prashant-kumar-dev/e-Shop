import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        // Redirect when count reaches 0
        if (count === 0) {
            clearInterval(interval); // Clear interval first
            navigate(`/${path}`, {
                state: { from: location.pathname }, // Pass current location as state
            });
        }

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [count, navigate, path, location.pathname]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl text-center p-4 font-bold text-gray-800">
                Redirecting in <span className="text-blue-500">{count}</span> second{count !== 1 ? 's' : ''}
            </h1>
            <div className="spinner-container">
                <div className="spinner animate-spin rounded-full border-t-4 border-b-4 border-current border-solid h-12 w-12"></div>
            </div>
        </div>
    );
};

export default Spinner;
