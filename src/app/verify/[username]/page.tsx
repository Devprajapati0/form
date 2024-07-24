'use client';
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

function Verifypage() {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (responseValue: boolean) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/verify', {
                username: params.username,
                response: responseValue
            });
            console.log(response.data.message)
            setMessage(response.data.message);
            router.push('/');
        } catch (error) {
            console.error("Error while verifying the code", error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-black'>
            <div className='w-full max-w-md p-8 space-y-8 bg-black rounded-lg shadow-md'>
                <div className='text-center'>
                    <h1 className='text-4xl bg-black font-extrabold tracking-tight lg:text-5xl mb-6'>
                        Verify 
                    </h1>
                    <p className='mb-4'>Do you want to accept or reject the offer?</p>

                    {message && <p className='mb-4 text-center text-red-500'>{message}</p>}

                    <div className='space-y-6'>
                        <button
                            type='button'
                            className='w-full bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600 transition-colors duration-300'
                            onClick={() => onSubmit(true)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Accept'}
                        </button>
                        <button
                            type='button'
                            className='w-full bg-red-500 text-white p-3 rounded-lg font-bold hover:bg-red-600 transition-colors duration-300'
                            onClick={() => onSubmit(false)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Reject'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verifypage;
