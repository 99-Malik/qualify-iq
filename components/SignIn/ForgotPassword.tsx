'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LeftSection from './Sections/LeftSection';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('maxbert22@email.com');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sending OTP to:', email);
        router.push('/sign-in/verify-otp?method=email');
    };

    return (
        <div className="min-h-screen flex">
            <LeftSection />

            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
                            <span className="text-white font-bold text-lg">IQ</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-[#24282E]">Qualify IQ</h1>
                    </div>

                    {/* Main Title */}
                    <div className="text-left mb-8">
                        <h2 className="text-5xl font-bold text-[#24282E] mb-4">Forget Password?</h2>
                        <p className="text-[#727A90] text-base">
                            Enter email address to get the Code
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#727A90] mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-4 py-3 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Send OTP Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                        >
                            Send OTP
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 