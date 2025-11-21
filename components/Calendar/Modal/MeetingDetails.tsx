'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import { CalendarEvent } from '../types';
import { toZonedTime, format as formatTz } from 'date-fns-tz';

interface TimezoneOption {
    iana: string;
    displayName: string;
    currentTime: string;
}

interface MeetingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: CalendarEvent | null;
}

export default function MeetingDetailsModal({
    isOpen,
    onClose,
    event,
}: MeetingDetailsModalProps) {
    const [selectedTimezone, setSelectedTimezone] = useState<string>(() => {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch {
            return 'UTC';
        }
    });
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
    const [timezoneSearch, setTimezoneSearch] = useState('');
    const [timezoneDropdownPosition, setTimezoneDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [datePickerPosition, setDatePickerPosition] = useState({ top: 0, left: 0 });
    const modalRef = useRef<HTMLDivElement>(null);
    const dateButtonRef = useRef<HTMLButtonElement>(null);
    const timezoneRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const getAllTimezones = (): TimezoneOption[] => {
        try {
            const timezones = Intl.supportedValuesOf('timeZone');

            return timezones.map(iana => {
                const zonedTime = toZonedTime(currentTime, iana);
                const timeStr = formatTz(zonedTime, 'h:mma', { timeZone: iana });
                const displayName = iana
                    .replace(/_/g, ' ')
                    .split('/')
                    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
                    .join(' - ');

                return {
                    iana,
                    displayName,
                    currentTime: timeStr.toLowerCase()
                };
            }).sort((a, b) => a.displayName.localeCompare(b.displayName));
        } catch (error) {
            console.warn('Intl.supportedValuesOf not supported, using fallback timezones');
            return getFallbackTimezones();
        }
    };

    const getFallbackTimezones = (): TimezoneOption[] => {
        const commonTimezones = [
            'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
            'America/Toronto', 'America/Mexico_City', 'America/Sao_Paulo', 'America/Buenos_Aires',
            'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Rome', 'Europe/Madrid',
            'Europe/Amsterdam', 'Europe/Stockholm', 'Europe/Vienna', 'Europe/Prague',
            'Europe/Warsaw', 'Europe/Athens', 'Europe/Istanbul', 'Europe/Moscow',
            'Asia/Dubai', 'Asia/Karachi', 'Asia/Kolkata', 'Asia/Dhaka', 'Asia/Bangkok',
            'Asia/Singapore', 'Asia/Hong_Kong', 'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Seoul',
            'Australia/Sydney', 'Australia/Melbourne', 'Pacific/Auckland', 'Pacific/Honolulu'
        ];

        return commonTimezones.map(iana => {
            const zonedTime = toZonedTime(currentTime, iana);
            const timeStr = formatTz(zonedTime, 'h:mma', { timeZone: iana });
            const displayName = iana
                .replace(/_/g, ' ')
                .split('/')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
                .join(' - ');

            return {
                iana,
                displayName,
                currentTime: timeStr.toLowerCase()
            };
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isTimezoneOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isTimezoneOpen]);

    const timezones = useMemo(() => getAllTimezones(), [currentTime]);

    const filteredTimezones = useMemo(() =>
        timezones.filter(tz =>
            tz.displayName.toLowerCase().includes(timezoneSearch.toLowerCase()) ||
            tz.iana.toLowerCase().includes(timezoneSearch.toLowerCase())
        ),
        [timezones, timezoneSearch]
    );

    const getSelectedTimezoneDisplay = (): string => {
        const tz = timezones.find(t => t.iana === selectedTimezone);
        if (tz) {
            const zonedTime = toZonedTime(currentTime, selectedTimezone);
            const timeStr = formatTz(zonedTime, 'h:mma', { timeZone: selectedTimezone });
            return `${tz.displayName} (${timeStr.toLowerCase()})`;
        }
        return selectedTimezone;
    };

    useEffect(() => {
        if (isTimezoneOpen && timezoneRef.current) {
            const rect = timezoneRef.current.getBoundingClientRect();
            const dropdownHeight = Math.min(filteredTimezones.length * 48 + 60, 300); // Max height 300px, +60 for search input
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;

            // Try to open downward first, but if not enough space, open upward
            let top: number;
            if (spaceBelow >= dropdownHeight + 10) {
                top = rect.bottom + 4; // Open downward with small gap
            } else if (spaceAbove >= dropdownHeight + 10) {
                top = rect.top - dropdownHeight - 4; // Open upward with small gap
            } else {
                // Not enough space either way, open downward but adjust
                top = Math.max(4, Math.min(rect.bottom + 4, viewportHeight - dropdownHeight - 4));
            }

            setTimezoneDropdownPosition({
                top: Math.max(4, Math.min(top, viewportHeight - dropdownHeight - 4)),
                left: rect.left,
                width: Math.max(rect.width, 300), // Minimum width 300px
            });
        }
    }, [isTimezoneOpen, filteredTimezones.length]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (timezoneRef.current && !timezoneRef.current.contains(target)) {
                const dropdownElement = document.querySelector('[data-timezone-dropdown]');
                if (dropdownElement && !dropdownElement.contains(target)) {
                    setIsTimezoneOpen(false);
                }
            }
        };

        const handleScroll = (event: Event) => {
            // Don't close if scrolling inside the dropdown itself
            const dropdownElement = document.querySelector('[data-timezone-dropdown]');
            if (dropdownElement && dropdownElement.contains(event.target as Node)) {
                return;
            }
            if (timezoneRef.current && timezoneRef.current.contains(event.target as Node)) {
                return;
            }
            setIsTimezoneOpen(false);
        };

        if (isTimezoneOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScroll, true);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [isTimezoneOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (isDatePickerOpen && dateButtonRef.current && !dateButtonRef.current.contains(target)) {
                const calendarElement = document.querySelector('[data-calendar-picker]');
                if (calendarElement && !calendarElement.contains(target)) {
                    setIsDatePickerOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDatePickerOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !event) return null;

    // Format time display: "7- 8:00am"
    const formatTimeDisplay = (startTime: string, endTime: string) => {
        const formatTime = (time: string) => {
            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours, 10);
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            const period = hour >= 12 ? 'pm' : 'am';
            const mins = minutes === '00' ? '' : `:${minutes}`;
            return `${displayHour}${mins}${period}`;
        };
        return `${formatTime(startTime)}- ${formatTime(endTime)}`;
    };

    const formattedDate = format(event.date, 'd MMM yyyy');
    const formattedTime = formatTimeDisplay(event.time, event.endTime);
    const dateTimeDisplay = `${formattedDate}, ${formattedTime}`;

    const getCalendarDays = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const calendarDays = getCalendarDays(event.date);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const goToPreviousMonth = () => {
        const newDate = new Date(event.date);
        newDate.setMonth(newDate.getMonth() - 1);
        // Update event date would require state management, for now just visual
    };

    const goToNextMonth = () => {
        const newDate = new Date(event.date);
        newDate.setMonth(newDate.getMonth() + 1);
        // Update event date would require state management, for now just visual
    };

    const handleDateChange = (selectedDate: Date) => {
        // Update event date would require callback to parent
        setIsDatePickerOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()} style={{ overflow: 'visible' }} ref={modalRef}>
                <div className="relative bg-white rounded-lg shadow-xl flex flex-col max-h-full" style={{ overflow: 'visible' }}>
                    {/* Header */}
                    <div className="flex items-start justify-between px-6 pt-6 pb-4 shrink-0">
                        <div>
                            <h2 className="text-2xl font-bold text-[#24282E] mb-1">Meeting Details</h2>
                            <p className="text-sm text-[#727A90]">You can set your discovery details here.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-[#727A90] hover:text-[#24282E] transition-colors shrink-0"
                        >
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9987 2.33301C7.54703 2.33301 2.33203 7.54801 2.33203 13.9997C2.33203 20.4513 7.54703 25.6663 13.9987 25.6663C20.4504 25.6663 25.6654 20.4513 25.6654 13.9997C25.6654 7.54801 20.4504 2.33301 13.9987 2.33301ZM19.832 18.188L18.187 19.833L13.9987 15.6447L9.81036 19.833L8.16537 18.188L12.3537 13.9997L8.16537 9.81134L9.81036 8.16634L13.9987 12.3547L18.187 8.16634L19.832 9.81134L15.6437 13.9997L19.832 18.188Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto flex-1 scroll-hidden" style={{ overflowX: 'visible', overflowY: 'auto' }}>
                        <div className="px-6 pb-6 space-y-4" style={{ position: 'relative', overflow: 'visible' }}>
                            {/* Meeting Information Box */}
                            <div className="border bg-[#fbfafc]  border-[#EBEAED] rounded-lg p-4 space-y-4">
                                {/* Status Buttons */}
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1.5 bg-[#14B13B] text-white text-sm font-medium rounded-sm">
                                        Completed
                                    </button>
                                    <button className="px-3 py-1.5 bg-[#FFDFC0] text-[#24282E] text-sm font-bold rounded-sm">
                                        Form : Pending
                                    </button>
                                </div>

                                {/* Participant */}
                                <div className="flex items-center gap-3">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_1139_13596)">
                                            <path d="M3.85019 3.84922C3.85019 4.26288 3.93167 4.6725 4.08997 5.05467C4.24828 5.43685 4.4803 5.7841 4.77281 6.07661C5.06531 6.36911 5.41257 6.60114 5.79474 6.75944C6.17692 6.91774 6.58653 6.99922 7.00019 6.99922C7.41386 6.99922 7.82347 6.91774 8.20565 6.75944C8.58782 6.60114 8.93508 6.36911 9.22758 6.07661C9.52008 5.7841 9.75211 5.43685 9.91042 5.05467C10.0687 4.6725 10.1502 4.26288 10.1502 3.84922C10.1502 3.43556 10.0687 3.02594 9.91042 2.64377C9.75211 2.26159 9.52008 1.91434 9.22758 1.62183C8.93508 1.32933 8.58782 1.0973 8.20565 0.938998C7.82347 0.780696 7.41386 0.699219 7.00019 0.699219C6.58653 0.699219 6.17692 0.780696 5.79474 0.938998C5.41257 1.0973 5.06531 1.32933 4.77281 1.62183C4.4803 1.91434 4.24828 2.26159 4.08997 2.64377C3.93167 3.02594 3.85019 3.43556 3.85019 3.84922ZM12.9418 13.2992C12.5083 12.0696 11.704 11.0048 10.6398 10.2516C9.57564 9.49833 8.30398 9.09383 7.00019 9.09383C5.69641 9.09383 4.42475 9.49833 3.36055 10.2516C2.29636 11.0048 1.49207 12.0696 1.05859 13.2992H12.9418Z" stroke="#2E2C34" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1139_13596">
                                                <rect width="14" height="14" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className="text-sm text-[#24282E]">{event.client}</span>
                                </div>

                                {/* Time Zone */}
                                <div className="flex items-center gap-3">

                                    <div className="relative" ref={timezoneRef}>
                                        <button
                                            onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                                            className="w-full flex items-center gap-2 py-2.5 text-[0.873rem] text-[#84818A]"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_559_40062)">
                                                    <path d="M6.9825 0C6.01877 0 5.11414 0.181836 4.2686 0.545507C3.41397 0.90918 2.67072 1.40696 2.03884 2.03884C1.40696 2.67072 0.90918 3.41397 0.545508 4.2686C0.181836 5.11414 0 6.01877 0 6.9825C0 7.94623 0.181836 8.85086 0.545508 9.6964C0.90918 10.551 1.40696 11.2943 2.03884 11.9262C2.67072 12.558 3.41397 13.0558 4.2686 13.4195C5.11414 13.7832 6.01877 13.965 6.9825 13.965C7.94623 13.965 8.85087 13.7832 9.6964 13.4195C10.551 13.0558 11.2943 12.558 11.9262 11.9262C12.558 11.2943 13.0558 10.551 13.4195 9.6964C13.7832 8.85086 13.965 7.94623 13.965 6.9825C13.965 6.01877 13.7832 5.11414 13.4195 4.2686C13.0558 3.41397 12.558 2.67072 11.9262 2.03884C11.2943 1.40696 10.551 0.90918 9.6964 0.545507C8.85087 0.181836 7.94623 0 6.9825 0ZM6.28698 12.5194C5.596 12.4376 4.95503 12.233 4.36406 11.9057C3.764 11.5875 3.24577 11.1829 2.80937 10.692C2.37296 10.201 2.02747 9.6373 1.7729 9.00088C1.51833 8.36445 1.39104 7.69166 1.39104 6.9825C1.39104 6.7643 1.40468 6.55064 1.43196 6.34153C1.45923 6.13242 1.4956 5.92785 1.54106 5.72783L4.8823 9.08271V9.77823C4.8823 10.1601 5.01867 10.4874 5.29143 10.7601C5.56418 11.0329 5.89603 11.1693 6.28698 11.1693V12.5194ZM11.1011 10.7465C11.0102 10.4647 10.8442 10.2328 10.6033 10.051C10.3624 9.86915 10.0873 9.77823 9.77823 9.77823H9.08271V7.67802C9.08271 7.48709 9.01452 7.32344 8.87814 7.18707C8.74176 7.05069 8.57357 6.9825 8.37355 6.9825H4.18677V5.59146H5.59146C5.78238 5.59146 5.94604 5.52327 6.08241 5.38689C6.21879 5.25051 6.28698 5.08231 6.28698 4.88229V3.49125H7.67802C8.06897 3.49125 8.40082 3.35487 8.67357 3.08212C8.94633 2.80937 9.08271 2.48206 9.08271 2.10021V1.80018C9.59185 2.00929 10.0601 2.28659 10.4874 2.63208C10.9147 2.97756 11.2829 3.37533 11.592 3.82537C11.9012 4.27542 12.1421 4.76865 12.3148 5.30506C12.4876 5.83239 12.574 6.39153 12.574 6.9825C12.574 7.70984 12.4421 8.39627 12.1785 9.04179C11.9148 9.68731 11.5557 10.2555 11.1011 10.7465Z" fill="#1A1A1A" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_559_40062">
                                                        <rect width="13.965" height="13.965" fill="white" transform="matrix(1 0 0 -1 0 13.965)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <div className="flex items-center gap-1 flex-1">
                                                <span className="text-left text-md">{getSelectedTimezoneDisplay()}</span>
                                                <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_559_40065)">
                                                        <path d="M3.99 5.76367L7.98 2.21701H0L3.99 5.76367Z" fill="#1A1A1A" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_559_40065">
                                                            <rect width="7.98" height="7.98" fill="white" transform="matrix(1 0 0 -1 0 7.98047)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </button>
                                        {isTimezoneOpen && typeof window !== 'undefined' && createPortal(
                                            <div
                                                data-timezone-dropdown
                                                className="fixed bg-white border border-[#E4E7EC] rounded-lg shadow-xl z-[9999] max-h-[300px] overflow-hidden flex flex-col"
                                                style={{
                                                    top: `${timezoneDropdownPosition.top}px`,
                                                    left: `${timezoneDropdownPosition.left}px`,
                                                    width: `${timezoneDropdownPosition.width}px`,
                                                    backgroundColor: '#ffffff',
                                                    opacity: 1,
                                                }}
                                            >
                                                <div className="p-2 border-b border-[#E4E7EC] shrink-0 bg-white">
                                                    <input
                                                        ref={searchInputRef}
                                                        type="text"
                                                        placeholder="Search timezone..."
                                                        value={timezoneSearch}
                                                        onChange={(e) => setTimezoneSearch(e.target.value)}
                                                        className="w-full px-3 py-2 text-sm border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent bg-white"
                                                    />
                                                </div>

                                                <div className="overflow-y-auto flex-1 min-h-0 bg-white">
                                                    {filteredTimezones.length > 0 ? (
                                                        filteredTimezones.map((tz) => {
                                                            const zonedTime = toZonedTime(currentTime, tz.iana);
                                                            const timeStr = formatTz(zonedTime, 'h:mma', { timeZone: tz.iana });

                                                            return (
                                                                <button
                                                                    key={tz.iana}
                                                                    onClick={() => {
                                                                        setSelectedTimezone(tz.iana);
                                                                        setIsTimezoneOpen(false);
                                                                        setTimezoneSearch('');
                                                                    }}
                                                                    className={`w-full text-left px-3 py-2 text-sm transition-colors bg-white ${selectedTimezone === tz.iana
                                                                        ? 'bg-[#E9E8FB] text-[#5542F6] font-medium'
                                                                        : 'text-[#24282E] hover:bg-[#F7F8FA]'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="truncate">{tz.displayName}</span>
                                                                        <span className="text-[#727A90] ml-2 shrink-0">{timeStr.toLowerCase()}</span>
                                                                    </div>
                                                                </button>
                                                            );
                                                        })
                                                    ) : (
                                                        <div className="px-3 py-4 text-sm text-[#727A90] text-center bg-white">
                                                            No timezones found
                                                        </div>
                                                    )}
                                                </div>
                                            </div>,
                                            document.body
                                        )}
                                    </div>
                                </div>

                                {/* Date and Time */}
                                <div className="relative z-50">
                                    <div className="flex items-center gap-3">
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.08203 7.43359H4.73047V8.78516H6.08203V7.43359ZM8.78516 7.43359H7.43359V8.78516H8.78516V7.43359ZM11.4883 7.43359H10.1367V8.78516H11.4883V7.43359ZM12.8398 2.70312H12.1641V1.35156H10.8125V2.70312H5.40625V1.35156H4.05469V2.70312H3.37891C2.62879 2.70312 2.0341 3.31133 2.0341 4.05469L2.02734 13.5156C2.02734 14.259 2.62879 14.8672 3.37891 14.8672H12.8398C13.5832 14.8672 14.1914 14.259 14.1914 13.5156V4.05469C14.1914 3.31133 13.5832 2.70312 12.8398 2.70312ZM12.8398 13.5156H3.37891V6.08203H12.8398V13.5156Z" fill="#504F54" />
                                        </svg>

                                        <button
                                            ref={dateButtonRef}
                                            type="button"
                                            onClick={() => {
                                                if (modalRef.current) {
                                                    const modalRect = modalRef.current.getBoundingClientRect();
                                                    const calendarWidth = 320;
                                                    const calendarHeight = 320;
                                                    setDatePickerPosition({
                                                        top: modalRect.top + (modalRect.height / 2) - (calendarHeight / 2),
                                                        left: modalRect.left + (modalRect.width / 2) - (calendarWidth / 2)
                                                    });
                                                }
                                                setIsDatePickerOpen(!isDatePickerOpen);
                                            }}
                                            className="text-sm text-[#24282E] flex items-center gap-1 hover:opacity-80 transition-opacity"
                                        >
                                            <span>{dateTimeDisplay}</span>
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`transition-transform shrink-0 ${isDatePickerOpen ? 'rotate-180' : ''}`}
                                            >
                                                <path d="M5 7.5L10 12.5L15 7.5H5Z" fill="#5542F6" />
                                            </svg>
                                        </button>
                                    </div>
                                    {isDatePickerOpen && (
                                        <div
                                            data-calendar-picker
                                            className="fixed bg-white border border-[#E4E7EC] rounded-lg shadow-lg z-50 w-80 p-4"
                                            style={{
                                                top: `${datePickerPosition.top}px`,
                                                left: `${datePickerPosition.left}px`
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <button
                                                    onClick={goToPreviousMonth}
                                                    className="p-1 hover:bg-[#F7F8FA] rounded transition-colors"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.5 15L7.5 10L12.5 5" stroke="#24282E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                <span className="text-sm font-semibold text-[#24282E]">
                                                    {monthNames[event.date.getMonth()]} {event.date.getFullYear()}
                                                </span>
                                                <button
                                                    onClick={goToNextMonth}
                                                    className="p-1 hover:bg-[#F7F8FA] rounded transition-colors"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.5 15L12.5 10L7.5 5" stroke="#24282E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-7 gap-1 mb-2">
                                                {dayNames.map((day) => (
                                                    <div key={day} className="text-center text-xs font-semibold text-[#727A90] py-1">
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-7 gap-1">
                                                {calendarDays.map((day, index) => {
                                                    if (!day) {
                                                        return <div key={`empty-${index}`} className="aspect-square"></div>;
                                                    }
                                                    const isSelected = format(day, 'yyyy-MM-dd') === format(event.date, 'yyyy-MM-dd');
                                                    const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                                                    return (
                                                        <button
                                                            key={day.toString()}
                                                            onClick={() => handleDateChange(day)}
                                                            className={`aspect-square flex items-center justify-center text-sm rounded transition-colors ${isSelected
                                                                ? 'bg-[#5542F6] text-white font-semibold'
                                                                : isToday
                                                                    ? 'bg-[#E9E8FB] text-[#5542F6] font-semibold'
                                                                    : 'text-[#24282E] hover:bg-[#F7F8FA]'
                                                                }`}
                                                        >
                                                            {day.getDate()}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Form Stage */}
                                <div className="flex items-center gap-3">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 11.332H4V9.9987H12V11.332ZM12 8.66536H4V7.33203H12V8.66536ZM12 5.9987H4V4.66536H12V5.9987ZM2 14.6654L3 13.6654L4 14.6654L5 13.6654L6 14.6654L7 13.6654L8 14.6654L9 13.6654L10 14.6654L11 13.6654L12 14.6654L13 13.6654L14 14.6654V1.33203L13 2.33203L12 1.33203L11 2.33203L10 1.33203L9 2.33203L8 1.33203L7 2.33203L6 1.33203L5 2.33203L4 1.33203L3 2.33203L2 1.33203V14.6654Z" fill="#2E2C34" />
                                    </svg>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-[#24282E]">Form Stage</span>
                                        <span className="px-2 py-1 bg-[#E6F7EB] text-[#14B13B] text-xs font-bold rounded-sm">
                                            Short Form Completed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end px-6 pb-6 shrink-0 gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 border border-[#E4E7EC] text-[#24282E] rounded-sm text-sm font-medium hover:bg-[#F7F8FA] transition-colors"
                        >
                            Lead Details
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 bg-[#5542F6] text-white rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors"
                        >
                            View Meeting Notes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

