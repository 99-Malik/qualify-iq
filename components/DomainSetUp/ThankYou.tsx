'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface ThankYouProps {
    onBack?: () => void;
}

export default function ThankYou({ onBack }: ThankYouProps) {
    const router = useRouter();

    const handleGoToDomains = () => {
        router.push('/domain-setup');
    };

    return (
        <div>
            {/* Header Section - Full Width */}
            <div className="mb-8">
                {/* Breadcrumb */}
                <div className="mb-2">
                    <nav className="text-sm">
                        <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                            Home
                        </span>
                        <span className="text-[#727A90] mx-1">/</span>
                        <span className="text-[#24282E] font-bold">Domain Setup</span>
                    </nav>
                </div>

                {/* Header with Title and Next Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Domain Setup</h1>

                    <button className="flex items-center gap-2 px-8 py-2 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium">
                        Next
                    </button>
                </div>
            </div>

            {/* Payment Method Section */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={onBack}
                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold text-[#24282E]">Payment Method</h2>
            </div>

            {/* Thank You Content - Centered */}
            <div className="flex justify-center">
                <div className="bg-white rounded-lg p-12 w-full max-w-full flex justify-center items-center text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center w-fit flex-col items-center">
                    <div className="flex justify-center mb-6">
                        <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.3956 4.56641C14.7939 4.56641 4.56641 14.7939 4.56641 27.3956C4.56641 39.9973 14.7939 50.2248 27.3956 50.2248C39.9973 50.2248 50.2248 39.9973 50.2248 27.3956C50.2248 14.7939 39.9973 4.56641 27.3956 4.56641ZM22.8298 38.8102L11.4152 27.3956L14.6341 24.1767L22.8298 32.3495L40.1571 15.0222L43.376 18.2639L22.8298 38.8102Z" fill="#14B13B" />
                        </svg>

                    </div>

                    {/* Main Message */}
                    <h2 className="text-xl font-bold text-[#24282E] mb-4">
                        Thank you for Purchasing
                    </h2>

                    {/* Descriptive Text */}
                    <p className="text-sm text-[#727A90] mb-8 max-w-md mx-auto">
                        Unlock your leads with QualifIQ! Join us and transform your sales strategy today.
                    </p>

                    {/* Action Button */}
                    <button
                        onClick={handleGoToDomains}
                        className="bg-[#5542F6] text-white py-3 w-full px-8 rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium"
                    >
                        Go to My Domains
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}

