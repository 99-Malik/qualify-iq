'use client';

import React from 'react';
import { format } from 'date-fns';
import { Dropdown } from '@/components/OutboundLeads/Modal/ApplyFilterModal/components/Dropdown';
import { ViewMode } from '../types';

interface CalendarNavigationProps {
    currentDate: Date;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    onPrevious: () => void;
    onNext: () => void;
    onToday: () => void;
    onCreateMeeting: () => void;
}

export default function CalendarNavigation({
    currentDate,
    viewMode,
    onViewModeChange,
    onPrevious,
    onNext,
    onToday,
    onCreateMeeting,
}: CalendarNavigationProps) {
    return (
        <div className="overflow-x-auto scroll-hidden mb-6">
            <div className="flex items-center gap-4 min-w-max">
                {/* Date Navigation */}
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={onPrevious}
                        className="p-2 hover:bg-[#F7F8FA] rounded-sm transition-colors flex items-center justify-center shrink-0"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 15L7.5 10L12.5 5" stroke="#24282E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <span className="text-lg font-semibold text-[#24282E] whitespace-nowrap min-w-[120px] text-center">
                        {format(currentDate, 'MMMM yyyy')}
                    </span>
                    <button
                        onClick={onNext}
                        className="p-2 hover:bg-[#F7F8FA] rounded-sm transition-colors flex items-center justify-center shrink-0"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="#24282E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                {/* View Mode Dropdown */}
                <div className="shrink-0">
                    <Dropdown
                        value={viewMode}
                        onChange={(value) => onViewModeChange(value as ViewMode)}
                        options={[
                            { value: 'week', label: 'Week' },
                            { value: 'month', label: 'Month' },
                            { value: 'day', label: 'Day' },
                        ]}
                        buttonClassName="px-3 py-1.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white h-[36px] min-w-[100px]"
                    />
                </div>
                {/* Today Button with Navigation Arrows - Pill Design */}
                <div className="flex items-center bg-white border border-[#E4E7EC] rounded-sm overflow-hidden shrink-0 h-[36px]">
                    <button
                        onClick={onPrevious}
                        className="p-2 hover:bg-[#F7F8FA] transition-colors flex items-center justify-center h-full border-r border-[#E4E7EC]"
                    >
                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0117 13.8016L9.79643 9.97656L14.0117 6.15156L12.714 4.97656L7.19179 9.97656L12.714 14.9766L14.0117 13.8016Z" fill="#84818A" />
                        </svg>

                    </button>
                    <button
                        onClick={onToday}
                        className="px-4 py-2 text-[#84818A] text-sm font-medium hover:bg-[#F7F8FA] transition-colors whitespace-nowrap h-full border-r border-[#E4E7EC]"
                    >
                        Today
                    </button>
                    <button
                        onClick={onNext}
                        className="p-2 hover:bg-[#F7F8FA] transition-colors flex items-center justify-center h-full"
                    >
                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.19336 6.15156L11.4086 9.97656L7.19336 13.8016L8.49108 14.9766L14.0133 9.97656L8.49108 4.97656L7.19336 6.15156Z" fill="#84818A" />
                        </svg>

                    </button>
                </div>
                {/* Add New Meeting Button */}
                <button
                    onClick={onCreateMeeting}
                    className="px-4 py-2 bg-white text-black rounded-sm text-sm font-medium border border-[#E4E7EC] transition-colors flex items-center gap-2 whitespace-nowrap h-[36px] shrink-0"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6673 8.66536H8.66732V12.6654H7.33398V8.66536H3.33398V7.33203H7.33398V3.33203H8.66732V7.33203H12.6673V8.66536Z" fill="#2E2C34" />
                    </svg>

                    <span className="hidden sm:inline">Add New Meeting</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>
        </div>
    );
}

