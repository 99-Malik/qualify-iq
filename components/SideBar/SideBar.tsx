'use client';

import React from 'react';
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
    Settings as SettingsIcon,
    LogOut
} from 'lucide-react';

type SideBarProps = {
    activeKey?: string;
};

const sectionClass = 'text-xs uppercase text-[#9AA0A6] px-6 mt-6 mb-2';
const itemBaseClass =
    'flex items-center gap-3 px-4 py-3 mx-4 rounded-md text-sm text-[#3A3541] hover:bg-[#F4F5FA] transition-colors';
const itemActiveClass = 'bg-[#F4F5FA] text-[#3A3541] shadow-sm';

export default function SideBar({ activeKey = 'ai-assistant' }: SideBarProps) {
    const items = [
        {
            header: 'Workspace',
            entries: [
                { key: 'ai-assistant', icon: <Bolt size={16} />, label: 'AI Assistant' },
                { key: 'dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' }
            ]
        },
        {
            header: 'Lead Management',
            entries: [
                { key: 'forms', icon: <ClipboardList size={16} />, label: 'Forms Setup' },
                { key: 'templates', icon: <Grid2X2 size={16} />, label: 'Templates' },
                { key: 'captured', icon: <BarChart3 size={16} />, label: 'Captured Leads' },
                { key: 'outbound', icon: <Upload size={16} />, label: 'Outbound Leads' }
            ]
        },
        {
            header: 'Communication',
            entries: [
                { key: 'mailbox', icon: <Mail size={16} />, label: 'Mail Box' },
                { key: 'campaigns', icon: <Mailbox size={16} />, label: 'Email Campaigns' },
                { key: 'warmup', icon: <Flame size={16} />, label: 'Warmup Emails' },
                { key: 'domain', icon: <Globe size={16} />, label: 'Domain Setup' }
            ]
        },
        {
            header: 'System',
            entries: [
                { key: 'calendar', icon: <CalendarDays size={16} />, label: 'Calendar' },
                { key: 'settings', icon: <SettingsIcon size={16} />, label: 'Settings' }
            ]
        }
    ];

    return (
        <aside className="h-screen w-[280px] bg-white border-r border-[#E4E7EC] flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.06)]">
            {/* Brand */}
            <div className="px-6 py-5 flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">IQ</span>
                </div>
                <span className="text-[#3A3541] font-semibold">Qualify IQ</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
                {items.map((group) => (
                    <div key={group.header}>
                        <div className={sectionClass}>{group.header}</div>
                        <div className="space-y-1">
                            {group.entries.map((entry) => (
                                <button
                                    key={entry.key}
                                    className={`${itemBaseClass} ${
                                        activeKey === entry.key ? itemActiveClass : ''
                                    } w-[208px]`}
                                >
                                    <span className="text-[#6B7280]">{entry.icon}</span>
                                    <span>{entry.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

               
            </div>

            {/* Logout */}
            <div className="px-6 pb-6">
                <button className="w-full bg-primary text-white py-3 rounded-md text-sm font-medium flex items-center justify-center gap-2 shadow-sm">
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </aside>
    );
}


