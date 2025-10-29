'use client';

import React, { useRef, useState } from 'react';
import NavBar from '../NavBar/page';
import SideBar from '../SideBar/SideBar';

type AppLayoutProps = {
    children: React.ReactNode;
    activeKey?: string;
    contentClassName?: string;
};

export default function AppLayout({ children, activeKey, contentClassName }: AppLayoutProps) {
    const [showSidebar, setShowSidebar] = useState(false);
    const hideTimer = useRef<NodeJS.Timeout | null>(null);

    const handleBrandHover = (hovering: boolean) => {
        if (hovering) {
            if (hideTimer.current) clearTimeout(hideTimer.current);
            setShowSidebar(true);
        } else {
            hideTimer.current = setTimeout(() => setShowSidebar(false), 200);
        }
    };

    const handleSidebarEnter = () => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setShowSidebar(true);
    };

    const handleSidebarLeave = () => {
        setShowSidebar(false);
    };

    return (
        <div className="min-h-screen bg-[#FBFAFC]">
            <NavBar isLoggedIn onBrandHover={handleBrandHover} />

            {/* Overlay sidebar */}
            <div
                className={`fixed top-0 left-0 h-full z-60 transition-transform duration-200 ${
                    showSidebar ? 'translate-x-0' : '-translate-x-full'
                }`}
                onMouseEnter={handleSidebarEnter}
                onMouseLeave={handleSidebarLeave}
            >
                <SideBar activeKey={activeKey} />
            </div>

            {/* Page content area */}
            <main className={`w-full px-8 flex flex-col min-h-[calc(100vh-64px)] pt-4 pb-8 ${contentClassName || ''}`}>
                {children}
            </main>
        </div>
    );
}


