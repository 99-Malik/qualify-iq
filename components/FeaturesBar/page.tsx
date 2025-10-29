'use client';

import React, { useState } from 'react';
import {
    FileText,
    Upload,
    Grid2X2,
    CalendarDays,
    Send,
    Flame,
    Plus,
    Minus
} from 'lucide-react';

type Feature = {
    key: string;
    label: string;
    hotkey: string;
    icon: React.ReactNode;
};

const features: Feature[] = [
    { key: 'generate-form', label: 'Generate Form', hotkey: '/F', icon: <FileText size={18} /> },
    { key: 'outbound-leads', label: 'Outbound Leads', hotkey: '/L', icon: <Upload size={18} /> },
    { key: 'generate-template', label: 'Generate Template', hotkey: '/T', icon: <Grid2X2 size={18} /> },
    { key: 'calendar-booking', label: 'Calendar Booking', hotkey: '/C', icon: <CalendarDays size={18} /> },
    { key: 'email-campaigns', label: 'Email Campaigns', hotkey: '/E', icon: <Send size={18} /> },
    { key: 'warmup-emails', label: 'Warmup Emails', hotkey: '/W', icon: <Flame size={18} /> }
];

type Props = {
    onPick?: (text: string) => void;
};

export default function FeaturesBar({ onPick }: Props) {
    const [activeKey, setActiveKey] = useState<string>('generate-form');

    return (
        <aside className="w-full max-w-sm h-full bg-white rounded-2xl border border-[#E4E7EC] shadow-[0_10px_30px_rgba(85,66,246,0.08)] p-5 flex flex-col">
            <div>
                <h2 className="text-[24px] font-bold text-[#24282E]">Features</h2>
                <p className="text-[15px] text-[#727A90] mt-1">Press any key to ask about features</p>
                <div className="h-px bg-[#EAECEF] my-4"></div>
            </div>

            <div className="space-y-3">
                {features.map((f) => {
                    const isActive = f.key === activeKey;
                    return (
                        <button
                            key={f.key}
                            onClick={() => {
                                setActiveKey(f.key);
                                if (onPick) {
                                    const hot = f.hotkey.replace('/', '').trim();
                                    const display = `/ ${f.label} (${hot})`;
                                    onPick(display);
                                }
                            }}
                            className={`w-full flex items-center justify-between rounded-xl border transition-colors ${
                                isActive ? 'bg-[#F1EFFF] border-[#E1DEFF]' : 'bg-white border-[#E4E7EC] hover:bg-[#F7F8FA]'
                            } px-4 py-4`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-lg grid place-items-center ${
                                    isActive ? 'bg-primary/10 text-primary' : 'bg-[#F4F5FA] text-[#3A3541]'
                                }`}>{f.icon}</div>
                                <span className="text-[16px] font-medium text-[#24282E]">{f.label}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-[#24282E] bg-[#F4F5FA] border border-[#E4E7EC] px-3 py-1 rounded-md">
                                    {f.hotkey}
                                </span>
                                <span className={`w-8 h-8 rounded-md border grid place-items-center ${
                                    isActive ? 'border-[#C9C3FF] bg-[#EDEBFF]' : 'border-[#E4E7EC] bg-white'
                                }`}>
                                    {isActive ? <Minus size={16} className="text-[#3A3541]" /> : <Plus size={16} className="text-[#3A3541]" />}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 h-px bg-[#EAECEF]"></div>

            <div className="mt-auto pt-5">
                <button className="w-full h-12 rounded-xl bg-primary text-white text-[18px] font-semibold shadow-[0_12px_30px_rgba(85,66,246,0.35)]">
                    Apply
                </button>
            </div>
        </aside>
    );
}


