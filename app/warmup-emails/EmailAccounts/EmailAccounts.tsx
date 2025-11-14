'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface EmailAccount {
    email: string;
    emailSent: number;
    warmupEmails: number;
    healthScore: number;
    healthIconColor: 'orange' | 'gray';
}

const emailAccounts: EmailAccount[] = [
    { email: 'info123@gmail.com', emailSent: 94, warmupEmails: 0, healthScore: 90, healthIconColor: 'orange' },
    { email: 'user456@yahoo.com', emailSent: 85, warmupEmails: 5, healthScore: 80, healthIconColor: 'orange' },
    { email: 'contact789@hotmail.com', emailSent: 70, warmupEmails: 10, healthScore: 75, healthIconColor: 'gray' },
    { email: 'support101@outlook.com', emailSent: 92, warmupEmails: 2, healthScore: 95, healthIconColor: 'orange' },
    { email: 'admin202@icloud.com', emailSent: 88, warmupEmails: 15, healthScore: 85, healthIconColor: 'orange' },
    { email: 'feedback303@live.com', emailSent: 76, warmupEmails: 20, healthScore: 78, healthIconColor: 'gray' },
];

export default function EmailAccounts() {
    const router = useRouter();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            Object.values(menuRefs.current).forEach((ref) => {
                if (ref && !ref.contains(event.target as Node)) {
                    setOpenMenuId(null);
                }
            });
        };

        if (openMenuId) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenuId]);


    const EnvelopeIcon = () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="#84818A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 7L10 11L17 7" stroke="#84818A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div>
            {/* Breadcrumb and Add New Button */}
            <div className="flex items-center justify-between mb-6">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Email Warmups</span>
                </nav>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-medium">Add New</span>
                </button>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-6">Email Warmups</h1>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-8"></div>

            <div>
                <h2 className="text-xl font-bold text-[#24282E] mb-8">Email Accounts</h2>
            </div>

            {/* Table Container */}
            <div>
                {/* Table Header */}
                <div className="mb-4">
                    <div className="grid grid-cols-12 gap-4 px-6">
                        <div className="col-span-3">
                            <div className="flex items-center gap-3">

                                <span className="text-sm font-medium text-[#504F54]">Email</span>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <span className="text-sm font-medium text-[#504F54] text-center block">Email Sent</span>
                        </div>
                        <div className="col-span-3">
                            <span className="text-sm font-medium text-[#504F54] text-center block">Warmup Emails</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-sm font-medium text-[#504F54] text-center block">Health Score</span>
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                </div>

                {/* Email Cards */}
                <div className="space-y-4">
                    {emailAccounts.map((account, index) => (
                        <div
                            key={index}
                            onClick={() => router.push(`/warmup-emails/email-details?email=${encodeURIComponent(account.email)}`)}
                            className="bg-white rounded-lg px-6 py-4 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="grid grid-cols-12 gap-4 items-center">
                                {/* Email */}
                                <div className="col-span-3">
                                    <div className="flex items-center gap-3">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.666 3.33203H3.33268C2.41602 3.33203 1.67435 4.08203 1.67435 4.9987L1.66602 14.9987C1.66602 15.9154 2.41602 16.6654 3.33268 16.6654H16.666C17.5827 16.6654 18.3327 15.9154 18.3327 14.9987V4.9987C18.3327 4.08203 17.5827 3.33203 16.666 3.33203ZM16.666 6.66536L9.99935 10.832L3.33268 6.66536V4.9987L9.99935 9.16536L16.666 4.9987V6.66536Z" fill="#84818A" />
                                        </svg>
                                        <span className="text-sm font-bold  text-[#24282E]">{account.email}</span>
                                    </div>
                                </div>

                                {/* Email Sent */}
                                <div className="col-span-2">
                                    <span className="text-sm font-bold text-[#5542F6] text-center block">{account.emailSent}</span>
                                </div>

                                {/* Warmup Emails */}
                                <div className="col-span-3">
                                    <span className="text-sm font-bold text-[#24282E] text-center block">{account.warmupEmails}/30</span>
                                </div>

                                {/* Health Score */}
                                <div className="col-span-2">
                                    <span className="text-sm text-[#24282E] font-bold text-center block">{account.healthScore}%</span>
                                </div>

                                {/* Flame Icon and Three-dot Menu */}
                                <div className="col-span-2 flex justify-end items-center gap-2">
                                    <Image
                                        src={account.healthIconColor === 'orange' ? '/images/fire.png' : '/images/fire-off.png'}
                                        alt="Health status"
                                        width={20}
                                        height={20}
                                    />
                                    <div className="relative" ref={(el) => { menuRefs.current[account.email] = el; }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(openMenuId === account.email ? null : account.email);
                                            }}
                                            className="p-1 hover:bg-[#F7F8FA] rounded transition-colors"
                                        >
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.0007 12.6654C16.9173 12.6654 17.6673 11.9154 17.6673 10.9987C17.6673 10.082 16.9173 9.33203 16.0007 9.33203C15.084 9.33203 14.334 10.082 14.334 10.9987C14.334 11.9154 15.084 12.6654 16.0007 12.6654ZM16.0007 14.332C15.084 14.332 14.334 15.082 14.334 15.9987C14.334 16.9154 15.084 17.6654 16.0007 17.6654C16.9173 17.6654 17.6673 16.9154 17.6673 15.9987C17.6673 15.082 16.9173 14.332 16.0007 14.332ZM16.0007 19.332C15.084 19.332 14.334 20.082 14.334 20.9987C14.334 21.9154 15.084 22.6654 16.0007 22.6654C16.9173 22.6654 17.6673 21.9154 17.6673 20.9987C17.6673 20.082 16.9173 19.332 16.0007 19.332Z" fill="#767676" />
                                            </svg>

                                        </button>
                                        {openMenuId === account.email && (
                                            <div className="absolute right-0 top-full mt-2 bg-white border border-[#E4E7EC] rounded-md shadow-lg z-20 min-w-[150px]">
                                                <button className="w-full text-left px-4 py-2 text-sm text-[#24282E] hover:bg-[#F7F8FA] transition-colors">
                                                    View Details
                                                </button>
                                                <button className="w-full text-left px-4 py-2 text-sm text-[#24282E] hover:bg-[#F7F8FA] transition-colors">
                                                    Edit
                                                </button>
                                                <button className="w-full text-left px-4 py-2 text-sm text-[#FC3400] hover:bg-[#F7F8FA] transition-colors">
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

