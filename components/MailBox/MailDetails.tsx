'use client';

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronRight, X, Printer, ExternalLink, MoreVertical, Reply, Forward } from 'lucide-react';
import { messages, Message } from './Home';

export default function MailDetails() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const messageId = searchParams.get('id');

    const message = useMemo(() => {
        if (!messageId) return null;
        return messages.find(msg => msg.id === messageId) || null;
    }, [messageId]);

    // Default to first message if no ID provided
    const displayMessage = message || messages[0];

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/mail-box')}>
                        Mail Box
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Mail details</span>
                </nav>
            </div>

            {/* Back Arrow and Title */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => router.back()}
                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Mail details</h1>
            </div>

            {/* Separator */}
            <div className="border-b border-[#ebeaed] mb-6"></div>

            {/* Email Subject Section */}
            <div className="bg-white rounded-md  px-4 py-6 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-1">
                        <span className="text-base font-bold text-[#24282E]">{displayMessage.subject}</span>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.292 5.50098C13.6013 5.50098 13.8748 5.65291 14.0371 5.88281L14.0391 5.88477L17.668 11.001L14.0391 16.1172L14.0371 16.1191C13.8747 16.3488 13.6011 16.5 13.292 16.5L4.95703 16.4922L8.39941 11.5225L8.76074 11.001L8.39941 10.4785L4.95703 5.50781L13.292 5.50098Z" stroke="black" strokeOpacity="0.54" strokeWidth="1.83333" />
                        </svg>
                        <div className="flex items-center gap-1 px-2 py-1 bg-[#F4F5FA] rounded">
                            <span className="text-xs text-[#616161] font-medium">Mailbox</span>
                            <button className="ml-1 hover:bg-[#E4E7EC] rounded p-0.5">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.33333 0L0 1.33333L2.66667 4L0 6.66667L1.33333 8L4 5.33333L6.66667 8L8 6.66667L5.33333 4L8 1.33333L6.66667 0L4 2.66667L1.33333 0Z" fill="black" fillOpacity="0.6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-[#727A90] hover:text-[#24282E] transition-colors">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_559_59031)">
                                    <path d="M15.8346 6.66667H4.16797C2.78464 6.66667 1.66797 7.78333 1.66797 9.16667V14.1667H5.0013V17.5H15.0013V14.1667H18.3346V9.16667C18.3346 7.78333 17.218 6.66667 15.8346 6.66667ZM13.3346 15.8333H6.66797V11.6667H13.3346V15.8333ZM15.8346 10C15.3763 10 15.0013 9.625 15.0013 9.16667C15.0013 8.70833 15.3763 8.33333 15.8346 8.33333C16.293 8.33333 16.668 8.70833 16.668 9.16667C16.668 9.625 16.293 10 15.8346 10ZM15.0013 2.5H5.0013V5.83333H15.0013V2.5Z" fill="black" fillOpacity="0.54" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_559_59031">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                        <button className="text-[#727A90] hover:text-[#24282E] transition-colors">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_559_59032)">
                                    <path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z" fill="black" fillOpacity="0.54" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_559_59032">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Container - Sender, Body, Replies, Actions */}
            <div className="bg-white rounded-md  p-6">
                {/* Sender Section */}
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-[#E4E7EC]">
                    <div className="flex items-start gap-3 flex-1">
                        {/* Avatar */}
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="20" fill="black" fillOpacity="0.05" />
                            <path d="M19.9993 19.9993C22.0252 19.9993 23.666 18.3585 23.666 16.3327C23.666 14.3068 22.0252 12.666 19.9993 12.666C17.9735 12.666 16.3327 14.3068 16.3327 16.3327C16.3327 18.3585 17.9735 19.9993 19.9993 19.9993ZM19.9993 21.8327C17.5518 21.8327 12.666 23.061 12.666 25.4993V27.3327H27.3327V25.4993C27.3327 23.061 22.4468 21.8327 19.9993 21.8327Z" fill="black" fillOpacity="0.16" />
                        </svg>


                        {/* Sender Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-bold text-[#24282E]">{displayMessage.sender}</span>
                                <span className="text-sm text-[#727A90]">&lt;{displayMessage.senderEmail}&gt;</span>
                            </div>
                            <div className="text-sm text-[#727A90] mb-2">to me</div>
                        </div>
                    </div>

                    {/* Timestamp and Menu */}
                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm text-[#666666]">{displayMessage.timestamp}{displayMessage.relativeTime ? ` (${displayMessage.relativeTime})` : ''}</span>
                        <button className="text-[#666666] hover:text-[#24282E] transition-colors">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Email Body */}
                <div className="mb-4 pb-4 border-b border-[#E4E7EC] h-60 overflow-y-auto">
                    <p className="text-sm text-[#24282E] leading-relaxed">
                        {displayMessage.body}
                    </p>
                </div>

                {/* Suggested Reply Buttons */}
                <div className="flex items-center gap-3 mb-6">
                    <button className="px-4 py-2 text-[#5542F6] bg-white border border-[#E4E7EC] rounded-md text-sm font-semibold  hover:bg-[#F4F5FA] transition-colors">
                        Looking forward to it!
                    </button>
                    <button className="px-4 py-2 bg-white border border-[#E4E7EC] rounded-md text-sm text-[#5542F6] font-semibold hover:bg-[#F4F5FA] transition-colors">
                        We will be there!
                    </button>
                    <button className="px-4 py-2 bg-white border border-[#E4E7EC] rounded-md text-sm text-[#5542F6] font-semibold hover:bg-[#F4F5FA] transition-colors">
                        Thanks for the update!
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#5542F6] text-white rounded-md text-sm font-medium hover:bg-[#4535D6] transition-colors">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.33398 5.99935L8.28065 6.94602L5.88732 9.33268H12.0007V2.66602H13.334V10.666H5.88732L8.28065 13.0527L7.33398 13.9993L3.33398 9.99935L7.33398 5.99935Z" fill="#FBFAFC" />
                        </svg>
                        Reply
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E4E7EC] font-semibold text-[#2E2C34] rounded-md text-sm  hover:bg-[#F4F5FA] transition-colors">
                        Forward
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.66602 5.99935L7.71935 6.94602L10.1127 9.33268H3.99935V2.66602H2.66602V10.666H10.1127L7.71935 13.0527L8.66602 13.9993L12.666 9.99935L8.66602 5.99935Z" fill="#2E2C34" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    );
}

