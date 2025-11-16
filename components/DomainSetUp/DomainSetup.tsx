'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link2, ShoppingCart } from 'lucide-react';
import DomainCard from './DomainCard';
import PurchaseDomain from './PurchaseDomain';
import ConnectDomain from './ConnectDomain';

interface Domain {
    domain: string;
    isConnected: boolean;
    imageUrl: string;
}

export default function DomainSetup() {
    const router = useRouter();
    const [showPurchaseDomain, setShowPurchaseDomain] = useState(false);
    const [showConnectDomain, setShowConnectDomain] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState<{ domain: string; imageUrl: string } | null>(null);

    // Sample domain data
    const domains: Domain[] = [
        {
            domain: 'enginedesign.com',
            isConnected: true,
            imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop'
        },
        {
            domain: 'enginedesign.com',
            isConnected: true,
            imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop'
        },
        {
            domain: 'enginedesign.com',
            isConnected: false,
            imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop'
        }
    ];

    if (showPurchaseDomain) {
        return <PurchaseDomain onBack={() => setShowPurchaseDomain(false)} />;
    }

    if (showConnectDomain && selectedDomain) {
        return (
            <ConnectDomain
                onBack={() => {
                    setShowConnectDomain(false);
                    setSelectedDomain(null);
                }}
                domain={selectedDomain.domain}
                imageUrl={selectedDomain.imageUrl}
            />
        );
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

            {/* Header with Title and Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Domain Setup</h1>
                
                <div className="flex items-center gap-3">
                    {/* Connect Domain Button */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#EDECFE] text-[#2E2C34] rounded-sm hover:bg-[#E0DEFE] transition-colors text-sm font-medium">
                        <Link2 size={16} />
                        Connect Domain
                    </button>
                    
                    {/* Purchase Domain Button */}
                    <button 
                        onClick={() => setShowPurchaseDomain(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium"
                    >
                        <ShoppingCart size={16} />
                        Purchase Domain
                    </button>
                </div>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-6"></div>
            
            {/* My Domains Section */}
            <div>
                <h2 className="text-xl font-bold text-[#24282E] mb-6">My Domains</h2>
                
                {/* Domain Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {domains.map((domainData, index) => (
                        <DomainCard
                            key={index}
                            domain={domainData.domain}
                            isConnected={domainData.isConnected}
                            imageUrl={domainData.imageUrl}
                            onClick={() => {
                                setSelectedDomain({ domain: domainData.domain, imageUrl: domainData.imageUrl });
                                setShowConnectDomain(true);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

