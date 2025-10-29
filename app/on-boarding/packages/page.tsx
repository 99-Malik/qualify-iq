'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../../../components/NavBar/page';
import GradientBg from '../../../components/Svgs/GradientBg';
import { Gift } from 'lucide-react';
import Image from 'next/image';
export default function Packages() {
    const router = useRouter();
    const [validatedLeadsRange, setValidatedLeadsRange] = useState(1000);
    const [emailCampaignsRange, setEmailCampaignsRange] = useState(10000);
    const validatedSliderRef = useRef<HTMLInputElement>(null);
    const emailSliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (validatedSliderRef.current) {
            const percentage = ((validatedLeadsRange - 1000) / (10000 - 1000)) * 100;
            validatedSliderRef.current.style.setProperty('--range-progress', `${percentage}%`);
        }
        if (emailSliderRef.current) {
            const percentage = ((emailCampaignsRange - 10000) / (100000 - 10000)) * 100;
            emailSliderRef.current.style.setProperty('--range-progress', `${percentage}%`);
        }
    }, [validatedLeadsRange, emailCampaignsRange]);

    const handleSubscribe = (packageName: string, type: string) => {
        console.log(`Subscribing to ${packageName} - ${type}`);
        router.push('/ai-assistance');
        // Handle subscription logic
    };

    // Validated Leads Cards
    const validatedLeadsCards = [
        { 
            price: '$500', 
            label: 'Starter', 
            labelColor: 'bg-primary',
            emails: '1,000', 
            cost: '$500', 
            costPer: '$0.50' 
        },
        { 
            price: '$1,000', 
            label: 'Growth', 
            labelColor: 'bg-[#F9A80A]',
            emails: '2,000', 
            cost: '$1,000', 
            costPer: '$0.50' 
        },
        { 
            price: '$2,500', 
            label: 'Professional', 
            labelColor: 'bg-[#F96353]',
            emails: '5,000', 
            cost: '$2,500', 
            costPer: '$0.50' 
        },
        { 
            price: '$5,000', 
            label: 'Scale', 
            labelColor: 'bg-[#744A6E]',
            emails: '10,000', 
            cost: '$5,000', 
            costPer: '$0.50' 
        }
    ];

    // Qualified Leads Cards
    const qualifiedLeadsCards = [
        { 
            price: '$500-$2,000', 
            label: '5-20 leads', 
            labelColor: 'bg-primary',
            discount: 'No discount',
            pricePerLead: '$100'
        },
        { 
            price: '$1,890-$4,500', 
            label: '21-50 leads', 
            labelColor: 'bg-[#F9A80A]',
            discount: 'Discount 10%',
            pricePerLead: '$100'
        },
        { 
            price: '$4,335+', 
            label: '51+ leads', 
            labelColor: 'bg-[#F96353]',
            discount: 'Discount 15%',
            pricePerLead: '$100'
        }
    ];

    // Email Campaigns Cards
    const emailCampaignsCards = [
        { 
            price: '—', 
            label: 'Starter', 
            labelColor: 'bg-primary',
            monthlyEmails: '10,000',
            emailsPerAccount: '10x emails per account',
            smtpCost: 'SMTP sending cost'
        },
        { 
            price: '—', 
            label: 'Growth', 
            labelColor: 'bg-[#F9A80A]',
            monthlyEmails: '25,000',
            emailsPerAccount: '10x emails per account',
            smtpCost: 'SMTP sending cost'
        },
        { 
            price: '—', 
            label: 'Professional', 
            labelColor: 'bg-[#F96353]',
            monthlyEmails: '50,000',
            emailsPerAccount: '10x emails per account',
            smtpCost: 'SMTP sending cost'
        },
        { 
            price: '—', 
            label: 'Scale', 
            labelColor: 'bg-[#744A6E]',
            monthlyEmails: '100,000',
            emailsPerAccount: '10x emails per account',
            smtpCost: 'SMTP sending cost'
        }
    ];

    // Automation Suite Cards
    const automationSuiteCards = [
        {
            price: '$250/ Company',
            label: 'Monthly',
            labelColor: 'bg-primary',
            features: [
                'Automated lead management',
                'CRM & campaign integrations',
                'Free Landing Page Generation'
            ]
        },
        {
            price: '$2,400 /year',
            label: 'Yearly',
            labelColor: 'bg-[#F9A80A]',
            features: [
                'Automated lead management',
                'CRM & campaign integrations',
                'Free Landing Page Generation'
            ]
        }
    ];

    return (
        <div className="min-h-screen relative">
            <NavBar />

            {/* Main Content */}
            <div className="relative z-10 mt-10">
                <div className="absolute inset-0 -z-10">
                    <GradientBg />
                </div>
                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        {/* Tiers Tag */}
                        <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-lg text-md font-medium mb-6 shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300">
                            Tiers
                      </div>

                        {/* Main Title */}
                        <h1 className="text-4xl font-bold mb-4">
                            <span className="text-black">Qualify IQ Packages</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-md text-[#727A90] max-w-2xl mx-auto">
                            Unlock your leads with QualifIQ! Join us and transform your sales strategy today.
                        </p>
                    </div>

                    {/* Validated Leads Section */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-[#24282E] mb-2">Validated Leads</h2>
                        <p className="text-sm text-[#727A90] mb-6">
                            (Existing franchise owners in your industry with their updated contact information)
                        </p>

                        {/* Range Slider */}
                                <div className="mb-6">
                            <div className="flex justify-between text-sm text-[#24282E] mb-2">
                                <span>1000 Qualified Emails</span>
                                <span>10,000 Qualified Emails</span>
                            </div>
                            <input
                                ref={validatedSliderRef}
                                type="range"
                                min="1000"
                                max="10000"
                                step="100"
                                value={validatedLeadsRange}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setValidatedLeadsRange(value);
                                }}
                                className="range-slider"
                            />
                                </div>

                        {/* Important Info */}
                        <p className="text-sm text-[#24282E] mb-6">
                            Important Info : Cost Per Qualified Email Leads will take $0.50 Cents
                        </p>

                        {/* Validated Leads Cards */}
                        <div className="bg-white border border-[#E3E1E5] rounded-lg p-6 mb-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {validatedLeadsCards.map((card, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg shadow-primary/30 p-6 border border-primary flex flex-col">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-2xl font-bold text-primary">{card.price}</span>
                                            <span className={`${card.labelColor} text-white px-3 py-2 rounded-md text-xs font-medium`}>
                                                {card.label}
                                            </span>
                                        </div>
                                        <div className="border-t border-[#e8eaf0]"></div>
                                    </div>
                                    <div className="space-y-2 mb-6 flex-1 pl-2">
                                        <div className="flex items-center space-x-2 text-sm text-[#24282E]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] shrink-0"></span>
                                            <span className="font-medium">Emails </span>
                                            <span>{card.emails}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-[#24282E]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] shrink-0"></span>
                                            <span>Cost will be </span>
                                            <span className="text-primary font-semibold">{card.cost}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-[#24282E]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] shrink-0"></span>
                                            <span>Cost per </span>
                                            <span className="text-primary font-semibold">{card.costPer}</span>
                                        </div>
                                </div>
                                    <button
                                        onClick={() => handleSubscribe(card.label, 'Validated Leads')}
                                        className="w-full bg-white text-primary border border-primary py-3 px-4 rounded-lg font-medium text-sm hover:bg-primary/10 transition-all duration-300"
                                    >
                                        Subscribe Now
                                    </button>
                                        </div>
                                    ))}
                                </div>
                                </div>
                    </div>

                    {/* Qualified Leads Section */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-[#24282E] mb-2">Qualified Leads</h2>
                        <p className="text-sm text-[#727A90] mb-6">
                            (Vetted leads that meet your financial and experience criteria)
                        </p>

                        {/* Important Info */}
                        <p className="text-sm text-[#24282E] mb-6">
                            Important Info : Cost Per Qualified Leads will take $100.
                        </p>

                        {/* Qualified Leads Cards */}
                        <div className="bg-white border border-[#E3E1E5] rounded-lg p-6 mb-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {qualifiedLeadsCards.map((card, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg shadow-primary/30 p-6 border border-primary flex flex-col">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xl font-bold text-primary">{card.price}</span>
                                            <span className={`${card.labelColor} text-white px-3 py-2 rounded-md text-xs font-medium`}>
                                                {card.label}
                                            </span>
                                        </div>
                                        <div className="border-t border-[#e8eaf0]"></div>
                                    </div>
                                    <div className="space-y-2 mb-6 flex-1 pl-2">
                                        <div className="flex items-center space-x-2 text-sm text-[#24282E]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] shrink-0"></span>
                                            {card.discount === 'No discount' ? (
                                                <span className="text-[#F96353]">{card.discount}</span>
                                            ) : card.discount.includes('10%') ? (
                                                <span>Discount <span className="text-[#F96353] font-semibold">10%</span></span>
                                            ) : card.discount.includes('15%') ? (
                                                <span>Discount <span className="text-[#F96353] font-semibold">15%</span></span>
                                            ) : (
                                                <span>{card.discount}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-[#24282E]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] shrink-0"></span>
                                            <span>Price per Lead </span>
                                            <span className="text-primary font-semibold">{card.pricePerLead}</span>
                                        </div>
                                    </div>
                                <button
                                        onClick={() => handleSubscribe(card.label, 'Qualified Leads')}
                                        className="w-full bg-white text-primary border border-primary py-3 px-4 rounded-lg font-medium text-sm hover:bg-primary/10 transition-all duration-300"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                                ))}
                                </div>
                             {/* Discount Structure */}
                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-[#24282E] mb-3">Built-in discount structure:</h3>
                            <ul className="space-y-2 text-sm text-[#24282E]">
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#24282E] mr-2"></span>
                                    5-20 leads → <span className="text-[#F96353]">No discount</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#24282E] mr-2"></span>
                                    21-50 leads → <span className="text-primary font-semibold">10%</span> off
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#24282E] mr-2"></span>
                                    51+ leads → <span className="text-[#F96353] font-semibold">15%</span> off
                                </li>
                            </ul>
                                </div>
                                </div>
                                
                                
                                </div>

                    {/* Email Campaigns Section */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-[#24282E] mb-2">Email Campaigns</h2>
                        <p className="text-sm text-[#727A90] mb-6">
                            (Monthly campaign management for outreach or nurture flows)
                        </p>

                        {/* Range Slider */}
                        <div className="mb-6">
                            <div className="flex justify-between text-sm text-[#24282E] mb-2">
                                <span>10,000 Emails</span>
                                <span>100,000 Emails</span>
                                </div>
                            <input
                                ref={emailSliderRef}
                                type="range"
                                min="10000"
                                max="100000"
                                step="1000"
                                value={emailCampaignsRange}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setEmailCampaignsRange(value);
                                }}
                                className="range-slider"
                            />
                                </div>
                                
                        {/* Email Campaigns Cards */}
                        <div className="bg-white border border-[#E3E1E5] rounded-lg p-6 mb-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {emailCampaignsCards.map((card, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg shadow-primary/30 p-6 border border-primary flex flex-col">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-2xl font-bold text-primary">{card.price}</span>
                                            <span className={`${card.labelColor} text-white px-3 py-2 rounded-md text-xs font-medium`}>
                                                {card.label}
                                            </span>
                                        </div>
                                        <div className="border-t border-[#e8eaf0]"></div>
                                    </div>
                                    <div className="space-y-2 mb-6 flex-1 pl-2">
                                        <div className="flex items-center space-x-2 text-sm text-[#24282E]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] shrink-0"></span>
                                            <span className="font-medium">Monthly Emails </span>
                                            <span>{card.monthlyEmails}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-[#24282E]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] shrink-0"></span>
                                            <span><span className="text-primary font-semibold">10x</span> emails per account</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-[#24282E]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] shrink-0"></span>
                                            <span>{card.smtpCost}</span>
                                        </div>
                                    </div>
                                <button
                                        onClick={() => handleSubscribe(card.label, 'Email Campaigns')}
                                        className="w-full bg-white text-primary border border-primary py-3 px-4 rounded-lg font-medium text-sm hover:bg-primary/10 transition-all duration-300"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                                ))}
                            </div>
                        </div>
                                </div>

                    {/* QualifiQ Automation Suite Section */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-[#24282E] mb-2">QualifiQ Automation Suite</h2>
                        <p className="text-sm text-[#727A90] mb-6">
                            (Lead automation & conversion platform)
                        </p>

                        {/* Automation Suite Cards */}
                        <div className="bg-white border border-[#E3E1E5] rounded-lg p-6 max-w-full mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {automationSuiteCards.map((card, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-lg shadow-primary/30 p-6 border border-primary flex flex-col">
                                        <div className="mb-4">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-xl font-bold text-primary">{card.price}</span>
                                                <span className={`${card.labelColor} text-white px-3 py-2 rounded-md text-xs font-medium`}>
                                                    {card.label}
                                                </span>
                                            </div>
                                            <div className="border-t border-[#e8eaf0]"></div>
                                </div>
                                        <div className="space-y-2 mb-6 flex-1 pl-2">
                                            {card.features.map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center space-x-2 text-sm text-[#24282E]">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3A3541] shrink-0"></span>
                                                    <span>{feature}</span>
                                </div>
                                            ))}
                                </div>
                                <button
                                            onClick={() => handleSubscribe(card.label, 'Automation Suite')}
                                            className="w-full bg-white text-primary border border-primary py-3 px-4 rounded-lg font-medium text-sm hover:bg-primary/10 transition-all duration-300"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Free Add-on Section */}
                    <div className="mb-16 bg-white border border-[#E3E1E5] rounded-lg p-6">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <Image src="/images/gift.png" alt="Free Add-on" width={44} height={44} />
                                    <h2 className="text-2xl font-bold text-[#24282E]">Free Add-on</h2>
                                </div>
                                <span className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-medium">
                                    Gift
                                </span>
                            </div>
                            <div className="border-t border-[#e8eaf0]"></div>
                        </div>
                        <ul className="space-y-2 text-sm text-[#24282E]">
                            <li className="flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#24282E] mr-2"></span>
                                🎁Custom Landing Page Build
                            </li>
                            <li className="flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#24282E] mr-2"></span>
                                Professionally designed lead generation page
                            </li>
                            <li className="flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#24282E] mr-2"></span>
                                Included free with any active package
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
