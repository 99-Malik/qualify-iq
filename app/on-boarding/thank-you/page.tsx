'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../../components/NavBar/page';
import GradientBg from '../../../components/Svgs/GradientBg';
import { Check, Shield } from 'lucide-react';

export default function ThankYou() {
    const router = useRouter();

    const handleGoToDashboard = () => {
        router.push('/on-boarding/tier-options');
    };

    const features = [
        'Automated Lead Scoring',
        'Dynamic Prospect Profiles',
        'Advanced Data Analytics',
        'AI-Powered Targeting',
        'Customizable Outreach Sequences',
        'Real-Time Engagement Tracking',
        'Seamless CRM Integration'
    ];

    return (
        <div className="min-h-screen relative">

            <NavBar />

            {/* Main Content */}
            <div className="relative z-10 mt-8">
                <div className="absolute inset-0 -z-10">
                    <GradientBg />
                </div>
                <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        {/* Subscription Tag */}
                        <div className='flex justify-center items-center mb-6'>
                        <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.3956 4.56641C14.7939 4.56641 4.56641 14.7939 4.56641 27.3956C4.56641 39.9973 14.7939 50.2248 27.3956 50.2248C39.9973 50.2248 50.2248 39.9973 50.2248 27.3956C50.2248 14.7939 39.9973 4.56641 27.3956 4.56641ZM22.8298 38.8102L11.4152 27.3956L14.6341 24.1767L22.8298 32.3495L40.1571 15.0222L43.376 18.2639L22.8298 38.8102Z" fill="#14B13B" />
                        </svg> 
                      </div>

                        {/* Main Title */}
                        <h1 className="text-4xl font-bold mb-4">
                            <span className="text-black">Thank you for joining the QualifiQ family</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-md text-[#727A90] max-w-2xl mx-auto">
                            Unlock your leads with QualifIQ! Join us and transform your sales strategy today.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="flex justify-center flex-col items-center gap-8 mb-8 ">




                        {/* Ultimate Plan Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 w-110 relative border-2 border-primary">
                            {/* Top Legend - Combined Yearly and Save 20% */}
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 rounded-lg border-2 border-primary shadow-lg shadow-primary/30">
                                <div className="bg-white text-primary w-44 flex flex-row justify-between items-center pr-2 pl-3 py-1 text-sm font-medium rounded-md">
                                    <p className="text-lg font-medium">Yearly</p>
                                    <div className="bg-[#1AB233] text-white px-4 py-2 rounded-lg text-sm font-medium items-center "><p>Save 20%</p></div>
                                </div>
                            </div>
                            {/* Plan Header */}
                            <div className="mb-8">
                                <h3 className="text-5xl font-bold text-primary mt-6 mb-4 text-center">Ultimate</h3>
                                <div className="mb-2 flex   justify-center items-center">
                                    <span className="text-[#84818A] line-through text-2xl font-extrabold ">$2900.00</span>
                                </div>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-5xl font-extrabold text-black">$2,400</span>
                                    <span className="text-[#84818A] ml-1 text-xl font-extrabold">/Year</span>
                                </div>
                                <div className="border-t border-[#e8eaf0] mt-4"></div>
                            </div>

                            {/* Features List */}
                            <div className="space-y-4 mb-8 pl-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="16" height="16" rx="8" fill="url(#paint0_linear_553_23676)" />
                                            <g clipPath="url(#clip0_553_23676)">
                                                <g clipPath="url(#clip1_553_23676)">
                                                    <g clipPath="url(#clip2_553_23676)">
                                                        <g clipPath="url(#clip3_553_23676)">
                                                            <path d="M11.2473 4.93359L6.50316 9.67771L4.6342 7.80875L4 8.44295L6.50316 10.9461L11.8815 5.56779L11.2473 4.93359Z" fill="white" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_553_23676" x1="16" y1="6.7435e-07" x2="6.7435e-07" y2="16" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#59D963" />
                                                    <stop offset="1" stopColor="#26AE30" />
                                                </linearGradient>
                                                <clipPath id="clip0_553_23676">
                                                    <rect width="8" height="8" fill="white" transform="translate(4 4)" />
                                                </clipPath>
                                                <clipPath id="clip1_553_23676">
                                                    <rect width="1440" height="900" fill="white" transform="translate(4 4)" />
                                                </clipPath>
                                                <clipPath id="clip2_553_23676">
                                                    <rect width="8" height="8" fill="white" transform="translate(4 4)" />
                                                </clipPath>
                                                <clipPath id="clip3_553_23676">
                                                    <rect width="8" height="6.93333" fill="white" transform="translate(4 4.5332)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span className="text-[#3A3541]">{feature}</span>
                                    </div>
                                ))}
                            </div>


                            {/* Subscribe Button */}
                           
                        </div>
                        <button
                                onClick={handleGoToDashboard}
                                className="w-full bg-primary text-white py-4 px-8 rounded-lg font-medium shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300"
                            >
                                Go to Dashboard
                            </button>
                    </div>

                   
                </div>
            </div>
        </div>
    );
}
