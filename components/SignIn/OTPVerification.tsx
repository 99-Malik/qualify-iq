'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LeftSection from './Sections/LeftSection';
import Terms from './Sections/Terms';

export default function OTPVerification() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [otp, setOtp] = useState(['', '', '', '']);

    // Get the verification method from URL params
    const method = searchParams.get('method') || 'email';
    const isEmailMethod = method === 'email';

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1) {
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);
          
          // Auto-focus next input
          if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
          }
        }
      };

    const handleOTPSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        console.log('Confirming OTP:', otpCode);
        router.push('/sign-in/create-password');
    };


    return (
        <div className="min-h-screen flex">
            <LeftSection />


            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
                <div className="w-[70%] max-w-md lg:mt-20 lg:mb-20">


                    {/* Header */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-lg">IQ</span>
                        </div>
                        <h1 className="text-2xl font-extrabold text-[#24282E]">Qualify IQ</h1>
                    </div>

                    {/* Verification Icon */}
                    <div className="flex justify-start mb-6">
                        <div className="w-16 h-16  rounded-full flex items-center justify-center">
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="72" height="72" rx="36" fill="#5542F6" fill-opacity="0.1" />
                                <path d="M27 22.5H22.5V27C24.99 27 27 24.99 27 22.5ZM39 22.5H36C36 29.955 29.955 36 22.5 36V39C31.62 39 39 31.605 39 22.5ZM33 22.5H30C30 26.64 26.64 30 22.5 30V33C28.305 33 33 28.305 33 22.5ZM33 49.5H36C36 42.045 42.045 36 49.5 36V33C40.395 33 33 40.395 33 49.5ZM45 49.5H49.5V45C47.01 45 45 47.01 45 49.5ZM39 49.5H42C42 45.36 45.36 42 49.5 42V39C43.695 39 39 43.695 39 49.5Z" fill="#5542F6" />
                            </svg>

                        </div>
                    </div>

                    {/* Main Title */}
                    <div className="text-left mb-8">
                        <h2 className="text-3xl font-bold text-[#24282E] mb-4">Verify OTP</h2>
                        <p className="text-[#727A90] text-base">
                            {isEmailMethod
                                ? 'Enter the code we sent to the email address.'
                                : 'Enter the code we sent to your phone number.'
                            }
                        </p>
                    </div>

                    <form onSubmit={handleOTPSubmit} className="space-y-6">
                        {/* OTP Input */}
                        <div>
                                    <label className="block text-sm font-medium text-[#727A90] mb-2">
                                        OTP
                                    </label>
                                    <div className="flex justify-between mb-2 w-full">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                className="w-22 h-24 text-center border border-gray-200 bg-white focus:outline-none focus:border-primary text-[#24282E] text-4xl font-semibold transition-colors"
                                                maxLength={1}
                                            />
                                        ))}
                                    </div>
                                    </div>
 

                        {/* Navigation Links */}
                        <div className="flex justify-between items-center mb-6">
                            <button
                                type="button"
                                className="text-[#727A90] text-sm hover:text-[#24282E] transition-colors"
                                onClick={() => router.back()}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className="text-primary text-sm hover:text-primary-hover transition-colors"
                            >
                                Don't receive your code
                            </button>
                        </div>

                        {/* Info Box */}
                        <div className="bg-primary rounded-lg p-4 mb-6">
                            <div className="flex items-center ">
                                <div className="text-white text-sm w-[70%]">
                                    Didn't receive your code? Please allow 30 seconds for the message to arrive before requesting another code. Get help
                                </div>
                                <button
                                    type="button"
                                    className="bg-white w-30 text-xs text-black px-4 py-2 rounded-sm  font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Resend code
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                        >
                            Verify OTP
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
} 