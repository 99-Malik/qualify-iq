'use client';

import React from 'react';
import { Bell, Mail, ChevronDown, Search } from 'lucide-react';

type NavBarProps = {
    isLoggedIn?: boolean;
    onBrandHover?: (hovering: boolean) => void;
};

export default function NavBar({ isLoggedIn = false, onBrandHover }: NavBarProps) {
    return (
        <nav className={`${isLoggedIn ? 'bg-[#FBFAFC]' : 'bg-white border-b border-[#E4E7EC]'} relative z-50`}>
                <div className="w-full px-4 sm:px-6">
                    <div className="flex justify-between items-center h-16">
                        {/* Left Section - Branding */}
                        <div
                            className="flex items-center"
                            onMouseEnter={() => onBrandHover && onBrandHover(true)}
                            onMouseLeave={() => onBrandHover && onBrandHover(false)}
                        >
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-sm">IQ</span>
                            </div>
                            <h1 className="text-lg font-semibold text-[#3A3541]">Qualify IQ</h1>
                            {isLoggedIn && (
                                <div className="ml-6 hidden sm:flex items-center">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727A90]" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="pl-9 pr-3 py-2 w-64 bg-[#F7F8FA] text-[#727A90] rounded-md border border-[#E4E7EC] focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Section - User Profile */}
                        {!isLoggedIn ? (
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                    <img 
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                                        alt="User Avatar" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-lg font-semibold text-[#3A3541]">User Name</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-5">
                                {/* Bell with dot */}
                                <div className="relative">
                                    <Bell className="text-[#727A90]" size={22} />
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF3D00] rounded-full"></span>
                                </div>
                                {/* Mail with dot */}
                                <div className="relative">
                                    <Mail className="text-[#727A90]" size={22} />
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF3D00] rounded-full"></span>
                                </div>
                                {/* User dropdown */}
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                        <img 
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                                            alt="User Avatar" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-lg font-semibold text-[#3A3541] mr-1">Username</span>
                                    <ChevronDown className="text-[#727A90]" size={18} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        </nav>
    );
}
