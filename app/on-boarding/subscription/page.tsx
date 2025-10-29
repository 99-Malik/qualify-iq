'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../../components/NavBar/page';
import GradientBg from '../../../components/Svgs/GradientBg';
import { Check, Shield } from 'lucide-react';

export default function Subscription() {
    const router = useRouter();
    
    const handleSubscribe = (plan: string) => {
        console.log(`Subscribing to ${plan} plan`);
        router.push('/on-boarding/payment-options');
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
                <div className="max-w-6xl mx-auto px-6 py-12">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        {/* Subscription Tag */}
                        <button
                            onClick={() => router.push('/on-boarding/payment-options')}
                            className="inline-block bg-primary text-white px-4 py-1.5 rounded-lg text-md font-medium mb-6 shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 cursor-pointer"
                        >
                            Subscription
                        </button>

                        {/* Main Title */}
                        <h1 className="text-4xl font-bold mb-4">
                            <span className="text-primary">Subscribe to QualifIQ</span>
                            <span className="text-black"> & Unlock Lead Potential!</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-md text-[#727A90] max-w-2xl mx-auto">
                            Unlock your leads with QualifIQ! Join us and transform your sales strategy today.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="flex justify-center gap-8 mb-8">
                        {/* Plus Plan Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 w-110 relative border-2 border-[#E3E1E5]">
                            {/* Top Legend - Combined Yearly and Save 20% */}
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 rounded-lg border-2 border-primary shadow-lg shadow-primary/30">
                                <div className="bg-white text-primary w-24 flex flex-row justify-center items-center py-1.5 text-sm font-medium rounded-md">
                                    <p className="text-lg font-medium">Monthly</p>
                                </div>
                            </div>
                            {/* Plan Header */}
                            <div className="mb-8">
                                <h3 className="text-5xl font-bold text-primary mt-6 mb-4 text-center">Plus</h3>
                                <div className="mb-2 flex   justify-center items-center">
                                    <span className="text-[#84818A] line-through text-2xl font-extrabold ">$290.00</span>
                                </div>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-5xl font-extrabold text-black">$250</span>
                                    <span className="text-[#84818A] ml-1 text-xl font-extrabold">/Month</span>
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

                            {/* Guarantee */}
                            <div className="flex items-center ml-12 mb-8 space-x-1 text-[#84818A]">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_553_23774)">
                                        <g clipPath="url(#clip1_553_23774)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.16602 15.4036C8.18352 15.3956 8.2005 15.3864 8.2168 15.3759C10.236 14.1367 14.1398 10.1742 14.3145 3.90554C14.3146 3.90104 14.3147 3.8965 14.3148 3.89194C14.315 3.88707 14.3151 3.88217 14.3153 3.87724C14.3189 3.75807 14.3231 3.62014 14.2791 3.4784C14.2425 3.36052 14.1718 3.23728 14.0886 3.14612C13.9886 3.03667 13.8716 2.97289 13.7711 2.9181L13.7483 2.90564C12.6203 2.28696 10.3697 1.35938 8.0005 1.35938C5.63128 1.35938 3.38072 2.28696 2.25269 2.90564L2.22987 2.9181C2.12938 2.97289 2.01238 3.03667 1.91244 3.14612C1.8292 3.23728 1.75853 3.36052 1.7219 3.4784C1.67786 3.62014 1.68208 3.75807 1.68572 3.87724C1.68601 3.88679 1.6863 3.89625 1.68656 3.90554C1.86125 10.1742 5.76497 14.1367 7.7842 15.3759C7.8005 15.3864 7.81748 15.3956 7.83498 15.4036C7.94258 15.4526 8.06333 15.4501 8.16602 15.4036ZM2.6374 3.60706C3.69946 3.02456 5.81465 2.15937 8.0005 2.15937C10.1864 2.15937 12.3015 3.02456 13.3636 3.60706C13.4294 3.64313 13.4606 3.66054 13.483 3.67502C13.4921 3.68091 13.4959 3.68394 13.497 3.6848C13.4973 3.68526 13.4986 3.68661 13.4996 3.68813C13.5019 3.69124 13.5046 3.69536 13.5073 3.70019C13.5101 3.705 13.5123 3.70942 13.5139 3.7129C13.5144 3.71415 13.5148 3.7151 13.5151 3.71572C13.5155 3.71831 13.5161 3.72427 13.5166 3.73561C13.5178 3.76499 13.517 3.80439 13.5148 3.88326C13.3551 9.6137 9.89924 13.2959 8.0005 14.5644C6.10176 13.2959 2.64594 9.6137 2.48625 3.88326C2.48405 3.80439 2.48317 3.76499 2.48439 3.73561C2.48486 3.72427 2.48555 3.71831 2.48595 3.71572C2.4862 3.7151 2.4866 3.71415 2.48716 3.7129C2.48872 3.70942 2.49093 3.705 2.49369 3.70019C2.49645 3.69536 2.49914 3.69124 2.50136 3.68813C2.50244 3.68661 2.5032 3.68564 2.50356 3.68518C2.50461 3.68432 2.50888 3.68091 2.51798 3.67502C2.54037 3.66054 2.57164 3.64313 2.6374 3.60706Z" fill="#1AB233" />
                                            <path d="M13.5151 3.71572C13.5148 3.71509 13.5144 3.71415 13.5139 3.7129C13.5123 3.70942 13.5101 3.705 13.5073 3.70019C13.5046 3.69537 13.5019 3.69124 13.4996 3.68813C13.4986 3.68661 13.4973 3.68526 13.497 3.6848C13.4959 3.68394 13.4921 3.68091 13.483 3.67502C13.4606 3.66054 13.4294 3.64312 13.3636 3.60706C12.3015 3.02456 10.1864 2.15937 8.0005 2.15937C5.81465 2.15937 3.69946 3.02456 2.6374 3.60706C2.57164 3.64312 2.54037 3.66054 2.51798 3.67502C2.50888 3.68091 2.50461 3.68432 2.50356 3.68518C2.5032 3.68564 2.50244 3.68661 2.50136 3.68813C2.49914 3.69124 2.49645 3.69537 2.49369 3.70019C2.49093 3.705 2.48872 3.70942 2.48716 3.7129C2.4866 3.71415 2.4862 3.71509 2.48595 3.71572M13.5151 3.71572C13.5155 3.71831 13.5161 3.72427 13.5166 3.73561C13.5178 3.76499 13.517 3.8044 13.5148 3.88326C13.3551 9.61371 9.89924 13.2959 8.0005 14.5644C6.10176 13.2959 2.64594 9.61371 2.48625 3.88326C2.48405 3.8044 2.48317 3.76499 2.48439 3.73561C2.48486 3.72427 2.48555 3.71831 2.48595 3.71572M13.5151 3.71572C13.5149 3.71503 13.5147 3.71412 13.5147 3.71407M2.48595 3.71572C2.48614 3.71503 2.4863 3.71412 2.48628 3.71407M8.16602 15.4036C8.18352 15.3956 8.2005 15.3864 8.2168 15.3759C10.236 14.1367 14.1398 10.1742 14.3145 3.90554C14.3146 3.90103 14.3147 3.8965 14.3148 3.89194C14.315 3.88707 14.3151 3.88217 14.3153 3.87724C14.3189 3.75807 14.3231 3.62013 14.2791 3.4784C14.2425 3.36051 14.1718 3.23728 14.0886 3.14612C13.9886 3.03667 13.8716 2.97289 13.7711 2.9181L13.7483 2.90564C12.6203 2.28696 10.3697 1.35938 8.0005 1.35938C5.63128 1.35938 3.38072 2.28696 2.25269 2.90564L2.22987 2.9181C2.12938 2.97289 2.01238 3.03667 1.91244 3.14612C1.8292 3.23728 1.75853 3.36051 1.7219 3.4784C1.67786 3.62013 1.68208 3.75807 1.68572 3.87724C1.68601 3.88679 1.6863 3.89624 1.68656 3.90554C1.86125 10.1742 5.76497 14.1367 7.7842 15.3759C7.8005 15.3864 7.81748 15.3956 7.83498 15.4036C7.94258 15.4526 8.06333 15.4501 8.16602 15.4036Z" stroke="#1AB233" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_553_23774">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                        <clipPath id="clip1_553_23774">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <span className="text-[#3A3541] text-sm">30 Days Money-Back Guarantee</span>
                            </div>

                            {/* Subscribe Button */}
                            <button
                                onClick={() => handleSubscribe('Ultimate')}
                                className="w-full bg-white text-primary border-2 border-primary py-4 px-6 rounded-lg font-bold transition-all duration-300"
                            >
                                Subscribe Now
                            </button>
                        </div>
                    


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

                            {/* Guarantee */}
                            <div className="flex items-center ml-12 mb-8 space-x-1 text-[#84818A]">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_553_23774)">
                                        <g clipPath="url(#clip1_553_23774)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.16602 15.4036C8.18352 15.3956 8.2005 15.3864 8.2168 15.3759C10.236 14.1367 14.1398 10.1742 14.3145 3.90554C14.3146 3.90104 14.3147 3.8965 14.3148 3.89194C14.315 3.88707 14.3151 3.88217 14.3153 3.87724C14.3189 3.75807 14.3231 3.62014 14.2791 3.4784C14.2425 3.36052 14.1718 3.23728 14.0886 3.14612C13.9886 3.03667 13.8716 2.97289 13.7711 2.9181L13.7483 2.90564C12.6203 2.28696 10.3697 1.35938 8.0005 1.35938C5.63128 1.35938 3.38072 2.28696 2.25269 2.90564L2.22987 2.9181C2.12938 2.97289 2.01238 3.03667 1.91244 3.14612C1.8292 3.23728 1.75853 3.36052 1.7219 3.4784C1.67786 3.62014 1.68208 3.75807 1.68572 3.87724C1.68601 3.88679 1.6863 3.89625 1.68656 3.90554C1.86125 10.1742 5.76497 14.1367 7.7842 15.3759C7.8005 15.3864 7.81748 15.3956 7.83498 15.4036C7.94258 15.4526 8.06333 15.4501 8.16602 15.4036ZM2.6374 3.60706C3.69946 3.02456 5.81465 2.15937 8.0005 2.15937C10.1864 2.15937 12.3015 3.02456 13.3636 3.60706C13.4294 3.64313 13.4606 3.66054 13.483 3.67502C13.4921 3.68091 13.4959 3.68394 13.497 3.6848C13.4973 3.68526 13.4986 3.68661 13.4996 3.68813C13.5019 3.69124 13.5046 3.69536 13.5073 3.70019C13.5101 3.705 13.5123 3.70942 13.5139 3.7129C13.5144 3.71415 13.5148 3.7151 13.5151 3.71572C13.5155 3.71831 13.5161 3.72427 13.5166 3.73561C13.5178 3.76499 13.517 3.80439 13.5148 3.88326C13.3551 9.6137 9.89924 13.2959 8.0005 14.5644C6.10176 13.2959 2.64594 9.6137 2.48625 3.88326C2.48405 3.80439 2.48317 3.76499 2.48439 3.73561C2.48486 3.72427 2.48555 3.71831 2.48595 3.71572C2.4862 3.7151 2.4866 3.71415 2.48716 3.7129C2.48872 3.70942 2.49093 3.705 2.49369 3.70019C2.49645 3.69536 2.49914 3.69124 2.50136 3.68813C2.50244 3.68661 2.5032 3.68564 2.50356 3.68518C2.50461 3.68432 2.50888 3.68091 2.51798 3.67502C2.54037 3.66054 2.57164 3.64313 2.6374 3.60706Z" fill="#1AB233" />
                                            <path d="M13.5151 3.71572C13.5148 3.71509 13.5144 3.71415 13.5139 3.7129C13.5123 3.70942 13.5101 3.705 13.5073 3.70019C13.5046 3.69537 13.5019 3.69124 13.4996 3.68813C13.4986 3.68661 13.4973 3.68526 13.497 3.6848C13.4959 3.68394 13.4921 3.68091 13.483 3.67502C13.4606 3.66054 13.4294 3.64312 13.3636 3.60706C12.3015 3.02456 10.1864 2.15937 8.0005 2.15937C5.81465 2.15937 3.69946 3.02456 2.6374 3.60706C2.57164 3.64312 2.54037 3.66054 2.51798 3.67502C2.50888 3.68091 2.50461 3.68432 2.50356 3.68518C2.5032 3.68564 2.50244 3.68661 2.50136 3.68813C2.49914 3.69124 2.49645 3.69537 2.49369 3.70019C2.49093 3.705 2.48872 3.70942 2.48716 3.7129C2.4866 3.71415 2.4862 3.71509 2.48595 3.71572M13.5151 3.71572C13.5155 3.71831 13.5161 3.72427 13.5166 3.73561C13.5178 3.76499 13.517 3.8044 13.5148 3.88326C13.3551 9.61371 9.89924 13.2959 8.0005 14.5644C6.10176 13.2959 2.64594 9.61371 2.48625 3.88326C2.48405 3.8044 2.48317 3.76499 2.48439 3.73561C2.48486 3.72427 2.48555 3.71831 2.48595 3.71572M13.5151 3.71572C13.5149 3.71503 13.5147 3.71412 13.5147 3.71407M2.48595 3.71572C2.48614 3.71503 2.4863 3.71412 2.48628 3.71407M8.16602 15.4036C8.18352 15.3956 8.2005 15.3864 8.2168 15.3759C10.236 14.1367 14.1398 10.1742 14.3145 3.90554C14.3146 3.90103 14.3147 3.8965 14.3148 3.89194C14.315 3.88707 14.3151 3.88217 14.3153 3.87724C14.3189 3.75807 14.3231 3.62013 14.2791 3.4784C14.2425 3.36051 14.1718 3.23728 14.0886 3.14612C13.9886 3.03667 13.8716 2.97289 13.7711 2.9181L13.7483 2.90564C12.6203 2.28696 10.3697 1.35938 8.0005 1.35938C5.63128 1.35938 3.38072 2.28696 2.25269 2.90564L2.22987 2.9181C2.12938 2.97289 2.01238 3.03667 1.91244 3.14612C1.8292 3.23728 1.75853 3.36051 1.7219 3.4784C1.67786 3.62013 1.68208 3.75807 1.68572 3.87724C1.68601 3.88679 1.6863 3.89624 1.68656 3.90554C1.86125 10.1742 5.76497 14.1367 7.7842 15.3759C7.8005 15.3864 7.81748 15.3956 7.83498 15.4036C7.94258 15.4526 8.06333 15.4501 8.16602 15.4036Z" stroke="#1AB233" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_553_23774">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                        <clipPath id="clip1_553_23774">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <span className="text-[#3A3541] text-sm">30 Days Money-Back Guarantee</span>
                            </div>

                            {/* Subscribe Button */}
                            <button
                                onClick={() => handleSubscribe('Ultimate')}
                                className="w-full bg-primary text-white py-4 px-6 rounded-lg font-medium shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300"
                            >
                                Subscribe Now
                            </button>
                        </div>
                    </div>

                    {/* Bottom Message */}
                    <div className="text-center">
                        <p className="text-primary font-medium">
                            Free to use for first 30 days
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
