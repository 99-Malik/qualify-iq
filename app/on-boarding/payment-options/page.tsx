'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../../components/NavBar/page';
import GradientBg from '../../../components/Svgs/GradientBg';

export default function PaymentOptions() {
    const router = useRouter();
    const [paymentData, setPaymentData] = useState({
        nameOnCard: 'John Doe',
        cardNumber: '',
        expiration: '',
        cvc: '',
        postalCode: ''
    });
    const [termsAccepted, setTermsAccepted] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePayment = () => {
        console.log('Processing payment...', paymentData);
        // Navigate to thank you page
        router.push('/on-boarding/thank-you');
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
            <div className="relative z-10 mt-24">
                <div className="absolute inset-0 -z-10">
                    <GradientBg />
                </div>
                <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center">
                    {/* Header Section */}
                    <div className="text-center mb-8 sm:mb-12 px-4">
                        {/* Subscription Tag */}
                        <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-lg text-sm sm:text-md font-medium mb-4 sm:mb-6 shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300">
                            Subscription
                        </div>

                        {/* Main Title */}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                            <span className="text-black">Payment Options</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-sm sm:text-md text-[#727A90] max-w-2xl mx-auto">
                            Unlock your leads with QualifIQ! Join us and transform your sales strategy today.
                        </p>
                    </div>

                    {/* Main Content: Card and Payment Form */}
                    <div className="flex flex-col lg:flex-row justify-center w-full max-w-[1200px] gap-6 lg:gap-8 items-start border-2 bg-white border-[#E3E1E5] py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8 rounded-lg">
                        {/* Ultimate Plan Card - Left Side */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full lg:w-[440px] relative border-2 border-primary shrink-0">
                            {/* Top Legend - Combined Yearly and Save 20% */}
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 rounded-lg border-2 border-primary shadow-lg shadow-primary/30 overflow-hidden">
                                <div className="bg-white text-primary flex flex-row items-center pr-2 pl-3 py-1 text-sm font-medium">
                                    <p className="text-lg font-medium">Yearly</p>
                                    <div className="bg-[#1AB233] text-white px-4 py-2 rounded-lg text-sm font-medium items-center ml-2">
                                        <p>Save 20%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Plan Header */}
                            <div className="mb-6 sm:mb-8 mt-4 sm:mt-6">
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4 text-center">Ultimate</h3>
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

                        {/* Payment Form - Right Side */}
                        <div className="bg-white p-6 sm:p-8 w-full lg:w-[440px] shrink-0">
                            <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4 sm:space-y-6">
                                {/* Name on card */}
                                <div>
                                    <label htmlFor="nameOnCard" className="block text-xs sm:text-sm font-medium text-[#727A90] mb-1.5 sm:mb-2">
                                        Name on card
                                    </label>
                                    <input
                                        type="text"
                                        id="nameOnCard"
                                        name="nameOnCard"
                                        value={paymentData.nameOnCard}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors"
                                    />
                                </div>

                                {/* Card number */}
                                <div>
                                    <label htmlFor="cardNumber" className="block text-xs sm:text-sm font-medium text-[#727A90] mb-1.5 sm:mb-2">
                                        Card number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={paymentData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="0000 0000 0000"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors pr-8 sm:pr-10"
                                        />
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.125 4.5H4.875C3.42525 4.5 2.25 5.67525 2.25 7.125V16.875C2.25 18.3247 3.42525 19.5 4.875 19.5H19.125C20.5747 19.5 21.75 18.3247 21.75 16.875V7.125C21.75 5.67525 20.5747 4.5 19.125 4.5Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M2.25 9H21.75M6 14.0625H8.25V15H6V14.0625Z" stroke="#9CA3AF" strokeWidth="2.8125" strokeLinejoin="round" />
                                            </svg>

                                        </div>
                                    </div>
                                </div>

                                {/* Expiration and CVC */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label htmlFor="expiration" className="block text-xs sm:text-sm font-medium text-[#727A90] mb-1.5 sm:mb-2">
                                            Expiration
                                        </label>
                                        <input
                                            type="text"
                                            id="expiration"
                                            name="expiration"
                                            value={paymentData.expiration}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cvc" className="block text-xs sm:text-sm font-medium text-[#727A90] mb-1.5 sm:mb-2">
                                            CVC
                                        </label>
                                        <input
                                            type="text"
                                            id="cvc"
                                            name="cvc"
                                            value={paymentData.cvc}
                                            onChange={handleInputChange}
                                            placeholder="---"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Postal Code */}
                                <div>
                                    <label htmlFor="postalCode" className="block text-xs sm:text-sm font-medium text-[#727A90] mb-1.5 sm:mb-2">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={paymentData.postalCode}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors"
                                    />
                                </div>

                                {/* Terms and Conditions Checkbox */}
                                <div className="flex items-start space-x-3">
                                    <div className="relative mt-1">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="terms"
                                            className={`flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-colors ${termsAccepted
                                                    ? 'bg-primary border-primary'
                                                    : 'border-[#E9EAEA]'
                                                }`}
                                        >
                                            {termsAccepted && (
                                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </label>
                                    </div>
                                    <label htmlFor="terms" className="text-xs sm:text-sm text-[#24282E] cursor-pointer flex-1">
                                        By clicking, I agree that I have read and accepted the{' '}
                                        <a href="#" className="text-primary hover:underline">Terms of Use</a>
                                        {' '}and{' '}
                                        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                                    </label>
                                </div>

                                {/* Pay Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 sm:py-4 px-4 sm:px-6 rounded-md text-sm sm:text-base font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                                >
                                    Pay $2,500.00
                                </button>

                                {/* Free Trial Message */}
                                <div className="text-center">
                                    <p className="text-primary text-xs sm:text-sm font-medium">
                                        Free to use for first 30 days
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
