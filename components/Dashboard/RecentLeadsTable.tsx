'use client';

import React, { useState } from 'react';
import RowsPerPageDropdown from '../Dropdown/RowsPerPageDropdown';
import Pagination from '../CapturedLeads/Tabs/Pagination';

const leads = [
    { id: 'CLIENT-0024', name: 'Alice Smith', description: 'Overview of client requirements and...', budget: '$2000-$3000', date: '15 Jan 2022', stage: 'In Progress', stageColor: '#14B13B' },
    { id: 'CLIENT-0025', name: 'Bob Johnson', description: 'Summary of client needs for project i...', budget: '$3000-$4000', date: '3 Feb 2022', stage: 'In Progress', stageColor: '#14B13B' },
    { id: 'CLIENT-0026', name: 'Charlie Brown', description: 'Details regarding client preferences...', budget: '$4000-$5000', date: '28 Mar 2022', stage: 'Approved', stageColor: '#FC3400' },
    { id: 'CLIENT-0027', name: 'Diana Prince', description: 'Initial insights into client objectives...', budget: '$5000-$6000', date: '7 Apr 2022', stage: 'In Progress', stageColor: '#14B13B' },
    { id: 'CLIENT-0028', name: 'Ethan Hunt', description: 'Preliminary information about client...', budget: '$6000-$7000', date: '19 May 2022', stage: 'Pending', stageColor: '#5542F6' },
    { id: 'CLIENT-0029', name: 'Fiona Gallagher', description: 'Basic overview of client requirement...', budget: '$7000-$8000', date: '11 Jun 2022', stage: 'Pending', stageColor: '#5542F6' },
    // Add more leads for pagination
    { id: 'CLIENT-0030', name: 'George Wilson', description: 'Additional client information and...', budget: '$8000-$9000', date: '22 Jul 2022', stage: 'In Progress', stageColor: '#14B13B' },
    { id: 'CLIENT-0031', name: 'Hannah Davis', description: 'Further details about client needs...', budget: '$9000-$10000', date: '5 Aug 2022', stage: 'Approved', stageColor: '#FC3400' },
    { id: 'CLIENT-0032', name: 'Ian Miller', description: 'Client requirements summary and...', budget: '$10000-$11000', date: '18 Sep 2022', stage: 'Pending', stageColor: '#5542F6' },
    { id: 'CLIENT-0033', name: 'Jane Anderson', description: 'Overview of project requirements...', budget: '$11000-$12000', date: '30 Oct 2022', stage: 'In Progress', stageColor: '#14B13B' },
    { id: 'CLIENT-0034', name: 'Kevin Taylor', description: 'Client preferences and expectations...', budget: '$12000-$13000', date: '12 Nov 2022', stage: 'Approved', stageColor: '#FC3400' },
    { id: 'CLIENT-0035', name: 'Laura Martinez', description: 'Detailed client briefing document...', budget: '$13000-$14000', date: '25 Dec 2022', stage: 'Pending', stageColor: '#5542F6' },
    { id: 'CLIENT-0036', name: 'Mike Thompson', description: 'Client needs assessment and analysis...', budget: '$14000-$15000', date: '8 Jan 2023', stage: 'In Progress', stageColor: '#14B13B' },
    { id: 'CLIENT-0037', name: 'Nancy White', description: 'Initial client consultation summary...', budget: '$15000-$16000', date: '20 Feb 2023', stage: 'Approved', stageColor: '#FC3400' },
    { id: 'CLIENT-0038', name: 'Oliver Harris', description: 'Client project scope and timeline...', budget: '$16000-$17000', date: '4 Mar 2023', stage: 'Pending', stageColor: '#5542F6' },
];

export default function RecentLeadsTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(leads.length / rowsPerPage);
    const paginatedLeads = leads.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="bg-white rounded-xl shadow-lg border border-[#E4E7EC] mt-6">
            {/* Header with Search and Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-5 border-b border-[#E4E7EC] gap-3">
                {/* Search bar */}
                <div className="relative w-full sm:w-1/3">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2896_16250)">
                                <path d="M17.8045 16.8625L13.8252 12.8831C14.9096 11.5569 15.4428 9.86453 15.3144 8.15617C15.1861 6.44782 14.406 4.85415 13.1356 3.70481C11.8652 2.55547 10.2016 1.93839 8.48895 1.98121C6.77632 2.02404 5.14566 2.72348 3.93426 3.93487C2.72287 5.14627 2.02343 6.77693 1.9806 8.48956C1.93778 10.2022 2.55486 11.8658 3.7042 13.1362C4.85354 14.4066 6.44721 15.1867 8.15556 15.315C9.86392 15.4434 11.5563 14.9102 12.8825 13.8258L16.8619 17.8051C16.9876 17.9266 17.156 17.9938 17.3308 17.9922C17.5056 17.9907 17.6728 17.9206 17.7964 17.797C17.92 17.6734 17.9901 17.5062 17.9916 17.3314C17.9932 17.1566 17.926 16.9882 17.8045 16.8625ZM8.66652 14.0005C7.61169 14.0005 6.58054 13.6877 5.70348 13.1016C4.82642 12.5156 4.14283 11.6826 3.73916 10.7081C3.3355 9.73357 3.22988 8.66122 3.43567 7.62665C3.64145 6.59208 4.14941 5.64178 4.89529 4.8959C5.64117 4.15002 6.59147 3.64206 7.62604 3.43628C8.6606 3.23049 9.73296 3.33611 10.7075 3.73977C11.682 4.14344 12.515 4.82703 13.101 5.70409C13.6871 6.58115 13.9999 7.6123 13.9999 8.66713C13.9983 10.0811 13.4359 11.4368 12.436 12.4366C11.4362 13.4365 10.0805 13.9989 8.66652 14.0005Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2896_16250">
                                    <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for potential clients..."
                        className="w-full h-9 lg:h-10 pl-9 sm:pl-10 pr-3 rounded-lg border border-[#E4E7EC] bg-white text-sm text-[#24282E] outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                </div>
                
                {/* Filters and Rows Per Page */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex items-center gap-2 border border-[#E4E7EC] px-3 sm:px-4 py-2 rounded-lg text-sm text-[#727A90] hover:bg-[#F7F8FA] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2896_18203)">
                                <path d="M2.66757 5.16715H4.49138C4.85135 6.49158 6.21681 7.27344 7.54124 6.91348C8.39187 6.68228 9.05637 6.01779 9.28756 5.16715H17.3328C17.7009 5.16715 17.9994 4.86871 17.9994 4.50056C17.9994 4.13241 17.7009 3.83397 17.3328 3.83397H9.28756C8.9276 2.50951 7.56214 1.72765 6.23771 2.08762C5.38708 2.31881 4.72258 2.98331 4.49138 3.83394H2.66757C2.29942 3.83394 2.00098 4.13238 2.00098 4.50053C2.00098 4.86868 2.29942 5.16715 2.66757 5.16715Z" fill="#727A90" />
                                <path d="M17.3328 9.33374H15.5089C15.1497 8.0095 13.785 7.2272 12.4607 7.58642C11.6094 7.81736 10.9444 8.48239 10.7134 9.33374H2.66757C2.29942 9.33374 2.00098 9.63218 2.00098 10.0003C2.00098 10.3685 2.29942 10.6669 2.66757 10.6669H10.7134C11.0727 11.9912 12.4374 12.7735 13.7616 12.4143C14.6129 12.1833 15.278 11.5183 15.5089 10.6669H17.3328C17.7009 10.6669 17.9994 10.3685 17.9994 10.0003C17.9994 9.63218 17.7009 9.33374 17.3328 9.33374Z" fill="#727A90" />
                                <path d="M17.3328 14.8328H9.28756C8.9276 13.5084 7.56214 12.7266 6.23771 13.0865C5.38708 13.3177 4.72258 13.9822 4.49138 14.8328H2.66757C2.29942 14.8328 2.00098 15.1313 2.00098 15.4994C2.00098 15.8676 2.29942 16.166 2.66757 16.166H4.49138C4.85135 17.4904 6.21681 18.2723 7.54124 17.9123C8.39187 17.6811 9.05637 17.0167 9.28756 16.166H17.3328C17.7009 16.166 17.9994 15.8676 17.9994 15.4994C17.9994 15.1313 17.7009 14.8328 17.3328 14.8328Z" fill="#727A90" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2896_18203">
                                    <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span>Filters</span>
                    </button>
                    
                    {/* Rows per page dropdown */}
                    <RowsPerPageDropdown
                        value={rowsPerPage}
                        onChange={(val) => {
                            setRowsPerPage(val);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-[#E4E7EC] bg-white">
                            <th className="py-4 pl-4 pr-2 text-xs text-[#727A90] font-normal">
                                <div className="flex items-center gap-1.5">
                                    <input type="checkbox" className="custom-checkbox shrink-0" />
                                    <span className="text-[#2E2C34] text-[14px]">Lead ID</span>
                                </div>
                            </th>
                            <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#2E2C34] text-[14px]">Lead Name</span>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer shrink-0">
                                        <path d="M4.81063 6.75H13.1896C13.3379 6.75003 13.4829 6.79404 13.6062 6.87645C13.7295 6.95886 13.8256 7.07598 13.8824 7.21301C13.9391 7.35003 13.954 7.50081 13.9251 7.64627C13.8961 7.79174 13.8247 7.92536 13.7199 8.03025L9.53038 12.2197C9.38974 12.3603 9.199 12.4393 9.00013 12.4393C8.80126 12.4393 8.61053 12.3603 8.46988 12.2197L4.28038 8.03025C4.17552 7.92536 4.10412 7.79174 4.07519 7.64627C4.04627 7.50081 4.06112 7.35003 4.11787 7.21301C4.17463 7.07598 4.27073 6.95886 4.39404 6.87645C4.51734 6.79404 4.66232 6.75003 4.81063 6.75Z" fill="#8E95A6" />
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                <span className="text-[#2E2C34] text-[14px]">Lead Description</span>
                            </th>
                            <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#2E2C34] text-[14px]">Budget Range</span>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer shrink-0">
                                        <path d="M4.81063 6.75H13.1896C13.3379 6.75003 13.4829 6.79404 13.6062 6.87645C13.7295 6.95886 13.8256 7.07598 13.8824 7.21301C13.9391 7.35003 13.954 7.50081 13.9251 7.64627C13.8961 7.79174 13.8247 7.92536 13.7199 8.03025L9.53038 12.2197C9.38974 12.3603 9.199 12.4393 9.00013 12.4393C8.80126 12.4393 8.61053 12.3603 8.46988 12.2197L4.28038 8.03025C4.17552 7.92536 4.10412 7.79174 4.07519 7.64627C4.04627 7.50081 4.06112 7.35003 4.11787 7.21301C4.17463 7.07598 4.27073 6.95886 4.39404 6.87645C4.51734 6.79404 4.66232 6.75003 4.81063 6.75Z" fill="#8E95A6" />
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#2E2C34] text-[14px]">Client Date</span>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer shrink-0">
                                        <path d="M4.81063 6.75H13.1896C13.3379 6.75003 13.4829 6.79404 13.6062 6.87645C13.7295 6.95886 13.8256 7.07598 13.8824 7.21301C13.9391 7.35003 13.954 7.50081 13.9251 7.64627C13.8961 7.79174 13.8247 7.92536 13.7199 8.03025L9.53038 12.2197C9.38974 12.3603 9.199 12.4393 9.00013 12.4393C8.80126 12.4393 8.61053 12.3603 8.46988 12.2197L4.28038 8.03025C4.17552 7.92536 4.10412 7.79174 4.07519 7.64627C4.04627 7.50081 4.06112 7.35003 4.11787 7.21301C4.17463 7.07598 4.27073 6.95886 4.39404 6.87645C4.51734 6.79404 4.66232 6.75003 4.81063 6.75Z" fill="#8E95A6" />
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#2E2C34] text-[14px]">Stage</span>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer shrink-0">
                                        <path d="M4.81063 6.75H13.1896C13.3379 6.75003 13.4829 6.79404 13.6062 6.87645C13.7295 6.95886 13.8256 7.07598 13.8824 7.21301C13.9391 7.35003 13.954 7.50081 13.9251 7.64627C13.8961 7.79174 13.8247 7.92536 13.7199 8.03025L9.53038 12.2197C9.38974 12.3603 9.199 12.4393 9.00013 12.4393C8.80126 12.4393 8.61053 12.3603 8.46988 12.2197L4.28038 8.03025C4.17552 7.92536 4.10412 7.79174 4.07519 7.64627C4.04627 7.50081 4.06112 7.35003 4.11787 7.21301C4.17463 7.07598 4.27073 6.95886 4.39404 6.87645C4.51734 6.79404 4.66232 6.75003 4.81063 6.75Z" fill="#8E95A6" />
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedLeads.map((lead, index) => (
                            <tr
                                key={lead.id}
                                className="border-b border-[#E4E7EC] bg-white hover:bg-[#F7F8FA] transition-colors"
                            >
                                <td className="py-4 pl-4 pr-2">
                                    <div className="flex items-center gap-1.5">
                                        <input type="checkbox" className="custom-checkbox shrink-0" />
                                        <span className="font-bold text-[14px] leading-[20px] tracking-normal text-[#2E2C34]" style={{ fontFamily: 'Manrope' }}>{lead.id}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-bold text-[14px] leading-[20px] tracking-normal text-[#24282E]" style={{ fontFamily: 'Manrope' }}>{lead.name}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-medium text-[14px] leading-[20px] text-[#686F83]" style={{ fontFamily: 'Manrope', letterSpacing: '0.005em' }}>{lead.description}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-medium text-[14px] leading-[20px] text-[#24282E]" style={{ fontFamily: 'Manrope', letterSpacing: '0.005em' }}>{lead.budget}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-medium text-[14px] leading-[20px] text-[#24282E]" style={{ fontFamily: 'Manrope', letterSpacing: '0.005em' }}>{lead.date}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="font-bold text-[14px]" style={{ color: lead.stageColor, fontFamily: 'Manrope' }}>
                                        {lead.stage}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <button className="text-[#727A90] hover:text-[#EF4444] transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM6 18.9999C6 20.0999 6.9 20.9999 8 20.9999H16C17.1 20.9999 18 20.0999 18 18.9999V6.9999H6V18.9999ZM8.0001 9H16.0001V19H8.0001V9Z" fill="#84818A"/>
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
        </div>
    );
}

