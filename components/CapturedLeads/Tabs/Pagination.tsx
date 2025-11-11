'use client';

import React from 'react';
import RowsPerPageDropdown from '../../Dropdown/RowsPerPageDropdown';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (items: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
}: PaginationProps) {
    // Get pages to show - show current page and first page if different
    const getVisiblePages = () => {
        const pages: number[] = [];
        if (currentPage === 1) {
            pages.push(1);
            if (totalPages > 1) {
                pages.push(2);
            }
        } else {
            pages.push(1);
            if (currentPage !== 1) {
                pages.push(currentPage);
            }
        }
        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row bg-[#f9f8fe] justify-between items-center px-4 py-3 border-t border-[#E4E7EC] text-sm text-[#727A90] gap-3">
            {/* Left: Showing and items per page */}
            <div className="flex items-center gap-3">
                <span className="text-[#727A90]">Showing</span>
                <RowsPerPageDropdown
                    value={itemsPerPage}
                    onChange={onItemsPerPageChange}
                />
                <span className="text-[#727A90]">items per page</span>
            </div>

            {/* Right: Pagination controls */}
            <div className="flex items-center gap-2">
                {/* Page numbers */}
                {getVisiblePages().map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm transition-colors ${
                            page === currentPage
                                ? 'bg-[#EDECFE] text-[#5542F6] border-[#D1CEFF]'
                                : 'bg-white text-[#24282E] border-[#E4E7EC] hover:bg-[#F7F8FA]'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next button */}
                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm text-[#24282E] hover:text-[#5542F6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>

                {/* End button */}
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm text-[#24282E] hover:text-[#5542F6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    End
                </button>
            </div>
        </div>
    );
}

