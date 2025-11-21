'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    Bolt,
    LayoutDashboard,
    ClipboardList,
    Grid2X2,
    BarChart3,
    Upload,
    Mail,
    Mailbox,
    Flame,
    Globe,
    CalendarDays,
    Settings,
    LogOut
} from 'lucide-react';
import { FlashIcon, GridIcon, ListIcon, TemplatesIcon, CapturedLeadsIcon, MailBoxIcon, OutboundLeadsIcon, WarmUpEmailsIcon, DomainSetupIcon, EmailCampaignsIcon, SettingsIcon, CalendarIcon } from '../Svgs/SideBarSvg/SideBarSvg';
type SideBarProps = {
    activeKey?: string;
};

const sectionClass = 'text-xs uppercase text-[#84818A] font-bold px-6 mt-6 mb-2';
const itemBaseClass =
    'flex items-center gap-2 px-4 py-3 mx-4 rounded-md text-sm text-[#2E2C34] font-semibold transition-colors';
const itemActiveClass = 'bg-[#edecfe] text-[#2E2C34] font-semibold';
const itemHoverClass = 'hover:bg-[#F4F5FA]';

export default function SideBar({ activeKey }: SideBarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const items = [
        {
            header: 'Workspace',
            entries: [
                { key: 'ai-assistant', path: '/ai-assistance', icon: (isActive: boolean) => <FlashIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'AI Assistant' },
                { key: 'dashboard', path: '/dashbaord', icon: (isActive: boolean) => <GridIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Dashboard' }
            ]
        },
        {
            header: 'Lead Management',
            entries: [
                { key: 'forms-setup', path: '/forms-setup', icon: (isActive: boolean) => <ListIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Forms Setup' },
                { key: 'templates', path: '/email-templates', icon: (isActive: boolean) => <TemplatesIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Templates' },
                { key: 'captured', path: '/captured-leads', icon: (isActive: boolean) => <CapturedLeadsIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Captured Leads' },
                { key: 'outbound', path: '/outbound-leads', icon: (isActive: boolean) => <OutboundLeadsIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Outbound Leads' }
            ]
        },
        {
            header: 'Communication',
            entries: [
                { key: 'mailbox', path: '/mail-box', icon: (isActive: boolean) => <MailBoxIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Mail Box' },
                { key: 'campaigns', icon: (isActive: boolean) => <EmailCampaignsIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Email Campaigns' },
                { key: 'warmup', path: '/warmup-emails', icon: (isActive: boolean) => <WarmUpEmailsIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Warmup Emails' },
                { key: 'domain', path: '/domain-setup', icon: (isActive: boolean) => <DomainSetupIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Domain Setup' }
            ]
        },
        {
            header: 'System',
            entries: [
                { key: 'calendar', path: '/calendar', icon: (isActive: boolean) => <CalendarIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Calendar' },
                { key: 'settings', path: '/settings', icon: (isActive: boolean) => <SettingsIcon width={25} height={25} color={isActive ? '#5542F6' : '#84818A'} />, label: 'Settings' }
            ]
        }
    ];

    // Auto-detect active key from pathname if not provided
    const getActiveKey = () => {
        if (activeKey) return activeKey;

        // Find matching entry by path (check if pathname starts with the entry path for nested routes)
        for (const group of items) {
            for (const entry of group.entries) {
                if ((entry as any).path) {
                    // Check exact match or if pathname starts with the entry path (for nested routes)
                    if (pathname === (entry as any).path || pathname.startsWith((entry as any).path + '/')) {
                        return entry.key;
                    }
                }
            }
        }

        return 'ai-assistant'; // default
    };

    const currentActiveKey = getActiveKey();

    return (
        <aside className="h-screen md:w-auto lg:w-[320px] bg-white border-r border-[#E4E7EC] flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.06)]">
            {/* Brand */}
            <div className="px-6 py-5 flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-extrabold text-md">IQ</span>
                </div>
                <span className="text-[#3A3541] text-xl font-extrabold">Qualify IQ</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto scroll-hidden">
                {items.map((group) => (
                    <div key={group.header}>
                        <div className={sectionClass}>{group.header}</div>
                        <div className="space-y-1">
                            {group.entries.map((entry) => {
                                const isActive = currentActiveKey === entry.key;
                                return (
                                    <button
                                        key={entry.key}
                                        className={`${itemBaseClass} ${isActive ? itemActiveClass : itemHoverClass
                                            } w-[90%]`}
                                        onClick={() => {
                                            if ((entry as any).path) {
                                                router.push((entry as any).path);
                                            }
                                        }}
                                    >
                                        <span>{typeof entry.icon === 'function' ? entry.icon(isActive) : entry.icon}</span>
                                        <span>{entry.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}


            </div>

            <div className="px-10 mb-8">
            {/* Separator */}
            <div className="w-full h-px bg-[#E4E7EC] my-4"></div>
            </div>


            {/* Logout */}
            <div className="px-6 pb-6">
                <button className="w-full bg-primary text-white py-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33398 6.0013L8.28065 6.94797L5.88732 9.33463H12.0007V2.66797H13.334V10.668H5.88732L8.28065 13.0546L7.33398 14.0013L3.33398 10.0013L7.33398 6.0013Z" fill="#FBFAFC" />
                    </svg>

                    Logout
                </button>
            </div>
        </aside>
    );
}


