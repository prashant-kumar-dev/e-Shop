import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import Sidebar from '../../components/layouts/AdminMenu';

const UserForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, email, role });
        setUsername('');
        setEmail('');
        setRole('');
    };

    return (
        <Layout>
            <div className="flex">
                <Sidebar />
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-md">
                        <h2 className="text-lg font-semibold mb-2">Create User</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border mb-2"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border mb-2"
                        />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border mb-2"
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default UserForm;
