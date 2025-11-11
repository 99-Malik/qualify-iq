'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from './Pagination';
import BookCallModal from '../Modals/BookCallModal';
import ScheduledModal from '../Modals/SchudledModal';
import ViewNotesModal from '../Modals/ViewNotes';

interface Lead {
    id: string;
    name: string;
    company: string;
    budget: string;
    date: string;
    stage: 'Completed' | 'FDD Signed' | 'Rejected' | 'Approved';
}

const leads: Lead[] = [
    { id: 'CLIENT-0024', name: 'Alice Smith', company: 'Bob Johnson', budget: '$2,000-$3,000', date: '15 Jan 2022', stage: 'Approved' },
    { id: 'CLIENT-0025', name: 'Bob Johnson', company: 'Carlos Martinez', budget: '$3,000-$4,000', date: '3 Feb 2022', stage: 'Approved' },
    { id: 'CLIENT-0026', name: 'Charlie Brown', company: 'Diana Wong', budget: '$4,000-$5,000', date: '28 Mar 2022', stage: 'Approved' },
    { id: 'CLIENT-0027', name: 'Diana Prince', company: 'Eva Green', budget: '$5,000-$6,000', date: '7 Apr 2022', stage: 'Approved' },
    { id: 'CLIENT-0028', name: 'Ethan Hunt', company: 'Frank Brown', budget: '$6,000-$7,000', date: '19 May 2022', stage: 'Approved' },
    { id: 'CLIENT-0029', name: 'Fiona Gallagher', company: 'Grace Lee', budget: '$7,000-$8,000', date: '11 Jun 2022', stage: 'Approved' },
    { id: 'CLIENT-0030', name: 'George Costanza', company: 'Henry King', budget: '$8,000-$9,000', date: '22 Jul 2022', stage: 'Approved' },
    { id: 'CLIENT-0031', name: 'Hannah Baker', company: 'Ivy Patel', budget: '$9,000-$10,000', date: '14 Aug 2022', stage: 'Approved' },
    { id: 'CLIENT-0032', name: 'Ian Malcolm', company: 'Jack Taylor', budget: '$10,000-$11,000', date: '5 Sep 2022', stage: 'Approved' },
    { id: 'CLIENT-0033', name: 'John Doe', company: 'ABC Corp', budget: '$2,000-$3,000', date: '10 Oct 2022', stage: 'Approved' },
    { id: 'CLIENT-0034', name: 'Jane Smith', company: 'XYZ Inc', budget: '$3,000-$4,000', date: '20 Nov 2022', stage: 'Approved' },
    { id: 'CLIENT-0035', name: 'Mike Wilson', company: 'Tech Solutions', budget: '$4,000-$5,000', date: '5 Dec 2022', stage: 'Approved' },
    { id: 'CLIENT-0036', name: 'Sarah Johnson', company: 'Global Services', budget: '$5,000-$6,000', date: '15 Jan 2023', stage: 'Approved' },
    { id: 'CLIENT-0037', name: 'Tom Brown', company: 'Digital Media', budget: '$6,000-$7,000', date: '25 Feb 2023', stage: 'Approved' },
    { id: 'CLIENT-0038', name: 'Lisa Anderson', company: 'Creative Agency', budget: '$7,000-$8,000', date: '8 Mar 2023', stage: 'Approved' },
    { id: 'CLIENT-0039', name: 'David Lee', company: 'Marketing Pro', budget: '$8,000-$9,000', date: '18 Apr 2023', stage: 'Approved' },
    { id: 'CLIENT-0040', name: 'Emily Davis', company: 'Business Solutions', budget: '$9,000-$10,000', date: '28 May 2023', stage: 'Approved' },
];

export default function ApprovedLeads() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [bookCallModalOpen, setBookCallModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [scheduledModalOpen, setScheduledModalOpen] = useState(false);
    const [bookingData, setBookingData] = useState<{ selectedDate: Date | null; selectedTime: string; selectedTimezone: string } | null>(null);
    const [viewNotesOpen, setViewNotesOpen] = useState(false);

    // Filter leads to only show Approved and filter by search query
    const filteredLeads = leads.filter(lead =>
        lead.stage === 'Approved' &&
        (lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);
    const paginatedLeads = filteredLeads.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const tableHeaders = [
        { label: 'Lead ID', hasCheckbox: true, hasSortIcon: true, className: 'py-4 pl-4 pr-2' },
        { label: 'Lead Name', hasCheckbox: false, hasSortIcon: true, className: 'py-4 px-4' },
        { label: 'Company Name', hasCheckbox: false, hasSortIcon: true, className: 'py-4 px-4' },
        { label: 'Budget Range', hasCheckbox: false, hasSortIcon: true, className: 'py-4 px-4' },
        { label: 'Dated', hasCheckbox: false, hasSortIcon: true, className: 'py-4 px-4' },
        { label: 'Action', hasCheckbox: false, hasSortIcon: false, className: 'py-4 px-4' },
        { label: '', hasCheckbox: false, hasSortIcon: false, className: 'py-4 px-4' }, // View Details column with no header
        { label: '', hasCheckbox: false, hasSortIcon: false, className: 'py-4 px-4' }, // Trash icon column with no header
    ];

    const sortIconSvg = (
        <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer shrink-0">
            <path d="M3.20703 4.5H8.79297C8.89195 4.5 8.98859 4.52934 9.0708 4.58423C9.15301 4.63912 9.21705 4.71698 9.25493 4.80868C9.29281 4.90037 9.30267 5.00121 9.28342 5.09751C9.26417 5.19381 9.21666 5.28358 9.14659 5.35366L6.35366 8.14659C6.25987 8.24038 6.13266 8.29289 6.00035 8.29289C5.86804 8.29289 5.74083 8.24038 5.64704 8.14659L2.85411 5.35366C2.78404 5.28358 2.73653 5.19381 2.71728 5.09751C2.69803 5.00121 2.70789 4.90037 2.74577 4.80868C2.78365 4.71698 2.84769 4.63912 2.9299 4.58423C3.01211 4.52934 3.10875 4.5 3.20703 4.5Z" fill="#8E95A6" />
        </svg>
    );

    return (
        <div className="bg-white border border-[#E4E7EC] rounded-lg">
            {/* Search Bar */}
            <div className="p-4 border-b border-[#E4E7EC]">
                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_search)">
                                <path d="M17.8045 16.8625L13.8252 12.8831C14.9096 11.5569 15.4428 9.86453 15.3144 8.15617C15.1861 6.44782 14.406 4.85415 13.1356 3.70481C11.8652 2.55547 10.2016 1.93839 8.48895 1.98121C6.77632 2.02404 5.14566 2.72348 3.93426 3.93487C2.72287 5.14627 2.02343 6.77693 1.9806 8.48956C1.93778 10.2022 2.55486 11.8658 3.7042 13.1362C4.85354 14.4066 6.44721 15.1867 8.15556 15.315C9.86392 15.4434 11.5563 14.9102 12.8825 13.8258L16.8619 17.8051C16.9876 17.9266 17.156 17.9938 17.3308 17.9922C17.5056 17.9907 17.6728 17.9206 17.7964 17.797C17.92 17.6734 17.9901 17.5062 17.9916 17.3314C17.9932 17.1566 17.926 16.9882 17.8045 16.8625ZM8.66652 14.0005C7.61169 14.0005 6.58054 13.6877 5.70348 13.1016C4.82642 12.5156 4.14283 11.6826 3.73916 10.7081C3.3355 9.73357 3.22988 8.66122 3.43567 7.62665C3.64145 6.59208 4.14941 5.64178 4.89529 4.8959C5.64117 4.15002 6.59147 3.64206 7.62604 3.43628C8.6606 3.23049 9.73296 3.33611 10.7075 3.73977C11.682 4.14344 12.515 4.82703 13.101 5.70409C13.6871 6.58115 13.9999 7.6123 13.9999 8.66713C13.9983 10.0811 13.4359 11.4368 12.436 12.4366C11.4362 13.4365 10.0805 13.9989 8.66652 14.0005Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_search">
                                    <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for potential clients..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-[30%] h-10 pl-10 pr-3 rounded-lg border border-[#E4E7EC] bg-white text-sm text-[#24282E] outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-[#E4E7EC] bg-[#fbfafc]">
                            {tableHeaders.map((header, index) => (
                                <th key={index} className={`${header.className} text-xs text-[#727A90] font-normal`}>
                                    {header.hasCheckbox ? (
                                        <div className="flex items-center gap-1.5">
                                            <input type="checkbox" className="custom-checkbox shrink-0" />
                                            <span className="text-[#2E2C34] text-[14px] font-medium">{header.label}</span>
                                            {header.hasSortIcon && sortIconSvg}
                                        </div>
                                    ) : header.hasSortIcon ? (
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#2E2C34] text-[14px] font-medium">{header.label}</span>
                                            {sortIconSvg}
                                        </div>
                                    ) : header.label ? (
                                        <span className="text-[#2E2C34] text-[14px] font-medium">{header.label}</span>
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedLeads.map((lead, index) => (
                            <tr
                                key={`${lead.id}-${index}`}
                                className="border-b border-[#E4E7EC] bg-white hover:bg-[#F7F8FA] transition-colors"
                            >
                                <td className="py-4 pl-4 pr-2">
                                    <div className="flex items-center gap-1.5">
                                        <input type="checkbox" className="custom-checkbox shrink-0" />
                                        <span className="font-bold text-[14px] leading-[20px] text-[#2E2C34]">{lead.id}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-medium text-[14px] leading-[20px] text-[#24282E]">{lead.name}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-medium text-[14px] leading-[20px] text-[#24282E]">{lead.company}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-medium text-[14px] leading-[20px] text-[#24282E]">{lead.budget}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-medium text-[14px] leading-[20px] text-[#24282E]">{lead.date}</span>
                                </td>
                                <td className="py-4 px-4">
                                    {/* Action column - Book Call button only */}
                                    <button 
                                        onClick={() => {
                                            setSelectedLead(lead);
                                            setBookCallModalOpen(true);
                                        }}
                                        className="flex items-center gap-1.5 px-3 py-2 bg-[#14B13B] text-white rounded-sm text-xs font-medium hover:bg-[#12A035] transition-colors"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_bookcall)">
                                                <path d="M5.84874 4.3869C5.06891 4.3869 4.31345 4.50875 3.60672 4.73782V6.24875C3.60672 6.43883 3.49462 6.60942 3.33378 6.6874C2.85613 6.92623 2.42235 7.23329 2.03731 7.58908C1.94958 7.67681 1.82773 7.72555 1.69613 7.72555C1.55966 7.72555 1.43782 7.67194 1.35008 7.58421L0.141345 6.37547C0.0536134 6.29261 0 6.17076 0 6.03429C0 5.89782 0.0536134 5.77597 0.141345 5.68824C1.6279 4.27967 3.63597 3.41211 5.84874 3.41211C8.06151 3.41211 10.0696 4.27967 11.5561 5.68824C11.6439 5.77597 11.6975 5.89782 11.6975 6.03429C11.6975 6.17076 11.6439 6.29261 11.5561 6.38034L10.3474 7.58908C10.2597 7.67681 10.1378 7.73043 10.0013 7.73043C9.86975 7.73043 9.7479 7.67681 9.66017 7.59396C9.27513 7.23329 8.83647 6.9311 8.35882 6.69228C8.19798 6.61429 8.08588 6.44858 8.08588 6.25362V4.7427C7.38403 4.50875 6.62857 4.3869 5.84874 4.3869Z" fill="#FBFAFC" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_bookcall">
                                                    <rect width="11.6975" height="11.6975" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Book Call
                                    </button>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setViewNotesOpen(true)}
                                            className="text-[#5542F6] hover:text-[#4535D6] transition-colors text-sm font-medium"
                                        >
                                            View Notes
                                        </button>
                                        <button
                                            onClick={() => router.push(`/captured-leads/lead-details?id=${lead.id}`)}
                                            className="text-[#5542F6] hover:text-[#4535D6] transition-colors text-sm font-medium"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    {/* Trash icon column - no header */}
                                    <button className="text-[#727A90] hover:text-[#FC3400] transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.66667 2L10.6667 2.66667H13.3333V4H2.66667V2.66667H5.33333L6.33333 2H9.66667ZM4 4.66667H12V13.3333C12 14.2538 11.2538 15 10.3333 15H5.66667C4.74619 15 4 14.2538 4 13.3333V4.66667ZM5.33333 6.66667V13.3333H10.6667V6.66667H5.33333Z" fill="currentColor" />
                                        </svg>
                                    </button>
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

            {/* Book Call Modal */}
            <BookCallModal
                isOpen={bookCallModalOpen}
                onClose={() => {
                    setBookCallModalOpen(false);
                    setSelectedLead(null);
                }}
                onBooked={(data) => {
                    setBookingData(data);
                    setScheduledModalOpen(true);
                }}
                leadId={selectedLead?.id}
                leadName={selectedLead?.name}
                companyName={selectedLead?.company}
            />
            <ScheduledModal
                isOpen={scheduledModalOpen}
                onClose={() => {
                    setScheduledModalOpen(false);
                    setBookingData(null);
                }}
                selectedDate={bookingData?.selectedDate || null}
                selectedTime={bookingData?.selectedTime || ''}
                selectedTimezone={bookingData?.selectedTimezone || 'UTC'}
            />
            <ViewNotesModal
                isOpen={viewNotesOpen}
                onClose={() => setViewNotesOpen(false)}
            />
        </div>
    );
}

