'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Dropdown } from '@/components/OutboundLeads/Modal/ApplyFilterModal/components/Dropdown';

interface ConnectDomainProps {
    onBack?: () => void;
    domain?: string;
    imageUrl?: string;
}

interface DNSRecord {
    type: string;
    name: string;
    data: string;
    ttl: string;
}

export default function ConnectDomain({ onBack, domain = 'enginedesign.com', imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' }: ConnectDomainProps) {
    const router = useRouter();
    const [dnsType, setDnsType] = useState('CNAME');
    const [dnsName, setDnsName] = useState('');
    const [dnsValue, setDnsValue] = useState('');
    const [dnsTtl, setDnsTtl] = useState('1/2 Hour');
    const [dnsRecords, setDnsRecords] = useState<DNSRecord[]>([
        { type: 'A', name: '@', data: '31.43.160.6', ttl: '60 seconds' },
        { type: 'CNAME', name: 'www', data: '31.43.160.6', ttl: '60 seconds' },
        { type: 'CNAME', name: 'www', data: '31.43.160.6', ttl: '60 seconds' },
        { type: 'CNAME', name: 'www', data: '31.43.160.6', ttl: '60 seconds' }
    ]);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.push('/domain-setup');
        }
    };

    const handleAddDNS = () => {
        if (dnsName && dnsValue) {
            setDnsRecords([...dnsRecords, { type: dnsType, name: dnsName, data: dnsValue, ttl: dnsTtl }]);
            setDnsName('');
            setDnsValue('');
        }
    };

    const handleDeleteDNS = (index: number) => {
        setDnsRecords(dnsRecords.filter((_, i) => i !== index));
    };

    const typeOptions = [
        { value: 'A', label: 'A' },
        { value: 'CNAME', label: 'CNAME' },
        { value: 'MX', label: 'MX' },
        { value: 'TXT', label: 'TXT' }
    ];

    const ttlOptions = [
        { value: '1/2 Hour', label: '1/2 Hour' },
        { value: '1 Hour', label: '1 Hour' },
        { value: '2 Hours', label: '2 Hours' },
        { value: '60 seconds', label: '60 seconds' }
    ];

    return (
        <div>
            {/* Header Section - Full Width */}
            <div className="mb-8">
                {/* Breadcrumb */}
                <div className="mb-2">
                    <nav className="text-sm">
                        <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                            Home
                        </span>
                        <span className="text-[#727A90] mx-1">/</span>
                        <span className="text-[#24282E] font-bold">Domain Setup</span>
                    </nav>
                </div>

                {/* Header with Title and Save Changes Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Domain Setup</h1>

                    <button className="flex items-center gap-2 px-8 py-2 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium">
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-6"></div>

            {/* Domain Details Section */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={handleBack}
                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold text-[#24282E]">Domain Details</h2>
            </div>

            {/* Domain Information Card */}
            <div className="bg-white rounded-lg border border-[#E4E7EC] p-4 mb-6">
                <div className="flex items-center gap-4">
                    {/* Image Thumbnail */}
                    <div className="w-20 h-20 relative rounded-lg overflow-hidden border border-[#E4E7EC] shrink-0">
                        <Image
                            src={imageUrl}
                            alt={domain}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Domain Name and Status */}
                    <div className="flex items-center justify-between flex-1">
                        <div className="flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z" fill="#5542F6" />
                            </svg>
                            <span className="text-lg font-semibold text-[#24282E]">{domain}</span>
                        </div>

                        {/* Connection Status */}
                        <div className="flex items-center gap-1">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM7.5 12.75L3.75 9L4.8075 7.9425L7.5 10.6275L13.1925 4.935L14.25 6L7.5 12.75Z" fill="#00B090" />
                            </svg>
                            <span className="text-sm font-bold text-[#00B090]">Connected</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* DNS Records Section */}
            <div className="bg-white rounded-lg border border-[#E4E7EC] overflow-hidden">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#24282E] mb-6">DNS Records</h3>

                    {/* Add New DNS Record */}
                    <div className="bg-[#fbfafc] border border-[#E4E7EC] rounded-lg p-4 mb-6">
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                                {/* Type Dropdown - Half width */}
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-bold text-[#2E2C34] mb-2">Type</label>
                                    <Dropdown
                                        value={dnsType}
                                        onChange={setDnsType}
                                        options={typeOptions}
                                        className="text-xs"
                                    />
                                </div>

                                {/* Name Input - Full width */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-[#2E2C34] mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={dnsName}
                                        onChange={(e) => setDnsName(e.target.value)}
                                        placeholder="@ OR WWW."
                                        className="w-full px-4 py-2 border border-[#E4E7EC] rounded-sm bg-white text-xs text-[#24282E] focus:outline-none focus:border-[#5542F6]"
                                    />
                                </div>

                                {/* Value Input - Full width */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-[#2E2C34] mb-2">
                                        Value<span className="text-[#2E2C34]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={dnsValue}
                                        onChange={(e) => setDnsValue(e.target.value)}
                                        placeholder="XX.XX.XX.XX"
                                        className="w-full px-4 py-2 border border-[#E4E7EC] rounded-sm bg-white text-xs text-[#24282E] focus:outline-none focus:border-[#5542F6]"
                                    />
                                </div>

                                {/* TTL Dropdown - Half width */}
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-bold text-[#2E2C34] mb-2">TTL</label>
                                    <Dropdown
                                        value={dnsTtl}
                                        onChange={setDnsTtl}
                                        options={ttlOptions}
                                        className="text-xs"
                                    />
                                </div>
                            </div>

                            {/* Add Button - Below the fields */}
                            <div>
                                <button
                                    onClick={handleAddDNS}
                                    className="px-12 py-2 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Existing DNS Records Table - Full Width */}
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-[#E4E7EC] bg-[#fbfafc]">
                                    <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                        <span className="text-[#2E2C34] font-medium text-xs">Type</span>
                                    </th>
                                    <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                        <span className="text-[#2E2C34] font-medium text-xs">Name</span>
                                    </th>
                                    <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                        <span className="text-[#2E2C34] font-medium text-xs">Data</span>
                                    </th>
                                    <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                        <span className="text-[#2E2C34] font-medium text-xs">TTL</span>
                                    </th>
                                    <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                        <span className="text-[#2E2C34] font-medium text-xs">Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dnsRecords.map((record, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-[#E4E7EC] bg-white hover:bg-[#F7F8FA] transition-colors"
                                    >
                                        <td className="py-4 px-4">
                                            <span className="text-xs font-bold text-[#24282E]">{record.type}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-xs text-[#24282E]">{record.name}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-xs text-[#24282E]">{record.data}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-xs font-bold text-[#24282E]">{record.ttl}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <button
                                                onClick={() => handleDeleteDNS(index)}
                                                className="text-[#EA4335] hover:text-[#C5221F] transition-colors"
                                            >
                                                <svg width="24" height="42" viewBox="0 0 24 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 12L15.5 13H19V15H5V13H8.5L9.5 12H14.5ZM6 27.9999C6 29.0999 6.9 29.9999 8 29.9999H16C17.1 29.9999 18 29.0999 18 27.9999V15.9999H6V27.9999ZM8.0001 18H16.0001V28H8.0001V18Z" fill="#FC3400" />
                                                </svg>

                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
}

