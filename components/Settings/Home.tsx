'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function SettingsHome() {
    const router = useRouter();

    const settingsCategories = [
        {
            key: 'account-setup',
            title: 'Account Setup',
            icon: <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.625" y="0.625" width="48.75" height="48.75" rx="24.375" fill="white" stroke="#EBEAED" strokeWidth="1.25" />
                <path d="M26.1419 19.793H24.0586V21.8763H26.1419V19.793ZM26.1419 23.9596H24.0586V30.2096H26.1419V23.9596ZM30.3086 13.5534L19.8919 13.543C18.7461 13.543 17.8086 14.4805 17.8086 15.6263V34.3763C17.8086 35.5221 18.7461 36.4596 19.8919 36.4596H30.3086C31.4544 36.4596 32.3919 35.5221 32.3919 34.3763V15.6263C32.3919 14.4805 31.4544 13.5534 30.3086 13.5534ZM30.3086 32.293H19.8919V17.7096H30.3086V32.293Z" fill="#5542F6" />
            </svg>,
            onClick: () => {
                // Navigate to account setup page
                router.push('/settings/account-setup');
            }
        },
        {
            key: 'repository',
            title: 'Repository',
            icon: <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.625" y="0.625" width="48.75" height="48.75" rx="24.375" fill="white" stroke="#EBEAED" strokeWidth="1.25" />
                <path d="M28.8496 31.25H31.3496V27.5H32.5996V25L31.3496 18.75H12.5996L11.3496 25V27.5H12.5996V35H23.8496V27.5H28.8496V31.25ZM21.3496 32.5H15.0996V27.5H21.3496V32.5Z" fill="#504F54" />
                <path d="M31.3496 15H12.5996V17.5H31.3496V15Z" fill="#504F54" />
                <path d="M35.0996 32.5V28.75H32.5996V32.5H28.8496V35H32.5996V38.75H35.0996V35H38.8496V32.5H35.0996Z" fill="#504F54" />
            </svg>,
            onClick: () => {
                // Navigate to repository page
                router.push('/settings/repository');
            }
        },
        {
            key: 'billing',
            title: 'Billing & Payment Method',
            icon: <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.625" y="0.625" width="48.75" height="48.75" rx="24.375" fill="white" stroke="#EBEAED" stroke-width="1.25" />
                <path d="M35.0996 15H15.0996C13.7121 15 12.6121 16.1125 12.6121 17.5L12.5996 32.5C12.5996 33.8875 13.7121 35 15.0996 35H35.0996C36.4871 35 37.5996 33.8875 37.5996 32.5V17.5C37.5996 16.1125 36.4871 15 35.0996 15ZM35.0996 32.5H15.0996V25H35.0996V32.5ZM35.0996 20H15.0996V17.5H35.0996V20Z" fill="#84818A" />
            </svg>
            ,
            onClick: () => {
                // Navigate to billing page
                router.push('/settings/billing');
            }
        },
        {
            key: 'forms-templates',
            title: 'Default Form & Templates',
            icon: <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.625" y="0.625" width="48.75" height="48.75" rx="24.375" fill="white" stroke="#EBEAED" stroke-width="1.25" />
                <path d="M32.5996 31.25H17.5996V28.75H32.5996V31.25ZM32.5996 26.25H17.5996V23.75H32.5996V26.25ZM32.5996 21.25H17.5996V18.75H32.5996V21.25ZM13.8496 37.5L15.7246 35.625L17.5996 37.5L19.4746 35.625L21.3496 37.5L23.2246 35.625L25.0996 37.5L26.9746 35.625L28.8496 37.5L30.7246 35.625L32.5996 37.5L34.4746 35.625L36.3496 37.5V12.5L34.4746 14.375L32.5996 12.5L30.7246 14.375L28.8496 12.5L26.9746 14.375L25.0996 12.5L23.2246 14.375L21.3496 12.5L19.4746 14.375L17.5996 12.5L15.7246 14.375L13.8496 12.5V37.5Z" fill="#504F54" />
            </svg>
            ,
            onClick: () => {
                // Navigate to forms & templates page
                router.push('/settings/forms-templates');
            }
        },
        {
            key: 'integrations',
            title: 'Integrations',
            icon: <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.625" y="0.625" width="48.75" height="48.75" rx="24.375" fill="white" stroke="#EBEAED" stroke-width="1.25" />
                <path d="M14.9746 25C14.9746 22.8625 16.7121 21.125 18.8496 21.125H23.8496V18.75H18.8496C15.3996 18.75 12.5996 21.55 12.5996 25C12.5996 28.45 15.3996 31.25 18.8496 31.25H23.8496V28.875H18.8496C16.7121 28.875 14.9746 27.1375 14.9746 25ZM20.0996 26.25H30.0996V23.75H20.0996V26.25ZM31.3496 18.75H26.3496V21.125H31.3496C33.4871 21.125 35.2246 22.8625 35.2246 25C35.2246 27.1375 33.4871 28.875 31.3496 28.875H26.3496V31.25H31.3496C34.7996 31.25 37.5996 28.45 37.5996 25C37.5996 21.55 34.7996 18.75 31.3496 18.75Z" fill="#504F54" />
            </svg>
            ,
            onClick: () => {
                // Navigate to integrations page
                router.push('/settings/integrations');
            }
        }
    ];

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
                    <span className="text-[#24282E]">Account Setup</span>
                </nav>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-8">Settings</h1>

            {/* Profile Picture Section */}
            <div className="bg-white border border-[#E4E7EC] rounded-lg p-6 mb-6">
                <div className="flex flex-col items-center">
                    {/* Profile Picture */}
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#E4E7EC]">
                        <Image
                            src="/images/settings-avatar.jpg"
                            alt="Profile"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Change Image Button */}
                    <button className="px-6 py-2 bg-[#edecfe] text-[#5542F6] rounded-sm hover:bg-[#e0ddfe] transition-colors text-sm font-medium">
                        Change Image
                    </button>
                </div>
            </div>

            {/* Settings Categories */}
            <div className="space-y-3">
                {settingsCategories.map((category) => {
                    return (
                        <button
                            key={category.key}
                            onClick={category.onClick}
                            className="w-full bg-white border border-[#E4E7EC] rounded-lg p-4 flex items-center justify-between hover:bg-[#F7F8FA] transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                    <div className="w-full h-full flex items-center justify-center">
                                        {category.icon}
                                    </div>
                                </div>
                                <span className={`text-sm font-semibold ${category.title === 'Account Setup' ? 'text-[#5542F6]' : 'text-[#24282E]'}`}>{category.title}</span>
                            </div>
                            <ChevronRight size={20} color="#84818A" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

