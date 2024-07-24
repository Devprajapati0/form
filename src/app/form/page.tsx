"use client";
import axios from 'axios';
import React, { useState } from 'react';


function Form() {
    const [data, setData] = useState({
        username: '',
        email: '',
        phone: '',
        starttime: '',
        endtime: '',
        guesttype: '',
        meals: false,
    });
    const [message, setMessage] = useState('');

    async function submitForm() {
        try {
            const resp = await axios.post('/api/form', data);
            setMessage(resp.data.message);
        } catch (error) {
            console.error("error", error);
            setMessage('An error occurred. Please try again.');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div className="bg-black p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Rest Room Booking Form</h2>
                
                {message && <p className="mb-4 text-center text-red-500">{message}</p>}
                
                <label className="block text-white font-bold mb-2" htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="mb-4 p-3 w-full text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                />
                
                <label className="block text-white font-bold mb-2" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="mb-4 p-3 w-full text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                
                <label className="block text-white font-bold mb-2" htmlFor="phone">Phone</label>
                <input
                    type="phone"
                    id="phone"
                    placeholder="Phone"
                    className="mb-4 p-3 w-full text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
                
                <label className="block text-white font-bold mb-2" htmlFor="starttime">Start Time</label>
                <input
                    type="datetime-local"
                    id="starttime"
                    className="mb-4 p-3 w-full text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData({ ...data, starttime: e.target.value })}
                />
                
                <label className="block text-white font-bold mb-2" htmlFor="endtime">End Time</label>
                <input
                    type="datetime-local"
                    id="endtime"
                    className="mb-4 p-3 w-full text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData({ ...data, endtime: e.target.value })}
                />
                
                <label className="block text-white font-bold mb-2" htmlFor="guesttype">Guest Type</label>
                <input
                    type="text"
                    id="guesttype"
                    placeholder="personal or public"
                    className="mb-4 p-3 w-full text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setData({ ...data, guesttype: e.target.value })}
                />
                
                <div className="mb-4">
                    <label className="block text-white font-bold mb-2">Meals</label>
                    <input
                        type="checkbox"
                        id="meals"
                        className="mr-2 text-black leading-tight"
                        onChange={(e) => setData({ ...data, meals: e.target.checked })}
                    />
                    <span className="text-white">Include meals</span>
                </div>

                <button
                    className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 transition-colors duration-300"
                    onClick={submitForm}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Form;
