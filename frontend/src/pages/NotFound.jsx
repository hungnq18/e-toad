import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
                <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
                <p className="mt-2 text-lg text-gray-600">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound; 