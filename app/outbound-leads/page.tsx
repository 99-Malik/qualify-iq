'use client'
import React, { useState } from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import { useRouter } from 'next/navigation'
import FloatingAskAIButton from '@/components/Buttons/FloatingAskAIButton'
import Pagination from '@/components/OutboundLeads/pagination'
import Image from 'next/image'
import DataPreviewModal, { ColumnConfig } from '@/components/OutboundLeads/Modal/DataPreviewModal'
import ApplyFilterModal from '@/components/OutboundLeads/Modal/ApplyFilterModal'
interface OutboundLead {
    id: string;
    name: string;
    jobTitle: string;
    company: string;
    companyWebsite: string;
    companyLogo?: string;
    source: {
        text: string;
        color: string;
        bgColor: string;
    };
    location: {
        city: string;
        state: string;
        country: string;
    };
}

const leads: OutboundLead[] = [
    {
        id: 'CLIENT-0024',
        name: 'Elara Neron',
        jobTitle: 'Frontend Developer',
        company: 'Apple',
        companyWebsite: 'apple.com',
        source: { text: 'Manual', color: '#202124', bgColor: '#FFDFC0' },
        location: { city: 'Palo Alto', state: 'California', country: 'USA' }
    },
    {
        id: 'CLIENT-0028',
        name: 'Marcus Chen',
        jobTitle: 'Product Manager',
        company: 'Zillow',
        companyWebsite: 'zillow.com',
        source: { text: 'Wisa App', color: '#202124', bgColor: '#C8C2FC' },
        location: { city: 'Seattle', state: 'Washington', country: 'USA' }
    },
    {
        id: 'CLIENT-0028',
        name: 'Sophia Martinez',
        jobTitle: 'UX Designer',
        company: 'Pinterest',
        companyWebsite: 'pinterest.com',
        source: { text: 'Manual', color: '#202124', bgColor: '#FFDFC0' },
        location: { city: 'San Francisco', state: 'California', country: 'USA' }
    },
    {
        id: 'CLIENT-0029',
        name: 'James Wilson',
        jobTitle: 'Data Scientist',
        company: 'Tesla',
        companyWebsite: 'tesla.com',
        source: { text: 'Wisa App', color: '#202124', bgColor: '#C8C2FC' },
        location: { city: 'Austin', state: 'Texas', country: 'USA' }
    },
    {
        id: 'CLIENT-0029',
        name: 'Emma Thompson',
        jobTitle: 'Software Engineer',
        company: 'Google',
        companyWebsite: 'google.com',
        source: { text: 'Manual', color: '#202124', bgColor: '#FFDFC0' },
        location: { city: 'Mountain View', state: 'California', country: 'USA' }
    },
    {
        id: 'CLIENT-0029',
        name: 'David Kim',
        jobTitle: 'Backend Developer',
        company: 'Microsoft',
        companyWebsite: 'microsoft.com',
        source: { text: 'Wisa App', color: '#202124', bgColor: '#C8C2FC' },
        location: { city: 'Redmond', state: 'Washington', country: 'USA' }
    },
    {
        id: 'CLIENT-0030',
        name: 'Olivia Brown',
        jobTitle: 'Marketing Manager',
        company: 'Apple',
        companyWebsite: 'apple.com',
        source: { text: 'Manual', color: '#202124', bgColor: '#FFDFC0' },
        location: { city: 'Cupertino', state: 'California', country: 'USA' }
    },
    {
        id: 'CLIENT-0031',
        name: 'Noah Davis',
        jobTitle: 'DevOps Engineer',
        company: 'Zillow',
        companyWebsite: 'zillow.com',
        source: { text: 'Wisa App', color: '#202124', bgColor: '#C8C2FC' },
        location: { city: 'Seattle', state: 'Washington', country: 'USA' }
    },
    {
        id: 'CLIENT-0032',
        name: 'Ava Garcia',
        jobTitle: 'Frontend Developer',
        company: 'Pinterest',
        companyWebsite: 'pinterest.com',
        source: { text: 'Manual', color: '#202124', bgColor: '#FFDFC0' },
        location: { city: 'San Francisco', state: 'California', country: 'USA' }
    },
    {
        id: 'CLIENT-0033',
        name: 'Liam Rodriguez',
        jobTitle: 'Product Designer',
        company: 'Tesla',
        companyWebsite: 'tesla.com',
        source: { text: 'Wisa App', color: '#202124', bgColor: '#C8C2FC' },
        location: { city: 'Fremont', state: 'California', country: 'USA' }
    },
    {
        id: 'CLIENT-0034',
        name: 'Isabella Lee',
        jobTitle: 'Data Analyst',
        company: 'Google',
        companyWebsite: 'google.com',
        source: { text: 'Manual', color: '#202124', bgColor: '#FFDFC0' },
        location: { city: 'Sunnyvale', state: 'California', country: 'USA' }
    },
    {
        id: 'CLIENT-0035',
        name: 'Mason White',
        jobTitle: 'Full Stack Developer',
        company: 'Microsoft',
        companyWebsite: 'microsoft.com',
        source: { text: 'Wisa App', color: '#202124', bgColor: '#C8C2FC' },
        location: { city: 'Bellevue', state: 'Washington', country: 'USA' }
    },
];

function OutboundLeadsPage() {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(8)
    const [searchQuery, setSearchQuery] = useState('')
    const [isDataPreviewOpen, setIsDataPreviewOpen] = useState(false)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    
    // Column configuration with default order
    const [columns, setColumns] = useState<ColumnConfig[]>([
        { id: 'leadId', label: 'Lead ID', example: 'e.g, ID 13265', visible: true, order: 0 },
        { id: 'lead', label: 'Lead', example: 'e.g, Mr Alex', visible: true, order: 1 },
        { id: 'company', label: 'Company', example: 'e.g, Enterprise Ltd.', visible: true, order: 2 },
        { id: 'source', label: 'Source', example: 'e.g, Manual', visible: true, order: 3 },
        { id: 'location', label: 'Location', example: 'e.g, New York Street 2 House 29', visible: true, order: 4 },
    ])

    // Filter leads based on search query
    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.location.city.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredLeads.length / rowsPerPage)
    const paginatedLeads = filteredLeads.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    // Sort columns by order and filter visible ones
    const visibleColumns = columns
        .filter(col => col.visible)
        .sort((a, b) => a.order - b.order)

    const sortIconSvg = (
        <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer shrink-0">
            <path d="M3.20703 4.5H8.79297C8.89195 4.5 8.98859 4.52934 9.0708 4.58423C9.15301 4.63912 9.21705 4.71698 9.25493 4.80868C9.29281 4.90037 9.30267 5.00121 9.28342 5.09751C9.26417 5.19381 9.21666 5.28358 9.14659 5.35366L6.35366 8.14659C6.25987 8.24038 6.13266 8.29289 6.00035 8.29289C5.86804 8.29289 5.74083 8.24038 5.64704 8.14659L2.85411 5.35366C2.78404 5.28358 2.73653 5.19381 2.71728 5.09751C2.69803 5.00121 2.70789 4.90037 2.74577 4.80868C2.78365 4.71698 2.84769 4.63912 2.9299 4.58423C3.01211 4.52934 3.10875 4.5 3.20703 4.5Z" fill="#8E95A6" />
        </svg>
    )

    const handleHeaderClick = () => {
        setIsDataPreviewOpen(true)
    }

    const handleSaveColumns = (updatedColumns: ColumnConfig[]) => {
        setColumns(updatedColumns)
    }

    const renderTableCell = (lead: OutboundLead, columnId: string) => {
        switch (columnId) {
            case 'leadId':
                return (
                    <td key={columnId} className="py-4 pl-4 pr-2">
                        <div className="flex items-center gap-1.5">
                            <input type="checkbox" className="custom-checkbox shrink-0" />
                            <span className="font-bold text-[14px] leading-[20px] text-[#2E2C34]">{lead.id}</span>
                        </div>
                    </td>
                )
            case 'lead':
                return (
                    <td key={columnId} className="py-4 px-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                <Image
                                    src="/images/avatar.jpg"
                                    alt={lead.name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-semibold text-[#2E2C34]">{lead.name}</div>
                                <div className="text-sm text-[#686F83]">{lead.jobTitle}</div>
                            </div>
                        </div>
                    </td>
                )
            case 'company':
                return (
                    <td key={columnId} className="py-4 px-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded overflow-hidden shrink-0">
                                <Image
                                    src="/images/google.png"
                                    alt={lead.company}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-semibold text-[#2E2C34]">{lead.company}</div>
                                <div className="text-sm text-[#5542F6]">{lead.companyWebsite}</div>
                            </div>
                        </div>
                    </td>
                )
            case 'source':
                return (
                    <td key={columnId} className="py-4 px-4">
                        <span
                            className="inline-flex items-center px-2 py-1 text-xs font-bold"
                            style={{
                                color: lead.source.color,
                                backgroundColor: lead.source.bgColor,
                                borderRadius: '0.125rem'
                            }}
                        >
                            {lead.source.text}
                        </span>
                    </td>
                )
            case 'location':
                return (
                    <td key={columnId} className="py-4 px-4">
                        <span className="font-medium text-[14px] leading-[20px] text-[#24282E]">
                            {lead.location.city}, {lead.location.state}, {lead.location.country}
                        </span>
                    </td>
                )
            default:
                return null
        }
    }

    const renderTableHeader = (column: ColumnConfig) => {
        const hasSortIcon = column.id === 'leadId' || column.id === 'lead' || column.id === 'location'
        const hasCheckbox = column.id === 'leadId'

        return (
            <th
                key={column.id}
                className={`py-4 ${column.id === 'leadId' ? 'pl-4 pr-2' : 'px-4'} text-xs text-[#727A90] font-normal cursor-pointer bg-[#fbfafc] hover:bg-[#F7F8FA] transition-colors`}
                onClick={handleHeaderClick}
            >
                {hasCheckbox ? (
                    <div className="flex items-center gap-1.5">
                        <input 
                            type="checkbox" 
                            className="custom-checkbox shrink-0" 
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="text-[#2E2C34] text-[14px] font-medium">
                            {column.label}
                        </span>
                        {hasSortIcon && sortIconSvg}
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <span className="text-[#2E2C34] text-[14px] font-medium">{column.label}</span>
                        {hasSortIcon && sortIconSvg}
                    </div>
                )}
            </th>
        )
    }

    return (
        <AppLayout activeKey="outbound">
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Outbound Leads</span>
                </nav>
            </div>

            {/* Header Section with Title and Export Button */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Outbound Leads</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#e9e8fb] border-2 border-[#5542F6] text-[#5542F6] rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00065 10.6667H10.0007V6.66667H12.6673L8.00065 2L3.33398 6.66667H6.00065V10.6667ZM3.33398 12H12.6673V13.3333H3.33398V12Z" fill="#5542F6" />
                    </svg>
                    Export Report
                </button>
            </div>

            {/* Horizontal Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-8 mt-2"></div>

            {/* Search and Filter Section */}
            <div className="mb-4 flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
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
                        placeholder="Search for leads..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setCurrentPage(1)
                        }}
                        className="w-full h-10 pl-10 pr-3 rounded-lg border border-[#E4E7EC] bg-white text-sm text-[#24282E] outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                </div>
                <button 
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#f2f2f3] font-semibold border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] hover:bg-[#F7F8FA] transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66667 12H9.33333V10.6667H6.66667V12ZM2 4V5.33333H14V4H2ZM4 8.66667H12V7.33333H4V8.66667Z" fill="#2E2C34" />
                    </svg>

                    Apply Filters
                </button>
            </div>

            {/* Table */}
            <div className="bg-white border border-[#E4E7EC] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-[#E4E7EC] bg-[#fbfafc]">
                                {visibleColumns.map(renderTableHeader)}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLeads.map((lead, index) => (
                                <tr
                                    key={`${lead.id}-${index}`}
                                    className="border-b border-[#E4E7EC] bg-white hover:bg-[#F7F8FA] transition-colors"
                                >
                                    {visibleColumns.map(column => renderTableCell(lead, column.id))}
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
                        setRowsPerPage(val)
                        setCurrentPage(1)
                    }}
                />
            </div>

            <FloatingAskAIButton />

            {/* Data Preview Modal */}
            <DataPreviewModal
                isOpen={isDataPreviewOpen}
                onClose={() => setIsDataPreviewOpen(false)}
                columns={columns}
                onSave={handleSaveColumns}
            />

            {/* Apply Filter Modal */}
            <ApplyFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={() => {
                    // Handle apply filters logic here
                    setIsFilterModalOpen(false)
                }}
                onReset={() => {
                    // Handle reset filters logic here
                }}
            />
        </AppLayout>
    )
}

export default OutboundLeadsPage

