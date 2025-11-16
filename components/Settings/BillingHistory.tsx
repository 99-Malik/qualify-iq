'use client';

import React, { useState } from 'react';
import Pagination from '@/components/CapturedLeads/Tabs/Pagination';

interface BillingRecord {
    planName: string;
    amount: string;
    billingDate: string;
    paymentMethod: string;
    status: 'Paid' | 'Failed';
}

const billingRecords: BillingRecord[] = [
    { planName: 'Yearly(23-2026)', amount: '-$2400', billingDate: '15 Jan 2022', paymentMethod: '**********2652', status: 'Paid' },
    { planName: 'Monthly (Jun-Jul 25)', amount: '-$2400', billingDate: '20 Jan 2022', paymentMethod: '**********2652', status: 'Failed' },
    { planName: 'Yearly(23-2026)', amount: '-$2400', billingDate: '25 Jan 2022', paymentMethod: '**********2652', status: 'Paid' },
    { planName: 'Monthly (Jun-Jul 25)', amount: '-$2400', billingDate: '30 Jan 2022', paymentMethod: '**********2652', status: 'Paid' },
    { planName: 'Yearly(23-2026)', amount: '-$2400', billingDate: '05 Feb 2022', paymentMethod: '**********2652', status: 'Failed' },
    { planName: 'Monthly (Jun-Jul 25)', amount: '-$2400', billingDate: '10 Feb 2022', paymentMethod: '**********2652', status: 'Paid' },
    { planName: 'Yearly(23-2026)', amount: '-$2400', billingDate: '15 Feb 2022', paymentMethod: '**********2652', status: 'Paid' },
    { planName: 'Monthly (Jun-Jul 25)', amount: '-$2400', billingDate: '20 Feb 2022', paymentMethod: '**********2652', status: 'Paid' },
    { planName: 'Yearly(23-2026)', amount: '-$2400', billingDate: '25 Feb 2022', paymentMethod: '**********2652', status: 'Failed' },
    { planName: 'Monthly (Jun-Jul 25)', amount: '-$2400', billingDate: '30 Oct 2022', paymentMethod: '**********2652', status: 'Paid' },
];

export default function BillingHistory() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredRecords = billingRecords.filter(record =>
        record.planName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.billingDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
    const paginatedRecords = filteredRecords.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const sortIconSvg = (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12L4 8H12L8 12Z" fill="#84818A" />
        </svg>
    );

    return (
        <div>
            {/* Search and Download Report */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                {/* Search Bar */}
                <div className="relative w-full sm:w-auto flex-1 sm:flex-initial">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#84818A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.5 17.5L13.875 13.875" stroke="#84818A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search billing"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-[#E4E7EC] rounded-sm bg-white text-[#24282E] text-xs focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                    />
                </div>

                {/* Download Report Button */}
                <button className="px-6 py-2.5 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-xs font-medium whitespace-nowrap">
                    Download Report
                </button>
            </div>

            {/* Billing History Table */}
            <div className="bg-white border border-[#E4E7EC] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead>
                            <tr className="border-b border-[#E4E7EC] bg-[#fbfafc]">
                                <th className="py-4 px-4 font-medium text-[#24282E]">
                                    <div className="flex items-center gap-2">
                                        <span>Plan Name</span>
                                        {sortIconSvg}
                                    </div>
                                </th>
                                <th className="py-4 px-4 font-medium text-[#24282E]">
                                    <div className="flex items-center gap-2">
                                        <span>Amount</span>
                                        {sortIconSvg}
                                    </div>
                                </th>
                                <th className="py-4 px-4 font-medium text-[#24282E]">
                                    <div className="flex items-center gap-2">
                                        <span>Billing Date</span>
                                        {sortIconSvg}
                                    </div>
                                </th>
                                <th className="py-4 px-4 font-medium text-[#24282E]">
                                    <div className="flex items-center gap-2">
                                        <span>Payment Method</span>
                                        {sortIconSvg}
                                    </div>
                                </th>
                                <th className="py-4 px-4 font-medium text-[#24282E]">
                                    <div className="flex items-center gap-2">
                                        <span>Status</span>
                                        {sortIconSvg}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRecords.map((record, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-[#E4E7EC] bg-white hover:bg-[#F7F8FA] transition-colors"
                                >
                                    <td className="py-4 px-4 text-[#24282E]">{record.planName}</td>
                                    <td className="py-4 px-4 text-[#FC3400] font-medium">{record.amount}</td>
                                    <td className="py-4 px-4 text-[#24282E]">{record.billingDate}</td>
                                    <td className="py-4 px-4 text-[#24282E]">{record.paymentMethod}</td>
                                    <td className="py-4 px-4">
                                        <span className={`font-medium ${
                                            record.status === 'Paid' 
                                                ? 'text-[#14B13B]' 
                                                : 'text-[#EA4335]'
                                        }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={rowsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(val) => {
                        setRowsPerPage(val);
                        setCurrentPage(1);
                    }}
                />
            </div>
        </div>
    );
}

