'use client';

import React, { useEffect } from 'react';
import GradientBg from '@/components/Svgs/GradientBg';

interface SubscriptionPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubscriptionPlanModal({ isOpen, onClose }: SubscriptionPlanModalProps) {
    const features = [
        'Automated Lead Scoring',
        'Dynamic Prospect Profiles',
        'Advanced Data Analytics',
        'AI-Powered Targeting',
        'Customizable Outreach Sequences',
        'Real-Time Engagement Tracking',
        'Seamless CRM Integration'
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-2xl  max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Modal Content */}
                <div className="relative bg-white rounded-lg shadow-xl flex flex-col max-h-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-start justify-between px-6 pt-6 pb-4 shrink-0">
                        <div>
                            <h2 className="text-2xl font-bold text-[#24282E] mb-1">Subscription Plan</h2>
                            <p className="text-sm text-[#727A90]">Here is the inquiry form preview.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-[#727A90] hover:text-[#24282E] transition-colors shrink-0"
                        >
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9987 2.33301C7.54703 2.33301 2.33203 7.54801 2.33203 13.9997C2.33203 20.4513 7.54703 25.6663 13.9987 25.6663C20.4504 25.6663 25.6654 20.4513 25.6654 13.9997C25.6654 7.54801 20.4504 2.33301 13.9987 2.33301ZM19.832 18.188L18.187 19.833L13.9987 15.6447L9.81036 19.833L8.16537 18.188L12.3537 13.9997L8.16537 9.81134L9.81036 8.16634L13.9987 12.3547L18.187 8.16634L19.832 9.81134L15.6437 13.9997L19.832 18.188Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
             <div className='w-full flex justify-center  overflow-y-auto flex-1 scroll-hidden'>
                    {/* Content - Scrollable */}
                    <div className="px-6 pt-8  max-w-lg ">
                        {/* Ultimate Plan Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 relative border-2 border-[#5542F6] mb-6">
                            {/* Top Legend - Combined Yearly and Save 20% */}
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 rounded-lg border-2 border-[#5542F6] shadow-lg shadow-[#5542F6]/30 overflow-hidden">
                                <div className="bg-white text-[#5542F6] flex flex-row items-center pr-2 pl-3 py-1 text-sm font-medium">
                                    <p className="text-lg font-medium">Yearly</p>
                                    <div className="bg-[#1AB233] text-white px-4 py-2 rounded-lg text-sm font-medium items-center ml-2">
                                        <p>Save 20%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Plan Header */}
                            <div className="mb-6 sm:mb-8 mt-4 sm:mt-6">
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5542F6] mb-3 sm:mb-4 text-center">Ultimate</h3>
                                <div className="mb-2 flex justify-center items-center">
                                    <span className="text-[#84818A] line-through text-xl sm:text-2xl font-extrabold">$2900.95</span>
                                </div>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">$2,400</span>
                                    <span className="text-[#84818A] ml-1 text-lg sm:text-xl font-extrabold">/year</span>
                                </div>
                                <div className="border-t border-[#e8eaf0] mt-4"></div>
                            </div>

                            {/* Features List */}
                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 pl-2 sm:pl-4">
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
                        </div>

                        {/* Unsubscribe Button - Outside the card */}
                        <div className="flex justify-center">
                            <button className="px-6 py-3 mb-6 bg-white border border-[#E4E7EC] text-[#24282E] rounded-sm hover:bg-[#F7F8FA] transition-colors text-sm font-medium">
                                Unsubscribe
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

