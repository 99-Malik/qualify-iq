'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../../components/NavBar/page';
import GradientBg from '../../../components/Svgs/GradientBg';

export default function TierOptions() {
    const router = useRouter();

    const handleSubscribe = (tier: string) => {
        console.log(`Subscribing to ${tier}`);
        router.push('/on-boarding/packages');
    };

    const tier1Emails = [
        { count: '250', price: '$125' },
        { count: '500', price: '$250' },
        { count: '1000', price: '$500' }
    ];

    return (
        <div className="min-h-screen relative">
            <NavBar />

            {/* Main Content */}
            <div className="relative z-10 mt-24">
                <div className="absolute inset-0 -z-10">
                    <GradientBg />
                </div>
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        {/* Tiers Tag */}
                        <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-lg text-md font-medium mb-6 shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300">
                            Tiers
                      </div>

                        {/* Main Title */}
                        <h1 className="text-4xl font-bold mb-4">
                            <span className="text-black">Tier Options</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-md text-[#727A90] max-w-2xl mx-auto">
                            Unlock your leads with QualifIQ! Join us and transform your sales strategy today.
                        </p>
                    </div>

                    {/* Tier Cards Container */}
                    <div className="bg-white border border-[#E3E1E5] rounded-lg shadow-lg p-6 sm:p-8 lg:p-12 w-full max-w-[1200px]">
                        <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-8 items-stretch">
                            {/* Tier 1 Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex-1 border border-primary flex flex-col">
                                {/* Tier Header */}
                                <div className="mb-6">
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 text-center">Tier 1</h3>
                                    <div className="border-t border-[#e8eaf0] mb-4"></div>
                                </div>

                                {/* Package Name with Checkmark */}
                                <div className="flex items-center space-x-2 mb-6">
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="16" height="16" rx="8" fill="url(#paint0_linear_tier1)" />
                                        <path d="M11.2473 4.93359L6.50316 9.67771L4.6342 7.80875L4 8.44295L6.50316 10.9461L11.8815 5.56779L11.2473 4.93359Z" fill="white" />
                                        <defs>
                                            <linearGradient id="paint0_linear_tier1" x1="16" y1="6.7435e-07" x2="6.7435e-07" y2="16" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#59D963" />
                                                <stop offset="1" stopColor="#26AE30" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <span className="text-[#3A3541] font-medium">Validated lead package</span>
                                </div>
                                <div className='flex flex-col pl-8 '>
                                {/* Email Packages List */}
                                <div className="space-y-3 mb-6 flex-1">
                                    {tier1Emails.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541]"></span>
                                            <span className="text-[#3A3541]">{item.count} emails</span>
                                            <span className="text-primary font-semibold ">{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                                </div>
                                {/* Subscribe Button */}
                                <button
                                    onClick={() => handleSubscribe('Tier 1')}
                                    className="w-full bg-primary text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 text-sm sm:text-base mt-auto"
                                >
                                    Subscribe Now
                                </button>
                            </div>

                            {/* Tier 2 Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex-1 border border-primary flex flex-col">
                                {/* Tier Header */}
                                <div className="mb-6">
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 text-center">Tier 2</h3>
                                    <div className="border-t border-[#e8eaf0] mb-4"></div>
                                </div>

                                {/* Package Name with Checkmark */}
                                <div className="flex items-center space-x-2 mb-4">
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="16" height="16" rx="8" fill="url(#paint0_linear_tier2)" />
                                                            <path d="M11.2473 4.93359L6.50316 9.67771L4.6342 7.80875L4 8.44295L6.50316 10.9461L11.8815 5.56779L11.2473 4.93359Z" fill="white" />
                                            <defs>
                                            <linearGradient id="paint0_linear_tier2" x1="16" y1="6.7435e-07" x2="6.7435e-07" y2="16" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#59D963" />
                                                    <stop offset="1" stopColor="#26AE30" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    <span className="text-[#3A3541] font-medium">Qualified Leads package</span>
                                </div>
                                <div className='flex flex-col pl-8 flex-1'>
                                {/* Description with Bullet */}
                                <div className="flex items-start space-x-2 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] mt-1.5 flex-shrink-0"></span>
                                    <p className="text-[#3A3541] text-sm">
                                        Per vetted lead that meets financial criteria and interested in franchising. <span className='text-primary font-semibold'>$150</span>
                                    </p>
                                </div>
                                
                                
                                </div>

                                {/* Subscribe Button */}
                                <button
                                    onClick={() => handleSubscribe('Tier 2')}
                                    className="w-full bg-primary text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 text-sm sm:text-base mt-auto"
                                >
                                    Subscribe Now
                                </button>
                            </div>

                            {/* Tier 3 Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex-1 border border-primary flex flex-col">
                                {/* Tier Header */}
                                <div className="mb-6">
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 text-center">Tier 3</h3>
                                    <div className="border-t border-[#e8eaf0] mb-4"></div>
                                </div>

                                {/* Package Name with Checkmark */}
                                <div className="flex items-center space-x-2 mb-4">
                                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="16" height="16" rx="8" fill="url(#paint0_linear_tier3)" />
                                        <path d="M11.2473 4.93359L6.50316 9.67771L4.6342 7.80875L4 8.44295L6.50316 10.9461L11.8815 5.56779L11.2473 4.93359Z" fill="white" />
                                        <defs>
                                            <linearGradient id="paint0_linear_tier3" x1="16" y1="6.7435e-07" x2="6.7435e-07" y2="16" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#59D963" />
                                                <stop offset="1" stopColor="#26AE30" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <span className="text-[#3A3541] font-medium">Validated lead package</span>
                                </div>
                                <div className='flex flex-col pl-8 flex-1'>
                                {/* Description */}
                                <div className="flex items-start space-x-2 mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] mt-1.5 flex-shrink-0"></span>
                                    <p className="text-[#3A3541] text-sm flex-1">
                                        Email campaign / scale model like other software's.
                                    </p>
                                </div>
                                </div>
                                {/* Subscribe Button */}
                                <button
                                    onClick={() => handleSubscribe('Tier 3')}
                                    className="w-full bg-primary text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 text-sm sm:text-base mt-auto"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
