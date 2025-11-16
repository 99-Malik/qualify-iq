'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Info, Check } from 'lucide-react';
import OrderDomain from './OrderDomain';

interface PurchaseDomainProps {
    onBack?: () => void;
}

interface DomainSuggestion {
    domain: string;
    originalPrice: string;
    currentPrice: string;
    isSelected: boolean;
    isExactMatch?: boolean;
    description?: string[];
}

export default function PurchaseDomain({ onBack }: PurchaseDomainProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('qualifyiq.ai');
    const [selectedDomains, setSelectedDomains] = useState<string[]>(['qualifyiq.tech', 'qualifyiq.cloud']);
    const [showOrderDomain, setShowOrderDomain] = useState(false);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.push('/domain-setup');
        }
    };

    const exactMatch: DomainSuggestion = {
        domain: 'qualifyiq.ai',
        originalPrice: 'US$ 99.99',
        currentPrice: 'US$ 79.99',
        isSelected: false,
        isExactMatch: true,
        description: [
            '`.ai` domains are perfect for AI tools and machine learning projects.',
            'This domain is ideal for AI-driven qualification services. It suggests expertise in intelligent assessment solutions.'
        ]
    };

    const suggestions: DomainSuggestion[] = [
        { domain: 'qualifyiq.tech', originalPrice: 'US$ 59.99', currentPrice: 'US$ 6.99', isSelected: true },
        { domain: 'qualifyiq.io', originalPrice: 'US$ 59.99', currentPrice: 'US$ 6.99', isSelected: false },
        { domain: 'qualifyiq.cloud', originalPrice: 'US$ 59.99', currentPrice: 'US$ 6.99', isSelected: true },
        { domain: 'qualifyiq.shop', originalPrice: 'US$ 59.99', currentPrice: 'US$ 6.99', isSelected: false },
        { domain: 'qualifyiq.online', originalPrice: 'US$ 59.99', currentPrice: 'US$ 6.99', isSelected: false }
    ];

    const handleSelectDomain = (domain: string) => {
        setSelectedDomains(prev =>
            prev.includes(domain)
                ? prev.filter(d => d !== domain)
                : [...prev, domain]
        );
    };

    const handleNext = () => {
        setShowOrderDomain(true);
    };

    const handleBackFromOrder = () => {
        setShowOrderDomain(false);
    };

    if (showOrderDomain) {
        return <OrderDomain onBack={handleBackFromOrder} />;
    }

    return (
        <div>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Domain Setup</h1>

                <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-2 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium"
                >
                    Next
                </button>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-6"></div>

            {/* Add New Domain Section */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <button
                        onClick={handleBack}
                        className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                        </svg>

                    </button>
                    <h2 className="text-xl font-semibold text-[#24282E]">Add New Domain</h2>
                </div>

                {/* Search Input and Button */}
                <div className="flex items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="qualifyiq.ai"
                        className="flex-1 px-4 py-0 border-t border-b border-l border-[#E4E7EC] border rounded-l-sm rounded-r-none text-base text-[#24282E] placeholder:text-[#84818A] focus:outline-none focus:border-t-[#5542F6] focus:border-b-[#5542F6] focus:border-l-[#5542F6] focus:border-r-0 bg-white"
                        style={{ height: '48px', lineHeight: '48px' }}
                    />
                    <button
                        className="flex items-center justify-center gap-2 px-6 py-0 bg-[#5542F6] text-white rounded-r-sm rounded-l-none hover:bg-[#4535D6] transition-colors text-sm font-medium border-t border-b border-r border-[#5542F6] border-l-0"
                        style={{ height: '48px', lineHeight: '48px' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.3333 9.33333H9.80667L9.62 9.15333C10.2733 8.39333 10.6667 7.40667 10.6667 6.33333C10.6667 3.94 8.72667 2 6.33333 2C3.94 2 2 3.94 2 6.33333C2 8.72667 3.94 10.6667 6.33333 10.6667C7.40667 10.6667 8.39333 10.2733 9.15333 9.62L9.33333 9.80667V10.3333L12.6667 13.66L13.66 12.6667L10.3333 9.33333ZM6.33333 9.33333C4.67333 9.33333 3.33333 7.99333 3.33333 6.33333C3.33333 4.67333 4.67333 3.33333 6.33333 3.33333C7.99333 3.33333 9.33333 4.67333 9.33333 6.33333C9.33333 7.99333 7.99333 9.33333 6.33333 9.33333Z" fill="#FBFAFC" />
                        </svg>
                        Search Domain
                    </button>
                </div>
            </div>

            {/* EXACT MATCH Section */}
            <div className="mb-6 bg-[#fafbff]  border border-[#E4E7EC] rounded-lg p-6 relative">
                <div className="absolute top-4 left-4 py-4 px-2">
                    <span className="px-2 py-1 bg-[#00B090] text-white text-xs  rounded-lg uppercase">EXACT MATCH</span>
                </div>

                <div className="mt-8">
                    {/* Domain Name, Info Icon, Pricing and Select Button */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-[#24282E]">{exactMatch.domain}</h3>
                            <div className="w-5 h-5 rounded-full bg-[#F7F8FA] flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.01953 6.48781C7.01953 5.94681 7.45953 5.50781 7.99953 5.50781H8.12753C8.59753 5.50781 8.97853 5.88981 8.97853 6.35981C8.97708 6.45073 8.95877 6.54058 8.92453 6.62481C8.91088 6.65899 8.89344 6.69153 8.87253 6.72181C8.86516 6.73287 8.85642 6.74295 8.84653 6.75181L8.25653 7.19381C7.68953 7.62081 7.24953 8.24081 7.24953 9.08181C7.24953 9.28073 7.32855 9.47149 7.4692 9.61214C7.60985 9.75279 7.80062 9.83181 7.99953 9.83181C8.19844 9.83181 8.38921 9.75279 8.52986 9.61214C8.67051 9.47149 8.74953 9.28073 8.74953 9.08181C8.74953 8.83481 8.85553 8.62081 9.15753 8.39381L9.74653 7.95181C10.2795 7.55181 10.4785 6.85881 10.4785 6.35981C10.4787 6.05107 10.418 5.74533 10.3 5.46005C10.1819 5.17476 10.0089 4.91552 9.79065 4.69711C9.57243 4.47871 9.31333 4.30542 9.02814 4.18715C8.74296 4.06888 8.43727 4.00794 8.12853 4.00781H7.99953C7.34179 4.00781 6.711 4.2691 6.24591 4.73419C5.78082 5.19928 5.51953 5.83008 5.51953 6.48781C5.51953 6.68672 5.59855 6.87749 5.7392 7.01814C5.87985 7.15879 6.07062 7.23781 6.26953 7.23781C6.46844 7.23781 6.65921 7.15879 6.79986 7.01814C6.94051 6.87749 7.01953 6.68672 7.01953 6.48781ZM7.99153 10.4938C7.79262 10.4938 7.60185 10.5728 7.4612 10.7135C7.32055 10.8541 7.24153 11.0449 7.24153 11.2438C7.24153 11.4427 7.32055 11.6335 7.4612 11.7741C7.60185 11.9148 7.79262 11.9938 7.99153 11.9938H7.99953C8.19844 11.9938 8.38921 11.9148 8.52986 11.7741C8.67051 11.6335 8.74953 11.4427 8.74953 11.2438C8.74953 11.0449 8.67051 10.8541 8.52986 10.7135C8.38921 10.5728 8.19844 10.4938 7.99953 10.4938H7.99153Z" fill="#1D1E20" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8ZM13.5 8C13.5 9.45869 12.9205 10.8576 11.8891 11.8891C10.8576 12.9205 9.45869 13.5 8 13.5C6.54131 13.5 5.14236 12.9205 4.11091 11.8891C3.07946 10.8576 2.5 9.45869 2.5 8C2.5 6.54131 3.07946 5.14236 4.11091 4.11091C5.14236 3.07946 6.54131 2.5 8 2.5C9.45869 2.5 10.8576 3.07946 11.8891 4.11091C12.9205 5.14236 13.5 6.54131 13.5 8Z" fill="#1D1E20" />
                                </svg>

                            </div>
                        </div>

                        {/* Price and Select Button */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-[#6D7081] line-through">{exactMatch.originalPrice}</span>
                                <span className="text-xl font-bold text-[#24282E]">{exactMatch.currentPrice}</span>
                            </div>
                            <button className="px-10 py-3 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-semibold">
                                Select
                            </button>
                        </div>
                    </div>

                    {/* Separator Line */}
                    <div className="w-full h-px bg-[#EBEAED] mb-4"></div>

                    {/* Description Points */}
                    <div className="space-y-2">
                        {exactMatch.description?.map((desc, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.0465 5.955C21.4855 6.394 21.4855 7.106 21.0465 7.545L11.5085 17.084C11.3762 17.2164 11.219 17.3215 11.0461 17.3932C10.8731 17.4649 10.6877 17.5017 10.5005 17.5017C10.3133 17.5017 10.1279 17.4649 9.95494 17.3932C9.78198 17.3215 9.62484 17.2164 9.49251 17.084L5.20451 12.796C4.99353 12.585 4.875 12.2989 4.875 12.0005C4.875 11.7021 4.99353 11.416 5.20451 11.205C5.41549 10.994 5.70164 10.8755 6.00001 10.8755C6.29838 10.8755 6.58453 10.994 6.79551 11.205L10.5005 14.909L19.4545 5.955C19.8945 5.515 20.6075 5.515 21.0465 5.955Z" fill="#1D1E20" />
                                </svg>
                                <p className="text-sm text-[#24282E]">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Other Domain Suggestions */}
            <div className="overflow-hidden">
                {suggestions.map((suggestion, index) => {
                    const isSelected = selectedDomains.includes(suggestion.domain);
                    return (
                        <div key={index}>
                            <div className="px-4 py-4 grid grid-cols-[1fr_120px_100px] items-center gap-6">
                                <span className="text-base font-bold text-[#24282E]">{suggestion.domain}</span>
                                <div className="flex items-center gap-3 justify-end md:mr-10 lg:mr-50">
                                    <span className="text-sm text-[#84818A] line-through whitespace-nowrap">{suggestion.originalPrice}</span>
                                    <span className="text-lg font-bold text-[#24282E] whitespace-nowrap">{suggestion.currentPrice}</span>
                                </div>
                                <button
                                    onClick={() => handleSelectDomain(suggestion.domain)}
                                    className={`px-4 py-2 rounded-sm border transition-colors text-md font-bold whitespace-nowrap ${isSelected
                                        ? 'bg-white border-[#D8DAE0] border-2 text-[#14B13B]  hover:bg-[#F7F8FA]'
                                        : 'bg-white border-[#D8DAE0] border-2 text-[#5542F6] hover:bg-[#F7F8FA]'
                                        }`}
                                >
                                    {isSelected ? 'Selected' : 'Select'}
                                </button>
                            </div>
                            {index < suggestions.length - 1 && (
                                <div className="h-px bg-[#E4E7EC]"></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

