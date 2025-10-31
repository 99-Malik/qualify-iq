'use client';

import React from 'react';
import NavBar from '../NavBar/page';
import SideBar from '../SideBar/SideBar';

type AppLayoutProps = {
    children: React.ReactNode;
    activeKey?: string;
    contentClassName?: string;
    hideLogoForNav?: boolean;
};

export default function AppLayout({ children, activeKey, contentClassName, hideLogoForNav }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-[#FBFAFC] flex flex-col">
            <div className="flex flex-1">
                {/* Always visible sidebar - starts from top */}
                <aside className="w-auto h-screen sticky top-0 z-40">
                    <SideBar activeKey={activeKey} />
                </aside>

                {/* Right section: Navbar + Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    <NavBar isLoggedIn hideLogo={hideLogoForNav} />
                    {/* Page content area */}
                    <main className={`flex-1 px-4 sm:px-6 lg:px-8 flex flex-col pt-2 sm:pt-4 pb-4 sm:pb-8 ${contentClassName || ''}`}>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}


