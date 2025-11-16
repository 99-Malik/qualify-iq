'use client';

import React from 'react';
import { Bell, Mail, ChevronDown, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

type NavBarProps = {
    isLoggedIn?: boolean;
    hideLogo?: boolean;
};

export default function NavBar({ isLoggedIn = false, hideLogo = false }: NavBarProps) {
    const router = useRouter();
    
    return (
        <nav className={`${isLoggedIn ? 'bg-[#FBFAFC]' : 'bg-white border-b border-[#E4E7EC]'} relative z-50`}>
            <div className="w-full pl-2 sm:pl-2 lg:pl-2 pr-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    {/* Left Section - Branding */}
                    <div className="flex items-center">
                        {!isLoggedIn && (
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                                <span className="text-white font-bold text-xs sm:text-sm">IQ</span>
                            </div>
                        )}
                        {!isLoggedIn && <h1 className="text-base sm:text-lg font-semibold text-[#3A3541]">Qualify IQ</h1>}
                        {isLoggedIn && (
                            <div className="ml-2 sm:ml-6 hidden md:flex items-center">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727A90]" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="pl-9 pr-3 py-1.5 sm:py-2 w-48 lg:w-64 bg-[#F7F8FA] text-[#727A90] rounded-md border border-[#E4E7EC] focus:outline-none focus:border-primary text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Section - User Profile */}
                    {!isLoggedIn ? (
                        <div className="flex items-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                                    alt="User Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-base sm:text-lg font-semibold text-[#3A3541]">User Name</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
                            {/* Bell with dot */}
                            <button 
                                onClick={() => router.push('/notifications')}
                                className="relative cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 19.5C9.1 19.5 10 18.6 10 17.5H6C6 18.6 6.89 19.5 8 19.5ZM14 13.5V8.5C14 5.43 12.36 2.86 9.5 2.18V1.5C9.5 0.67 8.83 0 8 0C7.17 0 6.5 0.67 6.5 1.5V2.18C3.63 2.86 2 5.42 2 8.5V13.5L0 15.5V16.5H16V15.5L14 13.5Z" fill="#84818A" />
                                </svg>
                                <span className="absolute -top-1.5 -right-1.5 w-2 h-2 sm:w-2 sm:h-2 bg-[#FF3D00] rounded-full"></span>
                            </button>
                            {/* Mail with dot */}
                            <div className="relative">
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" fill="#84818A" />
                                </svg>
                                <span className="absolute -top-2 -right-1.5 w-2 h-2 sm:w-2 sm:h-2 bg-[#FF3D00] rounded-full"></span>
                            </div>
                            {/* User dropdown */}
                            <div className="flex items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="hidden sm:inline text-base lg:text-lg font-semibold text-[#3A3541] mr-1">Username</span>
                                <ChevronDown className="text-[#727A90]" size={16} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
