'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { GenerateForm, OutboundLeadsIcon, GenerateTemplateIcon, CalendarBookingIcon, EmailCampaignsIcon, WarmUpEmailsIcon } from '../Svgs/FeaturesBarSvg/FeaturesBarSvg';
type Feature = {
    key: string;
    label: string;
    hotkey: string;
    icon: (isActive: boolean) => React.ReactNode;
};

const features: Feature[] = [
    { key: 'generate-form', label: 'Generate Form', hotkey: '/F', icon: (active) => <GenerateForm width={30} height={30} color={active ? '#5542F6' : '#84818A'} /> },
    { key: 'outbound-leads', label: 'Outbound Leads', hotkey: '/L', icon: (active) => <OutboundLeadsIcon width={30} height={30} color={active ? '#5542F6' : '#84818A'} /> },
    { key: 'generate-template', label: 'Generate Template', hotkey: '/T', icon: (active) => <GenerateTemplateIcon width={30} height={30} color={active ? '#5542F6' : '#84818A'} /> },
    { key: 'calendar-booking', label: 'Calendar Booking', hotkey: '/C', icon: (active) => <CalendarBookingIcon width={30} height={30} color={active ? '#5542F6' : '#84818A'} /> },
    { key: 'email-campaigns', label: 'Email Campaigns', hotkey: '/E', icon: (active) => <EmailCampaignsIcon width={30} height={30} color={active ? '#5542F6' : '#84818A'} /> },
    { key: 'warmup-emails', label: 'Warmup Emails', hotkey: '/W', icon: (active) => <WarmUpEmailsIcon width={30} height={30} color={active ? '#5542F6' : '#84818A'} /> }
];

type Props = {
    onPick?: (text: string) => void;
};

export default function FeaturesBar({ onPick }: Props) {
    const [activeKey, setActiveKey] = useState<string | null>(null);

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
                            }}
                            className={`w-full flex items-center justify-between rounded-md border transition-colors ${
                                isActive ? 'bg-[#F1EFFF] border-[#E1DEFF]' : 'bg-white border-[#E3E1E5] border-2 hover:bg-[#F7F8FA]'
                            } px-4 py-3`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="grid place-items-center">{f.icon(isActive)}</div>
                                <span className="text-[16px] font-medium text-[#24282E]">{f.label}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-sm text-black font-bold px-3 py-1 rounded-md ${
                                    isActive ? 'bg-white border-2 border-[#E3E1E5]' : 'bg-[#ebeaed] border-2 border-[#E3E1E5]'
                                }`}>
                                    {f.hotkey}
                                </span>
                                <span className={`w-8 h-8  grid place-items-center`}>
                                    {isActive ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 h-px bg-[#EAECEF]"></div>

            <div className="mt-auto pt-5">
                <button
                    className={`w-full h-16 rounded-lg text-[18px] font-semibold shadow-[0_12px_30px_rgba(85,66,246,0.35)] ${
                        activeKey ? 'bg-primary text-white' : 'bg-[#EAECEF] text-[#727A90] cursor-not-allowed'
                    }`}
                    disabled={!activeKey}
                    onClick={() => {
                        if (!activeKey || !onPick) return;
                        const f = features.find((x) => x.key === activeKey);
                        if (!f) return;
                        const hot = f.hotkey.replace('/', '');
                        const display = `/ ${f.label} (${hot})`;
                        onPick(display);
                    }}
                >
                    Apply
                </button>
            </div>
        </aside>
    );
}


