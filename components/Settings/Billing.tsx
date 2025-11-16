'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Calendar } from 'lucide-react';
import SubscriptionPlanModal from './SubscriptionPlanModal';
import BillingHistory from './BillingHistory';

export default function Billing() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'payment-methods' | 'billing-history'>('payment-methods');
    const [nameOnCard, setNameOnCard] = useState('Henry Stephan');
    const [cardNumber, setCardNumber] = useState('0000 0000 0000');
    const [expiration, setExpiration] = useState('');
    const [cvc, setCvc] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/settings')}>
                        Settings
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Billing & Payment Method</span>
                </nav>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-6">Settings</h1>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-6"></div>

            {/* Back Arrow and Billing & Payment Method */}
            <div className="flex items-center gap-2 mb-8">
                <button
                    onClick={() => router.push('/settings')}
                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold text-[#24282E]">Billing & Payment Method</h2>
            </div>

            {/* Subscription Plan Section */}
            <div className="mb-6">
                <h3 className="text-lg font-bold text-[#24282E] mb-4">Subscription Plan</h3>
                <div className="flex flex-col gap-4">
                    {/* Monthly Plan */}
                    <div className="bg-white border border-[#E4E7EC] rounded-lg p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <svg width="38" height="38" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="32" rx="16" fill="#5542F6" fill-opacity="0.1" />
                                        <path d="M21.334 11.168H10.6673C9.92732 11.168 9.34065 11.7613 9.34065 12.5013L9.33398 20.5013C9.33398 21.2413 9.92732 21.8346 10.6673 21.8346H21.334C22.074 21.8346 22.6673 21.2413 22.6673 20.5013V12.5013C22.6673 11.7613 22.074 11.168 21.334 11.168ZM21.334 20.5013H10.6673V16.5013H21.334V20.5013ZM21.334 13.8346H10.6673V12.5013H21.334V13.8346Z" fill="#5542F6" />
                                    </svg>


                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-[#24282E]">Monthly Plan</span>
                                        <span className="px-2 py-2 bg-[#ffdfc0] text-[#2E2C34] rounded-sm text-xs font-bold">Current Plan</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-[#504F54]">Amount: </span>
                                        <span className="text-xs  text-[#504F54]">$250</span>
                                    </div>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-white border-2 border-[#E4E7EC] text-[#24282E] rounded-sm hover:bg-[#F7F8FA] transition-colors text-sm font-medium">
                                Unsubscribe
                            </button>
                        </div>
                    </div>

                    {/* Annual Plan */}
                    <div className="bg-white border border-[#E4E7EC] rounded-lg p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <svg width="38" height="38" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="32" rx="16" fill="#5542F6" fill-opacity="0.1" />
                                        <path d="M21.334 11.168H10.6673C9.92732 11.168 9.34065 11.7613 9.34065 12.5013L9.33398 20.5013C9.33398 21.2413 9.92732 21.8346 10.6673 21.8346H21.334C22.074 21.8346 22.6673 21.2413 22.6673 20.5013V12.5013C22.6673 11.7613 22.074 11.168 21.334 11.168ZM21.334 20.5013H10.6673V16.5013H21.334V20.5013ZM21.334 13.8346H10.6673V12.5013H21.334V13.8346Z" fill="#5542F6" />
                                    </svg>


                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-[#24282E] mb-1">Annual Plan</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-[#504F54]">Amount: </span>
                                        <span className="text-xs  text-[#504F54]">$2400</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 bg-[#14B13B] text-white rounded-sm hover:bg-[#12A035] transition-colors text-sm font-medium">
                                    Save 20%
                                </button>
                                <button 
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-4 py-2 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Billing & Payment Method Section */}
            <div className="bg-white border border-[#E4E7EC] rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-[#24282E] mb-6">Billing & Payment Method</h3>

                {/* Tab Navigation */}
                <div className="flex items-center gap-6 mb-6 border-b border-[#EBEAED]">
                    <button
                        onClick={() => setActiveTab('payment-methods')}
                        className={`pb-3 px-1 text-sm font-medium transition-colors relative ${activeTab === 'payment-methods'
                            ? 'text-[#5542F6]'
                            : 'text-[#727A90] hover:text-[#24282E]'
                            }`}
                    >
                        Payment Methods
                        {activeTab === 'payment-methods' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5542F6]"></span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('billing-history')}
                        className={`pb-3 px-1 text-sm font-medium transition-colors relative ${activeTab === 'billing-history'
                            ? 'text-[#5542F6]'
                            : 'text-[#727A90] hover:text-[#24282E]'
                            }`}
                    >
                        Billing History
                        {activeTab === 'billing-history' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5542F6]"></span>
                        )}
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'payment-methods' && (
                    <div>
                        {/* Existing Credit Card */}
                        <div className="bg-[#f7f7f8]  rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="32" height="32" rx="16" fill="#5542F6" fill-opacity="0.1" />
                                            <path d="M21.334 11.168H10.6673C9.92732 11.168 9.34065 11.7613 9.34065 12.5013L9.33398 20.5013C9.33398 21.2413 9.92732 21.8346 10.6673 21.8346H21.334C22.074 21.8346 22.6673 21.2413 22.6673 20.5013V12.5013C22.6673 11.7613 22.074 11.168 21.334 11.168ZM21.334 20.5013H10.6673V16.5013H21.334V20.5013ZM21.334 13.8346H10.6673V12.5013H21.334V13.8346Z" fill="#5542F6" />
                                        </svg>

                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-[#24282E] mb-1">Credit Card</div>
                                        <div className="text-xs text-[#727A90]">*******3131</div>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-[#f7f7f8] border-2 border-[#E4E7EC] text-[#24282E] rounded-sm hover:bg-[#F7F8FA] transition-colors text-sm font-medium">
                                    Edit
                                </button>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name on Card */}
                            <div>
                                <label className="block text-sm font-medium text-[#504F54] mb-2">
                                    Name on Card
                                </label>
                                <input
                                    type="text"
                                    value={nameOnCard}
                                    onChange={(e) => setNameOnCard(e.target.value)}
                                    className="w-full px-4 py-3 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                                />
                            </div>

                            {/* Card Number */}
                            <div>
                                <label className="block text-sm font-medium text-[#504F54] mb-2">
                                    Card number
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.125 4.5H4.875C3.42525 4.5 2.25 5.67525 2.25 7.125V16.875C2.25 18.3247 3.42525 19.5 4.875 19.5H19.125C20.5747 19.5 21.75 18.3247 21.75 16.875V7.125C21.75 5.67525 20.5747 4.5 19.125 4.5Z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M2.25 9H21.75M6 14.0625H8.25V15H6V14.0625Z" stroke="#9CA3AF" stroke-width="2.8125" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Expiration */}
                            <div>
                                <label className="block text-sm font-medium text-[#504F54] mb-2">
                                    Expiration
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={expiration}
                                        onChange={(e) => setExpiration(e.target.value)}
                                        placeholder="MM/YY"
                                        className="w-full px-4 py-3 pr-12 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17 13H12V18H17V13ZM16 2V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4H18V2H16ZM19 20H5V9H19V20Z" fill="#84818A" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* CVC */}
                            <div>
                                <label className="block text-sm font-medium text-[#504F54] mb-2">
                                    CVC
                                </label>
                                <input
                                    type="text"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    placeholder="--"
                                    className="w-full px-4 py-3 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                                />
                            </div>

                            {/* Postal Code */}
                            <div>
                                <label className="block text-sm font-medium text-[#504F54] mb-2">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    placeholder="--"
                                    className="w-full px-4 py-3 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'billing-history' && (
                    <BillingHistory />
                )}
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push('/settings')}
                    className="px-6 py-3 bg-white border border-[#E4E7EC] text-[#24282E] rounded-sm hover:bg-[#F7F8FA] transition-colors text-sm font-medium"
                >
                    Discard
                </button>
                <button className="px-6 py-3 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium">
                    Save Changes
                </button>
            </div>

            {/* Subscription Plan Modal */}
            <SubscriptionPlanModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
}

