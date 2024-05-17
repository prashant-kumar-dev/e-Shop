// Breadcrumb.js
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ paths }) => {
    return (
        <nav className="text-gray-600">
            <ol className="list-none p-0 inline-flex">
                {paths.map((path, index) => (
                    <li key={index} className="flex items-center">
                        {index !== 0 && <span className="mx-2">&#62;</span>}
                        {path.link ? (
                            <Link to={path.link} className="text-blue-500 hover:underline">
                                {path.title}
                            </Link>
                        ) : (
                            <span className="text-gray-500">{path.title}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
