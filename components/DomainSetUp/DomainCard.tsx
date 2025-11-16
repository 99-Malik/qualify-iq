'use client';

import React from 'react';
import { Globe, Check, X, Link2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface DomainCardProps {
    domain: string;
    isConnected: boolean;
    imageUrl: string;
    onClick?: () => void;
}

export default function DomainCard({ domain, isConnected, imageUrl, onClick }: DomainCardProps) {
    const handleClick = () => {
        if (!isConnected && onClick) {
            onClick();
        }
    };

    return (
        <div 
            className={`bg-white rounded-lg ${!isConnected ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
            onClick={handleClick}
        >
            {/* Image with border and spacing */}
            <div className="p-4">
                <div className="w-full h-80 relative rounded-lg overflow-hidden border border-[#E4E7EC]">
                    <Image
                        src={imageUrl}
                        alt={domain}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Domain Info */}
            <div className="px-4 pb-4">
                <div className="flex items-center gap-2 mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z" fill="#5542F6" />
                    </svg>

                    <span className="text-lg font-semibold text-[#24282E]">{domain}</span>
                </div>

                {/* Connection Status */}
                <div className="flex items-center gap-1 mb-4">
                    {isConnected ? (
                        <>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM7.5 12.75L3.75 9L4.8075 7.9425L7.5 10.6275L13.1925 4.935L14.25 6L7.5 12.75Z" fill="#00B090" />
                            </svg>

                            <span className="text-sm font-bold text-[#00B090]">Connected</span>
                        </>
                    ) : (
                        <>
                            <X size={20} className="text-[#84818A]" />
                            <span className="text-sm font-medium text-[#84818A]">Not Connected</span>
                        </>
                    )}
                </div>


            </div>
        </div>
    );
}

