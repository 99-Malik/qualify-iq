'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Toggle from './Toggle';

export default function EmailDetails() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || 'info123@gmail.com';

    const [enableWarmUp, setEnableWarmUp] = useState(true);
    const [enableCampaign, setEnableCampaign] = useState(true);
    const [firstName, setFirstName] = useState('Noam');
    const [lastName, setLastName] = useState('Laish');
    const [signature, setSignature] = useState('');
    const [tags, setTags] = useState(['Noam']);
    const [trackingDomain, setTrackingDomain] = useState('www.inst.dryeel.com');
    const [dailyLimit, setDailyLimit] = useState('30');
    const [increasePerDay, setIncreasePerDay] = useState('3');
    const [dailyWarmupLimit, setDailyWarmupLimit] = useState('30');
    const [replyRate, setReplyRate] = useState('60');

    const toolbarIcons = [
        {
            id: 'add',
            icon: (
                <svg width="20" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.65625 8.96875V11.8125C7.65625 11.9984 7.71918 12.1543 7.84503 12.28C7.97089 12.4058 8.12678 12.4688 8.31272 12.4688C8.4988 12.4688 8.65462 12.4058 8.78019 12.28C8.9059 12.1543 8.96875 11.9984 8.96875 11.8125V8.96875H11.8125C11.9984 8.96875 12.1543 8.90582 12.28 8.77997C12.4058 8.65411 12.4688 8.49822 12.4688 8.31228C12.4688 8.1262 12.4058 7.97037 12.28 7.84481C12.1543 7.7191 11.9984 7.65625 11.8125 7.65625H8.96875V4.8125C8.96875 4.62656 8.90582 4.47074 8.77997 4.34503C8.65411 4.21918 8.49822 4.15625 8.31228 4.15625C8.1262 4.15625 7.97037 4.21918 7.84481 4.34503C7.7191 4.47074 7.65625 4.62656 7.65625 4.8125V7.65625H4.8125C4.62656 7.65625 4.47074 7.71918 4.34503 7.84503C4.21918 7.97089 4.15625 8.12678 4.15625 8.31272C4.15625 8.4988 4.21918 8.65462 4.34503 8.78019C4.47074 8.9059 4.62656 8.96875 4.8125 8.96875H7.65625ZM8.31403 16.625C7.16428 16.625 6.08358 16.4068 5.07194 15.9705C4.06029 15.5342 3.18033 14.942 2.43206 14.194C1.68379 13.4461 1.09134 12.5665 0.654719 11.5553C0.218239 10.544 0 9.46364 0 8.31403C0 7.16428 0.218167 6.08358 0.6545 5.07194C1.09083 4.06029 1.68299 3.18033 2.43097 2.43206C3.17895 1.68379 4.05854 1.09134 5.06975 0.654719C6.08096 0.218239 7.16136 0 8.31097 0C9.46072 0 10.5414 0.218166 11.5531 0.6545C12.5647 1.09083 13.4447 1.68299 14.1929 2.43097C14.9412 3.17895 15.5337 4.05854 15.9703 5.06975C16.4068 6.08096 16.625 7.16136 16.625 8.31097C16.625 9.46072 16.4068 10.5414 15.9705 11.5531C15.5342 12.5647 14.942 13.4447 14.194 14.1929C13.4461 14.9412 12.5665 15.5337 11.5553 15.9703C10.544 16.4068 9.46364 16.625 8.31403 16.625ZM8.3125 15.3125C10.2667 15.3125 11.9219 14.6344 13.2781 13.2781C14.6344 11.9219 15.3125 10.2667 15.3125 8.3125C15.3125 6.35833 14.6344 4.70312 13.2781 3.34688C11.9219 1.99063 10.2667 1.3125 8.3125 1.3125C6.35833 1.3125 4.70312 1.99063 3.34688 3.34688C1.99063 4.70312 1.3125 6.35833 1.3125 8.3125C1.3125 10.2667 1.99063 11.9219 3.34688 13.2781C4.70312 14.6344 6.35833 15.3125 8.3125 15.3125Z" fill="black"/>
                </svg>
                

            )
        },
        {
            id: 'text',
            icon: (
                <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.71402 2.01307H10.4124C10.6906 2.01307 10.9271 1.91558 11.1219 1.72058C11.3168 1.52543 11.4142 1.2886 11.4142 1.01009C11.4142 0.731416 11.3168 0.4934 11.1219 0.29604C10.9271 0.0986799 10.6906 0 10.4124 0H1.00282C0.724461 0 0.487867 0.0974952 0.293034 0.292487C0.0981998 0.487636 0.000782013 0.724468 0.000782013 1.00298C0.000782013 1.28165 0.0981998 1.51967 0.293034 1.71703C0.487867 1.91439 0.724461 2.01307 1.00282 2.01307H4.70095V13.2079C4.70095 13.4862 4.79852 13.7228 4.99367 13.9177C5.18866 14.1125 5.42541 14.2099 5.70393 14.2099C5.9826 14.2099 6.22062 14.1116 6.41798 13.9151C6.61534 13.7185 6.71402 13.4798 6.71402 13.1989V2.01307ZM15.1763 6.70424H16.998C17.2763 6.70424 17.5129 6.60666 17.7077 6.41151C17.9026 6.21652 18 5.97969 18 5.70101C18 5.4225 17.9026 5.18457 17.7077 4.98721C17.5129 4.78985 17.2763 4.69117 16.998 4.69117H11.3505C11.0721 4.69117 10.8355 4.78866 10.6407 4.98365C10.4459 5.17864 10.3484 5.41548 10.3484 5.69415C10.3484 5.97282 10.4459 6.21084 10.6407 6.4082C10.8355 6.60556 11.0721 6.70424 11.3505 6.70424H13.1724V13.2079C13.1724 13.4862 13.2699 13.7228 13.4649 13.9177C13.6599 14.1125 13.8967 14.2099 14.1754 14.2099C14.4539 14.2099 14.6904 14.1125 14.8847 13.9177C15.0791 13.7228 15.1763 13.4862 15.1763 13.2079V6.70424Z" fill="black" />
                </svg>

            )
        },
        {
            id: 'list',
            icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.25 11.25H2.25V12.75H11.25V11.25ZM11.25 5.25H2.25V6.75H11.25V5.25ZM2.25 9.75H15.75V8.25H2.25V9.75ZM2.25 15.75H15.75V14.25H2.25V15.75ZM2.25 2.25V3.75H15.75V2.25H2.25Z" fill="#2E2C34" />
                </svg>

            )
        },
        {
            id: 'image',
            icon: (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.58178 14.875C1.13976 14.875 0.765625 14.7219 0.459375 14.4156C0.153125 14.1094 0 13.7352 0 13.2932V1.58178C0 1.13976 0.153125 0.765625 0.459375 0.459375C0.765625 0.153125 1.13976 0 1.58178 0H13.2932C13.7352 0 14.1094 0.153125 14.4156 0.459375C14.7219 0.765625 14.875 1.13976 14.875 1.58178V13.2932C14.875 13.7352 14.7219 14.1094 14.4156 14.4156C14.1094 14.7219 13.7352 14.875 13.2932 14.875H1.58178ZM1.58178 13.5625H13.2932C13.3606 13.5625 13.4223 13.5344 13.4783 13.4783C13.5344 13.4223 13.5625 13.3606 13.5625 13.2932V1.58178C13.5625 1.51441 13.5344 1.45272 13.4783 1.39672C13.4223 1.34057 13.3606 1.3125 13.2932 1.3125H1.58178C1.51441 1.3125 1.45272 1.34057 1.39672 1.39672C1.34057 1.45272 1.3125 1.51441 1.3125 1.58178V13.2932C1.3125 13.3606 1.34057 13.4223 1.39672 13.4783C1.45272 13.5344 1.51441 13.5625 1.58178 13.5625ZM3.63475 11.5937H11.3076C11.4659 11.5937 11.5831 11.5219 11.6594 11.3783C11.7356 11.2348 11.7238 11.0957 11.6239 10.9611L9.5375 8.16616C9.45554 8.06072 9.3501 8.008 9.22119 8.008C9.09212 8.008 8.98669 8.06072 8.90487 8.16616L6.76441 10.9543L5.33072 9.11684C5.24891 9.01695 5.14485 8.967 5.01856 8.967C4.89242 8.967 4.78836 9.01979 4.70641 9.12537L3.32675 10.9611C3.22131 11.0957 3.20673 11.2348 3.283 11.3783C3.35927 11.5219 3.47652 11.5937 3.63475 11.5937Z" fill="black" />
                </svg>

            )
        },
        {
            id: 'link',
            icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.925 9C2.925 7.7175 3.9675 6.675 5.25 6.675H8.25V5.25H5.25C3.18 5.25 1.5 6.93 1.5 9C1.5 11.07 3.18 12.75 5.25 12.75H8.25V11.325H5.25C3.9675 11.325 2.925 10.2825 2.925 9ZM6 9.75H12V8.25H6V9.75ZM12.75 5.25H9.75V6.675H12.75C14.0325 6.675 15.075 7.7175 15.075 9C15.075 10.2825 14.0325 11.325 12.75 11.325H9.75V12.75H12.75C14.82 12.75 16.5 11.07 16.5 9C16.5 6.93 14.82 5.25 12.75 5.25Z" fill="#2E2C34" />
                </svg>

            )
        },
        {
            id: 'code',
            icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 6.75V11.25C16.5 12.075 15.825 12.75 15 12.75H14.25V11.25H15V6.75H3V11.25H7.5V12.75H3C2.175 12.75 1.5 12.075 1.5 11.25V6.75C1.5 5.925 2.175 5.25 3 5.25H15C15.825 5.25 16.5 5.925 16.5 6.75ZM10.875 14.25L11.6925 12.4425L13.5 11.625L11.6925 10.8075L10.875 9L10.0575 10.8075L8.25 11.625L10.0575 12.4425L10.875 14.25ZM12.75 10.5L13.215 9.465L14.25 9L13.215 8.535L12.75 7.5L12.285 8.535L11.25 9L12.285 9.465L12.75 10.5ZM10.875 14.25L11.6925 12.4425L13.5 11.625L11.6925 10.8075L10.875 9L10.0575 10.8075L8.25 11.625L10.0575 12.4425L10.875 14.25ZM12.75 10.5L13.215 9.465L14.25 9L13.215 8.535L12.75 7.5L12.285 8.535L11.25 9L12.285 9.465L12.75 10.5Z" fill="#2E2C34" />
                </svg>

            )
        }
    ];

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Email Warmups</span>
                </nav>
            </div>

            {/* Page Title and Button */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Email Warmups</h1>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-medium">Add New</span>
                </button>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mt-8"></div>

            {/* Email Details Section */}
            <div className="rounded-lg  py-6 mb-6">
                {/* Header with Back Arrow and Action Buttons */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => router.back()}
                            className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                            </svg>

                        </button>
                        <h2 className="text-xl font-bold text-[#24282E]">Email Details</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-4 py-2 bg-[#F3F0FF] rounded-sm">
                            <span className="text-sm font-medium text-[#5542F6]">Enable Warm Up</span>
                            <Toggle enabled={enableWarmUp} onChange={setEnableWarmUp} />
                        </div>
                        <button className="px-4 py-2 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium">
                            Save Changes
                        </button>
                    </div>
                </div>
                <div className='text-sm font-medium text-[#24282E] mt-8 mb-4' ><h1 className='text-2xl font-bold text-[#24282E]'>Sender Name</h1></div>

                {/* Sender Name */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-[#24282E] mb-2">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-[#E4E7EC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#24282E] mb-2">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border bg-white border-[#E4E7EC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Signature */}
                <div className="mb-6">
                    <label className="block text-lg font-bold text-[#24282E] mb-2">Signature</label>
                    <div className="bg-white border border-[#E4E7EC] rounded-sm">
                        <textarea
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                            placeholder="write here"
                            className="w-full px-4 py-3 border-0 focus:outline-none focus:ring-0 min-h-[120px] resize-none rounded-t-sm"
                        />
                        {/* Rich Text Editor Toolbar */}
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg ml-4 mb-4 w-fit border border-[#E4E7EC]">
                            {toolbarIcons.map((item) => (
                                <button
                                    key={item.id}
                                    className="px-4 py-2 bg-white border border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors flex items-center justify-center"
                                >
                                    {item.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-lg font-bold text-[#24282E] mb-2">Tags</label>
                    <div className="w-full bg-white border border-[#E4E7EC] rounded-2xl px-4 py-2 min-h-[42px] flex flex-wrap gap-2 items-center">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-[#EEEDFF] text-[#2E2C34] rounded-xs text-sm font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Campaign Settings Section */}
            <div className="bg-white rounded-lg border border-[#E4E7EC] p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold text-[#24282E]">Campaign Settings</h2>
                    <div className="flex items-center gap-3 px-4 py-2 bg-[#F3F0FF] rounded-sm">
                        <span className="text-sm font-medium text-[#5542F6]">Enable</span>
                        <Toggle enabled={enableCampaign} onChange={setEnableCampaign} />
                    </div>
                </div>

                {/* CNAME Record Information */}
                <div className="mb-6 ">
                    <h3 className="text-sm font-bold text-[#24282E] mb-4">
                        Add a new CNAME record for your tracking domain or subdomain
                    </h3>
                    <div className="w-fit border border-[#E4E7EC] rounded-sm p-4 bg-[#F7F8FA] relative">
                        <div className="space-y-1 text-sm text-[#24282E] mb-4">
                            <p><span className="font-medium">Host :</span> Your tracking domain or subdomain</p>
                            <p><span className="font-medium">Type :</span> CNAME</p>
                            <p><span className="font-medium">Value :</span> prox.itrckly.com</p>
                        </div>
                        <button className="absolute bottom-4 right-4 px-3 py-2 bg-white border border-[#E4E7EC] rounded-xs text-sm text-[#24282E] hover:bg-[#F7F8FA] transition-colors">
                            Copy
                        </button>
                    </div>
                </div>

                {/* Tracking Domain */}
                <div>
                    <label className="block text-sm font-bold text-[#24282E] mb-2">Your tracking domain or subdomain</label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={trackingDomain}
                            onChange={(e) => setTrackingDomain(e.target.value)}
                            className="w-auto px-4 py-2 bg-white border border-[#E4E7EC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent text-center"
                        />
                    </div>
                </div>
            </div>

            <div className='text-sm font-medium text-[#24282E] mt-8 mb-4' ><h1 className='text-2xl font-bold text-[#24282E]'>Custom Domain Tracking</h1></div>

            {/* Daily Campaign Limit Section */}
            <div className="bg-white rounded-lg border border-[#E4E7EC] p-6 mb-6">
                <h2 className="text-lg font-bold text-[#24282E] mb-2">Daily Campaign Limit</h2>
                <p className="text-sm text-[#727A90] mb-4">Daily sending limit</p>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={dailyLimit}
                        onChange={(e) => setDailyLimit(e.target.value)}
                        className="w-25 px-4 py-2 border border-[#E4E7EC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                    />
                    <span className="text-sm text-[#24282E]">Emails</span>
                </div>
            </div>
            <div className='text-sm font-medium text-[#24282E] mt-8 mb-4' ><h1 className='text-2xl font-bold text-[#24282E]'>Warmup Setting</h1></div>

            {/* Warmup Settings Section */}
            <div className="bg-white rounded-lg border border-[#E4E7EC] p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Increase per day */}
                    <div>
                        <label className="block text-sm font-bold text-[#24282E] mb-1">Increase per day</label>
                        <span className="block text-xs text-[#727A90] mb-2">Suggestion 1</span>
                        <input
                            type="number"
                            value={increasePerDay}
                            onChange={(e) => setIncreasePerDay(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-[#E4E7EC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                        />
                    </div>

                    {/* Daily Warm-up limit */}
                    <div>
                        <label className="block text-sm font-bold text-[#24282E] mb-1">Daily Warm-up limit</label>
                        <span className="block text-xs text-[#727A90] mb-2">Suggestion 10</span>
                        <input
                            type="number"
                            value={dailyWarmupLimit}
                            onChange={(e) => setDailyWarmupLimit(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-[#E4E7EC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                        />
                    </div>

                    {/* Reply Rate %} */}
                    <div>
                        <label className="block text-sm font-bold text-[#24282E] mb-1">Reply Rate %</label>
                        <span className="block text-xs text-[#727A90] mb-2">Suggestion 30%</span>
                        <input
                            type="number"
                            value={replyRate}
                            onChange={(e) => setReplyRate(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-[#E4E7EC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                        />
                    </div>

                    {/* Daily Warm-up limit (duplicate) */}
                    <div>
                        <label className="block text-sm font-bold text-[#24282E] mb-1">Daily Warm-up limit</label>
                        <span className="block text-xs text-[#727A90] mb-2">Suggestion 10</span>
                        <input
                            type="number"
                            value={dailyWarmupLimit}
                            onChange={(e) => setDailyWarmupLimit(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-[#E4E7EC] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

