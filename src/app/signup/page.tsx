"use client";
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Signup() {
    const router = useRouter();
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message,setMessage] = useState('');

    async function sign() {
        try {
            const resp = await axios.post('/api/signup', data);
            
            setMessage(resp.data.message);
            router.push('/form')
        } catch (error) {
            console.error("error", error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div className="bg-black p-6 rounded-lg shadow-md w-96">
            {message}
                <label className="block text-white font-bold mb-2" htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    className="mb-4 p-3 text-black w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                />
                <label className="block text-white font-bold mb-2" htmlFor="email">Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    className="mb-4 p-3 text-black w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <label className="block text-white font-bold mb-2" htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="mb-4 p-3 text-black w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <button
                    className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 transition-colors duration-300"
                    onClick={sign}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default Signup;
