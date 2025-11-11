'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    startOfMonth,
    getDaysInMonth,
    getDay,
    format,
    isToday,
    isPast,
    isSameDay,
    startOfDay,
    addMonths,
    subMonths
} from 'date-fns';
import { toZonedTime, format as formatTz } from 'date-fns-tz';

interface BookCallModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBooked?: (data: { selectedDate: Date | null; selectedTime: string; selectedTimezone: string }) => void;
    leadId?: string;
    leadName?: string;
    companyName?: string;
}

interface TimezoneOption {
    iana: string;
    displayName: string;
    currentTime: string;
}

export default function BookCallModal({
    isOpen,
    onClose,
    onBooked,
    leadId,
    leadName,
    companyName,
}: BookCallModalProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedTimezone, setSelectedTimezone] = useState<string>(() => {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch {
            return 'UTC';
        }
    });
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
    const [timezoneSearch, setTimezoneSearch] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
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
        const handleClickOutside = (event: MouseEvent) => {
            if (timezoneRef.current && !timezoneRef.current.contains(event.target as Node)) {
                setIsTimezoneOpen(false);
            }
        };

        if (isTimezoneOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isTimezoneOpen]);

    const monthStart = startOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getDay(monthStart);
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const goToPreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const getDayNames = (): string[] => {
        const days = [];
        const baseDate = new Date(2024, 0, 1);

        for (let i = 0; i < 7; i++) {
            const dayDate = new Date(baseDate);
            dayDate.setDate(baseDate.getDate() + i);
            const dayName = format(dayDate, 'EEE').toUpperCase();
            days.push(dayName);
        }
        return days;
    };

    const dayNames = useMemo(() => getDayNames(), []);

    const isDateToday = (date: Date) => {
        return isToday(date);
    };

    const isDateSelected = (date: Date) => {
        if (!selectedDate) return false;
        return isSameDay(date, selectedDate);
    };

    const getDateAvailability = (date: Date): 'available' | 'fully-booked' | 'unavailable' => {
        const today = startOfDay(new Date());
        const dateToCheck = startOfDay(date);

        if (isPast(dateToCheck) && !isSameDay(dateToCheck, today)) {
            return 'unavailable';
        }

        const dayOfWeek = getDay(date);
        const dayOfMonth = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return 'unavailable';
        }

        const dateHash = year * 10000 + month * 100 + dayOfMonth;
        const pattern = dateHash % 7;

        if (pattern >= 5) {
            return 'fully-booked';
        }

        const lastDigit = dayOfMonth % 10;
        if (lastDigit === 1 || lastDigit === 3 || lastDigit === 7) {
            return 'available';
        }

        return 'available';
    };

    const isDateAvailable = (date: Date) => {
        return getDateAvailability(date) === 'available';
    };

    const isDateFullyBooked = (date: Date) => {
        return getDateAvailability(date) === 'fully-booked';
    };

    const isDatePast = (date: Date) => {
        const today = startOfDay(new Date());
        const dateToCheck = startOfDay(date);
        return isPast(dateToCheck) && !isSameDay(dateToCheck, today);
    };

    const generateTimeSlots = (): string[] => {
        const slots: string[] = [];
        const startHour = 12;
        const endHour = 18;
        const intervalMinutes = 30;

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += intervalMinutes) {
                const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                slots.push(timeString);
            }
        }

        return slots;
    };

    const timeSlots = useMemo(() => generateTimeSlots(), []);

    const getFormattedDate = () => {
        if (!selectedDate) {
            return `Select a date to view available time slots`;
        }
        return format(selectedDate, 'EEEE, MMMM d');
    };

    const handleBookCall = () => {
        if (!selectedTime) {
            return;
        }
        console.log('Booking call for:', { leadId, selectedDate, selectedTime, selectedTimezone });
        if (onBooked) {
            onBooked({ selectedDate, selectedTime, selectedTimezone });
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl my-auto overflow-visible" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-start justify-between p-6 pb-4">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-[#2E2C34] mb-1">
                            Book Call
                        </h2>
                        <p className="text-md text-[#727A90] mb-3">
                            You can set your discovery details here
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4  flex items-center justify-center  transition-colors"
                    >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.0007 2.33398C7.54898 2.33398 2.33398 7.54898 2.33398 14.0007C2.33398 20.4523 7.54898 25.6673 14.0007 25.6673C20.4523 25.6673 25.6673 20.4523 25.6673 14.0007C25.6673 7.54898 20.4523 2.33398 14.0007 2.33398ZM19.834 18.189L18.189 19.834L14.0007 15.6457L9.81232 19.834L8.16732 18.189L12.3557 14.0007L8.16732 9.81232L9.81232 8.16732L14.0007 12.3557L18.189 8.16732L19.834 9.81232L15.6457 14.0007L19.834 18.189Z" fill="#504F54" />
                        </svg>

                    </button>
                </div>

                <div className="px-6 pb-6">
                    <div className="border border-[#E4E7EC] rounded-lg p-6 flex relative">
                        <div className="w-[60%] pr-6">
                            <h3 className="text-xl font-bold text-[#2E2C34] mb-4">Select a Date & Time</h3>

                            <div className="mb-6 pl-4">
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={goToPreviousMonth}
                                        className="w-12 h-12 flex items-center justify-center "
                                    >
                                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M22.4235 24.9322C22.7818 24.5919 22.7818 24.0402 22.4235 23.6998L17.426 18.9531L22.4235 14.2064C22.7818 13.8661 22.7818 13.3143 22.4235 12.974C22.0652 12.6337 21.4842 12.6337 21.1259 12.974L15.4797 18.3369C15.1214 18.6772 15.1214 19.229 15.4797 19.5694L21.1259 24.9322C21.4842 25.2726 22.0652 25.2726 22.4235 24.9322Z" fill="#1A1A1A" fillOpacity="0.61" />
                                        </svg>

                                    </button>
                                    <span className="text-md font-medium text-[#1A1A1A]">
                                        {format(currentDate, 'MMMM yyyy')}
                                    </span>
                                    <button
                                        onClick={goToNextMonth}
                                        className="w-12 h-12 flex items-center justify-center  transition-colors"
                                    >
                                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="37.905" height="37.905" rx="18.9525" fill="#5542F6" fillOpacity="0.08" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.4806 24.9322C15.1223 24.5919 15.1223 24.0402 15.4806 23.6998L20.4781 18.9531L15.4806 14.2064C15.1223 13.8661 15.1223 13.3143 15.4806 12.974C15.839 12.6337 16.4199 12.6337 16.7782 12.974L22.4244 18.3369C22.7827 18.6772 22.7827 19.229 22.4244 19.5694L16.7782 24.9322C16.4199 25.2726 15.839 25.2726 15.4806 24.9322Z" fill="#5542F6" />
                                        </svg>

                                    </button>
                                </div>

                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {dayNames.map((day) => (
                                        <div key={day} className="text-center text-xs font-medium text-[#1A1A1A] py-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-1">
                                    {Array.from({ length: adjustedFirstDay }).map((_, index) => (
                                        <div key={`empty-${index}`} className="aspect-square"></div>
                                    ))}

                                    {Array.from({ length: daysInMonth }).map((_, index) => {
                                        const day = index + 1;
                                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                        const isDayToday = isDateToday(date);
                                        const isDaySelected = isDateSelected(date);
                                        const isDayAvailable = isDateAvailable(date);
                                        const isDayFullyBooked = isDateFullyBooked(date);
                                        const isDayPast = isDatePast(date);

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => {
                                                    if (!isDayPast) {
                                                        setSelectedDate(date);
                                                    }
                                                }}
                                                disabled={isDayPast}
                                                className={`aspect-square flex flex-col items-center justify-center rounded-full transition-colors relative ${isDayPast
                                                    ? 'text-[#D0D5DD] cursor-not-allowed'
                                                    : isDaySelected
                                                        ? 'bg-[#5542F6] text-white font-semibold text-md'
                                                        : isDayAvailable
                                                            ? 'bg-[#E9E8FB] text-[#5542F6] font-semibold text-md hover:bg-[#D0D5DD] cursor-pointer'
                                                            : 'text-[#737373]  text-md hover:bg-[#F7F8FA] cursor-pointer'
                                                    }`}

                                            >
                                                {day}
                                                {isDayFullyBooked && !isDaySelected && (
                                                    <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#727A90]"></div>
                                                )}
                                                {isDayToday && !isDaySelected && !isDayFullyBooked && (
                                                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#727A90]"></div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-[#24282E] mb-3">Meeting Details</h3>

                                <div>
                                    <div className="relative" ref={timezoneRef}>
                                        <button
                                            onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                                            className="w-full flex items-center gap-2  py-2.5  text-[0.873rem] text-[#84818A] "
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
                                        {isTimezoneOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E4E7EC] rounded-lg shadow-lg z-50 max-h-[180px] overflow-hidden flex flex-col">
                                                <div className="p-2 border-b border-[#E4E7EC] shrink-0">
                                                    <input
                                                        ref={searchInputRef}
                                                        type="text"
                                                        placeholder="Search timezone..."
                                                        value={timezoneSearch}
                                                        onChange={(e) => setTimezoneSearch(e.target.value)}
                                                        className="w-full px-3 py-2 text-sm border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                                                    />
                                                </div>

                                                <div className="overflow-y-auto flex-1 min-h-0">
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
                                                                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${selectedTimezone === tz.iana
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
                                                        <div className="px-3 py-4 text-sm text-[#727A90] text-center">
                                                            No timezones found
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2  py-2.5">
                                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_559_40068)">
                                            <path d="M3.85019 3.84922C3.85019 4.26288 3.93167 4.6725 4.08997 5.05467C4.24828 5.43685 4.4803 5.7841 4.77281 6.07661C5.06531 6.36911 5.41257 6.60114 5.79474 6.75944C6.17692 6.91774 6.58653 6.99922 7.00019 6.99922C7.41386 6.99922 7.82347 6.91774 8.20565 6.75944C8.58782 6.60114 8.93508 6.36911 9.22758 6.07661C9.52008 5.7841 9.75211 5.43685 9.91042 5.05467C10.0687 4.6725 10.1502 4.26288 10.1502 3.84922C10.1502 3.43556 10.0687 3.02594 9.91042 2.64377C9.75211 2.26159 9.52008 1.91434 9.22758 1.62183C8.93508 1.32933 8.58782 1.0973 8.20565 0.938998C7.82347 0.780696 7.41386 0.699219 7.00019 0.699219C6.58653 0.699219 6.17692 0.780696 5.79474 0.938998C5.41257 1.0973 5.06531 1.32933 4.77281 1.62183C4.4803 1.91434 4.24828 2.26159 4.08997 2.64377C3.93167 3.02594 3.85019 3.43556 3.85019 3.84922ZM12.9418 13.2992C12.5083 12.0696 11.704 11.0048 10.6398 10.2516C9.57564 9.49833 8.30398 9.09383 7.00019 9.09383C5.69641 9.09383 4.42475 9.49833 3.36055 10.2516C2.29636 11.0048 1.49207 12.0696 1.05859 13.2992H12.9418Z" stroke="#2E2C34" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_559_40068">
                                                <rect width="14" height="14" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className="text-[0.873rem] text-[#84818A]">Khatchadour Israelyan</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute left-[60%] top-0 bottom-0 w-px bg-[#E4E7EC]"></div>

                        <div className="w-[40%] pl-6">
                            <h3 className="text-md font-bold text-[#24282E] mb-2">Time Slot</h3>
                            <p className="text-sm text-[#727A90] mb-4">{getFormattedDate()}</p>

                            {selectedDate ? (
                                <div className="flex flex-col gap-2">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`px-4 py-2.5 rounded-sm transition-colors ${selectedTime === time
                                                ? 'bg-[#5542F6] text-white font-extrabold text-sm'
                                                : 'bg-white border border-[#E4E7EC] text-[#24282E] font-extrabold text-sm hover:border-[#D0D5DD]'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-sm text-[#727A90]">Please select a date to view available time slots</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end px-6 pb-6">
                    <button
                        onClick={handleBookCall}
                        disabled={!selectedTime}
                        className={`px-6 py-2.5 rounded-sm font-medium text-sm transition-colors ${selectedTime
                                ? 'bg-[#5542F6] text-white hover:bg-[#4535D6] cursor-pointer'
                                : 'bg-[#E4E7EC] text-[#727A90] cursor-not-allowed'
                            }`}
                    >
                        Book Call
                    </button>
                </div>
            </div>
        </div>
    );
}
