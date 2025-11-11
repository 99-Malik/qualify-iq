'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

type TabType = 'all' | 'read' | 'unread';

export interface Message {
    id: string;
    sender: string;
    senderEmail: string;
    subject: string;
    preview: string;
    body: string;
    timestamp: string;
    relativeTime?: string;
    isUnread?: boolean;
    label?: {
        text: string;
        color: string;
        bgColor: string;
    };
}

// Shared messages data
export const messages: Message[] = [
        {
            id: '1',
            sender: 'Leslie Alexander',
            senderEmail: 'leslie.alexander@example.com',
            subject: 'Hiya',
            preview: 'Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
            timestamp: '10:41 PM',
            relativeTime: '8 hours ago',
            isUnread: true
        },
        {
            id: '2',
            sender: 'Theresa Webb',
            senderEmail: 'theresa.webb@example.com',
            subject: 'Build prototypes without code',
            preview: 'Sunt qui esse pariatur duis deserunt mollit dolore cillum minim terr',
            body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
            timestamp: '12:01 PM',
            relativeTime: '6 hours ago',
            isUnread: true,
            label: {
                text: 'Promotions',
                color: '#202124',
                bgColor: '#98D7E4'
            }
        },
        {
            id: '3',
            sender: 'Albert Flores',
            senderEmail: 'albert.flores@example.com',
            subject: 'Build prototypes without code',
            preview: 'Nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt',
            body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
            timestamp: '11:59 AM',
            relativeTime: '6 hours ago',
            isUnread: true
        },
        {
            id: '4',
            sender: 'Jacob Jones',
            senderEmail: 'jacob.jones@example.com',
            subject: "Don't make this bad",
            preview: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia conse',
            body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
            timestamp: '10:30 AM',
            relativeTime: '8 hours ago',
            isUnread: true
        },
        {
            id: '5',
            sender: 'Guy Hawkins',
            senderEmail: 'guy.hawkins@example.com',
            subject: 'The results to our user testing',
            preview: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco ci',
            body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
            timestamp: '5:49 AM',
            relativeTime: '13 hours ago',
            isUnread: false,
            label: {
                text: 'Updates',
                color: '#ffffff',
                bgColor: '#FB4C2F'
            }
        },
        {
            id: '6',
            sender: 'Ralph Edwards',
            senderEmail: 'ralph.edwards@example.com',
            subject: 'Welcome to startmail',
            preview: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis dese',
            body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
            timestamp: 'Apr 25',
            relativeTime: '2 days ago',
            isUnread: false
        },
        {
            id: '7',
            sender: 'Darrell Steward',
            senderEmail: 'darrell.steward@example.com',
            subject: 'We missed you last night',
            preview: 'Minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consec',
            body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
            timestamp: 'Apr 25',
            relativeTime: '2 days ago',
            isUnread: false
        },
        {
            id: '8',
            sender: 'Theresa Webb',
            senderEmail: 'theresa.webb@example.com',
            subject: 'Plans for tonight',
            preview: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate ex',
            body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
            timestamp: 'Apr 25',
            relativeTime: '2 days ago',
            isUnread: false
        },
        {
            id: '9',
            sender: 'Devon Lane',
            senderEmail: 'devon.lane@example.com',
            subject: "Don't make this bad",
            preview: 'Albequerque id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis',
            body: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
            timestamp: 'Apr 24',
            relativeTime: '3 days ago',
            isUnread: false
        }
];

export default function MailBoxHome() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());

    const tabs = [
        { id: 'all' as TabType, label: 'All', width: 'w-8' },
        { id: 'read' as TabType, label: 'Read', width: 'w-12' },
        { id: 'unread' as TabType, label: 'Unread', width: 'w-16' }
    ];

    const handleCheckboxChange = (messageId: string) => {
        const newSelected = new Set(selectedMessages);
        if (newSelected.has(messageId)) {
            newSelected.delete(messageId);
        } else {
            newSelected.add(messageId);
        }
        setSelectedMessages(newSelected);
    };

    // Filter messages based on active tab
    const filteredMessages = messages.filter((message) => {
        if (activeTab === 'all') {
            return true;
        } else if (activeTab === 'read') {
            return !message.isUnread;
        } else if (activeTab === 'unread') {
            return message.isUnread === true;
        }
        return true;
    });

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Mail Box</span>
                </nav>
            </div>

            {/* Header Section with Title */}
            <div className="mb-6">
                <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Mail Box</h1>
            </div>
            <div className="border-b border-[#ebeaed] mt-6 mb-10"></div>
            {/* Container with border - Header and Message List */}
            <div className="bg-white rounded-md">
                {/* Filtering and Navigation Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#ebeaed] relative">
                    {/* Tabs */}
                    <div className="flex items-center gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-sm font-medium relative transition-colors ${tab.width} ${activeTab === tab.id
                                        ? 'text-[#5542F6]'
                                        : 'text-[#727A90] hover:text-[#24282E]'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute left-0 right-0 h-0.5 bg-[#5542F6]" style={{ bottom: '-22.5px' }}></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Filter Button */}
                    <button className="flex items-center gap-1 px-4 py-2  rounded-md text-sm text-[#2E2C34]">
                        Filter
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.94 5.72656L8 8.7799L11.06 5.72656L12 6.66656L8 10.6666L4 6.66656L4.94 5.72656Z" fill="#84818A" />
                        </svg>
                    </button>
                </div>

                {/* Message List */}
                <div className="divide-y divide-[#ebeaed]">
                    {filteredMessages.map((message) => (
                        <div
                            key={message.id}
                            className="flex items-center px-4 py-6 hover:bg-[#F4F5FA] transition-colors cursor-pointer"
                            onClick={() => router.push(`/mail-box/mail-details?id=${message.id}`)}
                        >
                            {/* Checkbox - Fixed width for alignment */}
                            <div className="w-6 flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedMessages.has(message.id)}
                                    onChange={() => handleCheckboxChange(message.id)}
                                    className="custom-checkbox shrink-0"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>

                            {/* Sender Name - Fixed width for alignment */}
                            <div className="w-40 shrink-0 ml-1">
                                <span className={`text-sm ${message.isUnread ? 'font-bold' : 'font-semibold'} text-[#24282E]`}>
                                    {message.sender}
                                </span>
                            </div>

                            {/* Gap */}
                            <div className="w-4 shrink-0"></div>

                            {/* Subject, Label, and Preview - All together, takes remaining space */}
                            <div className="flex-1 min-w-0 text-sm flex items-center gap-2">
                                {/* Label (if exists) */}
                                {message.label && (
                                    <span
                                        className="text-xs font-medium px-2 py-0.5 rounded shrink-0"
                                        style={{
                                            color: message.label.color,
                                            backgroundColor: message.label.bgColor
                                        }}
                                    >
                                        {message.label.text}
                                    </span>
                                )}

                                {/* Subject and Preview */}
                                <span className={`${message.isUnread ? 'font-bold' : 'font-medium'} text-[#24282E]`}>{message.subject}</span>
                                <span className="font-normal text-[#727A90]"> - {message.preview}</span>
                            </div>

                            {/* Timestamp - Fixed width for alignment, far right */}
                            <div className="w-20 text-right shrink-0">
                                <span className={`text-sm ${message.isUnread ? 'font-bold' : 'font-normal'}`} style={{ color: message.isUnread ? '#202124' : '#727A90' }}>
                                    {message.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

