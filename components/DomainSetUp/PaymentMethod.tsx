'use client';

import React, { useState } from 'react';
import ThankYou from './ThankYou';

interface PaymentMethodProps {
    onBack?: () => void;
    totalAmount?: string;
}

export default function PaymentMethod({ onBack, totalAmount = '$2,500.00' }: PaymentMethodProps) {
    const [paymentData, setPaymentData] = useState({
        nameOnCard: 'John Doe',
        cardNumber: '0000 0000 0000',
        expiration: '',
        cvc: '',
        postalCode: ''
    });
    const [termsAccepted, setTermsAccepted] = useState(true);
    const [showThankYou, setShowThankYou] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // allow only digits, max length 3
        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 3);
        setPaymentData(prev => ({ ...prev, cvc: digitsOnly }));
    };

    const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Format as MM/YY with auto-insert slash after 2 digits
        let input = e.target.value.replace(/\D/g, '');
        if (input.length > 4) input = input.slice(0, 4);

        let formatted = input;
        if (input.length >= 3) {
            formatted = `${input.slice(0, 2)}/${input.slice(2)}`;
        } else if (input.length >= 1) {
            formatted = input;
        }

        setPaymentData(prev => ({ ...prev, expiration: formatted }));
    };

    const handlePayment = () => {
        console.log('Processing payment...', paymentData);
        // Show thank you page
        setShowThankYou(true);
    };

    const handleBackFromThankYou = () => {
        setShowThankYou(false);
    };

    // Show Thank You page if payment was processed
    if (showThankYou) {
        return <ThankYou onBack={handleBackFromThankYou} />;
    }

    return (
        <div>
            {/* Header Section - Full Width */}
            <div className="mb-8">
                {/* Breadcrumb */}
                <div className="mb-2">
                    <nav className="text-sm">
                        <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => window.location.href = '/'}>
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

            {/* Payment Form Card - Centered with white background */}
            <div className="flex justify-center">
                <div className="bg-white rounded-lg p-6 w-full flex justify-center max-w-full">
                    <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-6 w-fit">
                        {/* Name on card */}
                        <div>
                            <label htmlFor="nameOnCard" className="block text-sm font-medium text-[#727A90] mb-2">
                                Name on card
                            </label>
                            <input
                                type="text"
                                id="nameOnCard"
                                name="nameOnCard"
                                value={paymentData.nameOnCard}
                                onChange={handleInputChange}
                                className="w-full px-0 py-3 border-0 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-b-[#5542F6] text-[#24282E] text-sm transition-colors"
                            />
                        </div>

                        {/* Card number */}
                        <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-[#727A90] mb-2">
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
                                    className="w-full px-0 py-3 pr-12 border-0 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-b-[#5542F6] text-[#24282E] text-sm transition-colors"
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiration" className="block text-sm font-medium text-[#727A90] mb-2">
                                    Expiration
                                </label>
                                <input
                                    type="text"
                                    id="expiration"
                                    name="expiration"
                                    value={paymentData.expiration}
                                    onChange={handleExpirationChange}
                                    placeholder="MM/YY"
                                    inputMode="numeric"
                                    maxLength={5}
                                    className="w-full px-0 py-3 border-0 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-b-[#5542F6] text-[#24282E] text-sm transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="cvc" className="block text-sm font-medium text-[#727A90] mb-2">
                                    CVC
                                </label>
                                <input
                                    type="text"
                                    id="cvc"
                                    name="cvc"
                                    value={paymentData.cvc}
                                    onChange={handleCvcChange}
                                    placeholder="--"
                                    inputMode="numeric"
                                    maxLength={3}
                                    className="w-full px-0 py-3 border-0 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-b-[#5542F6] text-[#24282E] text-sm transition-colors"
                                />
                            </div>
                        </div>

                        {/* Postal Code */}
                        <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-[#727A90] mb-2">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={paymentData.postalCode}
                                onChange={handleInputChange}
                                className="w-full px-0 py-3 border-0 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-b-[#5542F6] text-[#24282E] text-sm transition-colors"
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
                                    className={`flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-colors ${
                                        termsAccepted
                                            ? 'bg-[#5542F6] border-[#5542F6]'
                                            : 'border-[#E4E7EC]'
                                    }`}
                                >
                                    {termsAccepted && (
                                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </label>
                            </div>
                            <label htmlFor="terms" className="text-sm text-[#24282E] cursor-pointer flex-1">
                                By clicking, I agree that I have read and accepted the{' '}
                                <a href="#" className="text-[#5542F6] hover:underline">Terms of Use</a>
                                {' '}and{' '}
                                <a href="#" className="text-[#5542F6] hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        {/* Pay Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#5542F6] text-white py-3 px-6 rounded-md text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#5542F6]/50"
                        >
                            Pay {totalAmount}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

