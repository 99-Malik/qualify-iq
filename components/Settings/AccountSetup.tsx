'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/components/OutboundLeads/Modal/ApplyFilterModal/components/Dropdown';
import Image from 'next/image';

export default function AccountSetup() {
    const router = useRouter();

    const [companyName, setCompanyName] = useState('Stephenly.co');
    const [email, setEmail] = useState('abc123@gmila.com');
    const [contactDetails, setContactDetails] = useState('0000-0000-0000');
    const [contactType, setContactType] = useState('mobile');
    const [websiteUrl, setWebsiteUrl] = useState('www.stephenly.co');
    const [einNumber, setEinNumber] = useState('3131463136143614');
    const [representativeName, setRepresentativeName] = useState('Henry Stephan');
    const [representativeRole, setRepresentativeRole] = useState('manager');
    const [representativeEmail, setRepresentativeEmail] = useState('abc123@gmail.com');

    const contactTypeOptions = [
        { value: 'mobile', label: 'Mobile' },
        { value: 'landline', label: 'Landline' },
        { value: 'fax', label: 'Fax' }
    ];

    const roleOptions = [
        { value: 'manager', label: 'Manager' },
        { value: 'director', label: 'Director' },
        { value: 'owner', label: 'Owner' },
        { value: 'representative', label: 'Representative' }
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
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/settings')}>
                        Settings
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Account Setup</span>
                </nav>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-6">Settings</h1>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-6"></div>

            {/* Back Arrow and Account Setup */}
            <div className="flex items-center gap-2 mb-8">
                <button
                    onClick={() => router.push('/settings')}
                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                    </svg>

                </button>
                <h2 className="text-xl font-semibold text-[#24282E]">Account Setup</h2>
            </div>

            {/* Company Data Section */}
            <div className="bg-white border border-[#E4E7EC] rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-[#24282E] mb-6">Company Data</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-[#727A90] mb-2">
                            Company Name
                        </label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full px-4 py-3 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                        />
                    </div>

                    {/* Change Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#727A90] mb-2">
                            Change Email <span className="text-[#5542F6]">(Current: abc135@gmail.com)</span>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 pr-20 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5542F6] text-sm font-medium hover:text-[#4535D6] transition-colors underline">
                                Verify
                            </button>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <label className="block text-sm font-medium text-[#727A90] mb-2">
                            Contact Details
                        </label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={contactDetails}
                                onChange={(e) => setContactDetails(e.target.value)}
                                className="flex-1 h-[46px] px-4 border border-r-0 border-[#E4E7EC] rounded-l-sm rounded-r-none bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                            />
                            <div className="h-[46px] w-px bg-[#E4E7EC]"></div>
                            <Dropdown
                                value={contactType}
                                onChange={setContactType}
                                options={contactTypeOptions}
                                className="w-32"
                                buttonClassName="h-[46px] px-4 border border-l-0 border-[#E4E7EC] rounded-l-none rounded-r-sm bg-white text-sm text-[#24282E] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Company Website URL */}
                    <div>
                        <label className="block text-sm font-medium text-[#727A90] mb-2">
                            Company Website URL
                        </label>
                        <input
                            type="text"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            className="w-full px-4 py-3 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                        />
                    </div>

                    {/* Company EIN Number */}
                    <div>
                        <label className="block text-sm font-medium text-[#727A90] mb-2">
                            Company EIN Number (Optional)
                        </label>
                        <input
                            type="text"
                            value={einNumber}
                            onChange={(e) => setEinNumber(e.target.value)}
                            className="w-full px-4 py-3 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                        />
                    </div>
                </div>

                {/* Add Another Number Link */}
                <button className="mt-4 text-[#5542F6] text-sm font-medium hover:text-[#4535D6] transition-colors">
                    + Add another number
                </button>
            </div>
            <h3 className="text-lg font-bold text-[#24282E] mb-6">Representative Info (Optional)</h3>

            {/* Representative Info Section */}
            <div className="bg-white border border-[#E4E7EC] rounded-lg p-6 mb-6">

                {/* Profile Image and Actions */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#E4E7EC] shrink-0">
                        <Image
                            src="/images/settings-avatar.jpg"
                            alt="Representative"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-[#edecfe] text-[#5542F6] rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium">
                            Upload New Image
                        </button>
                        <button className="px-4 py-2 text-xs text-[#EA4335] hover:text-[#C5221F] border-2 border-[#E4E7EC] rounded-md transition-colors  font-medium">
                            Delete
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-[#727A90] mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={representativeName}
                            onChange={(e) => setRepresentativeName(e.target.value)}
                            className="w-full px-4 py-3 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-[#727A90] mb-2">
                            Role
                        </label>
                        <Dropdown
                            value={representativeRole}
                            onChange={setRepresentativeRole}
                            options={roleOptions}
                            className="w-full"
                            buttonClassName="w-full h-[46px] px-4 border border-[#E4E7EC] rounded-sm bg-white text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#727A90] mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={representativeEmail}
                            onChange={(e) => setRepresentativeEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-sm focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                        />
                    </div>
                </div>

                {/* Add Another Link */}
                <button className="mt-4 text-[#5542F6] text-sm font-medium hover:text-[#4535D6] transition-colors">
                    + Add Another
                </button>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push('/settings')}
                    className="px-6 py-3 bg-white border border-[#E4E7EC] text-[#24282E] rounded-sm hover:bg-[#F7F8FA] transition-colors text-sm font-medium"
                >
                    Discard
                </button>
                <button className="px-6 py-3 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

