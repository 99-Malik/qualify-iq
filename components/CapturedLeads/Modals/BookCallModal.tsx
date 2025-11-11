'use client';

import React, { useState, useEffect, useRef } from 'react';

interface BookCallModalProps {
    isOpen: boolean;
    onClose: () => void;
    leadId?: string;
    leadName?: string;
    companyName?: string;
}

export default function BookCallModal({
    isOpen,
    onClose,
    leadId,
    leadName,
    companyName,
}: BookCallModalProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedTimezone, setSelectedTimezone] = useState('Central European Time (8:11pm)');
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
    const timezoneRef = useRef<HTMLDivElement>(null);

    // Close timezone dropdown when clicking outside
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

    // Get current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get first day of month and number of days
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Adjust first day (0 = Sunday, we want Monday = 0)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Navigate months
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Get month name
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get day names
    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    // Check if date is today
    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    // Check if date is selected
    const isSelected = (day: number) => {
        if (!selectedDate) return false;
        return (
            day === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear()
        );
    };

    // Check if date should have light purple background (available dates)
    // Only show available dates for the current month being viewed
    const isAvailable = (day: number) => {
        const dateToCheck = new Date(currentYear, currentMonth, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Don't show past dates as available
        if (dateToCheck < today) return false;
        
        // Example: dates 23, 25, 26, 29, 30 in current month (for demo purposes)
        // In production, this would check against actual availability from API
        const availableDays = [23, 25, 26, 29, 30];
        return availableDays.includes(day);
    };
    
    // Check if date is in the past
    const isPastDate = (day: number) => {
        const dateToCheck = new Date(currentYear, currentMonth, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return dateToCheck < today;
    };

    // Time slots
    const timeSlots = [
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];

    // Get formatted date for time slot section
    const getFormattedDate = () => {
        if (!selectedDate) {
            // Show a placeholder or current date when no date is selected
            const today = new Date();
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return `Select a date to view available time slots`;
        }
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${days[selectedDate.getDay()]}, ${months[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
    };

    const handleBookCall = () => {
        // Handle booking logic here
        console.log('Booking call for:', { leadId, selectedDate, selectedTime, selectedTimezone });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl my-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-4">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-[#2E2C34] mb-1">
                            Book Call
                        </h2>
                        <p className="text-sm text-[#727A90]">
                            You can set your discovery details here
                        </p>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="ml-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F8FA] transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15M5 5L15 15" stroke="#84818A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                {/* Content - Two Column Layout */}
                <div className="px-6 pb-6 flex gap-6">
                    {/* Left Section: Select a Date & Time */}
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-[#24282E] mb-4">Select a Date & Time</h3>
                        
                        {/* Calendar */}
                        <div className="mb-6">
                            {/* Month Navigation */}
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={goToPreviousMonth}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F8FA] hover:bg-[#E4E7EC] transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 12L6 8L10 4" stroke="#24282E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <span className="text-base font-semibold text-[#24282E]">
                                    {monthNames[currentMonth]} {currentYear}
                                </span>
                                <button
                                    onClick={goToNextMonth}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F7F8FA] hover:bg-[#E4E7EC] transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 4L10 8L6 12" stroke="#24282E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>

                            {/* Days of Week Header */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {dayNames.map((day) => (
                                    <div key={day} className="text-center text-xs font-medium text-[#727A90] py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1">
                                {/* Empty cells for days before month starts */}
                                {Array.from({ length: adjustedFirstDay }).map((_, index) => (
                                    <div key={`empty-${index}`} className="aspect-square"></div>
                                ))}
                                
                                {/* Calendar days */}
                                {Array.from({ length: daysInMonth }).map((_, index) => {
                                    const day = index + 1;
                                    const isDayToday = isToday(day);
                                    const isDaySelected = isSelected(day);
                                    const isDayAvailable = isAvailable(day);
                                    const isDayPast = isPastDate(day);

                                    return (
                                        <button
                                            key={day}
                                            onClick={() => {
                                                if (!isDayPast) {
                                                    setSelectedDate(new Date(currentYear, currentMonth, day));
                                                }
                                            }}
                                            disabled={isDayPast}
                                            className={`aspect-square flex flex-col items-center justify-center rounded-full text-sm font-medium transition-colors relative ${
                                                isDayPast
                                                    ? 'text-[#D0D5DD] cursor-not-allowed'
                                                    : isDaySelected
                                                    ? 'bg-[#5542F6] text-white'
                                                    : isDayAvailable
                                                    ? 'bg-[#E9E8FB] text-[#24282E] hover:bg-[#D0D5DD]'
                                                    : 'text-[#24282E] hover:bg-[#F7F8FA]'
                                            }`}
                                        >
                                            {day}
                                            {isDayToday && !isDaySelected && (
                                                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#727A90]"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Meeting Details */}
                        <div>
                            <h3 className="text-base font-bold text-[#24282E] mb-3">Meeting Details</h3>
                            
                            {/* Timezone Selector */}
                            <div className="mb-3">
                                <div className="relative" ref={timezoneRef}>
                                    <button
                                        onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                                        className="w-full flex items-center gap-2 px-3 py-2.5 border border-[#E4E7EC] rounded-lg text-sm text-[#24282E] hover:border-[#D0D5DD] transition-colors"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#727A90"/>
                                            <path d="M8 4V8L11 10" stroke="#727A90" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                        <span className="flex-1 text-left">{selectedTimezone}</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6L8 10L12 6" stroke="#727A90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    {isTimezoneOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E4E7EC] rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                            <button
                                                onClick={() => {
                                                    setSelectedTimezone('Central European Time (8:11pm)');
                                                    setIsTimezoneOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm text-[#24282E] hover:bg-[#F7F8FA] transition-colors"
                                            >
                                                Central European Time (8:11pm)
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedTimezone('Eastern Time (2:11pm)');
                                                    setIsTimezoneOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm text-[#24282E] hover:bg-[#F7F8FA] transition-colors"
                                            >
                                                Eastern Time (2:11pm)
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Attendee */}
                            <div className="flex items-center gap-2 px-3 py-2.5 border border-[#E4E7EC] rounded-lg">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#727A90"/>
                                    <path d="M8 10C4.68629 10 2 12.2386 2 15H14C14 12.2386 11.3137 10 8 10Z" fill="#727A90"/>
                                </svg>
                                <span className="text-sm text-[#24282E]">Khatchadour Israelyan</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Time Slot */}
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-[#24282E] mb-2">Time Slot</h3>
                        <p className="text-sm text-[#727A90] mb-4">{getFormattedDate()}</p>
                        
                        {/* Time Slots Grid */}
                        {selectedDate ? (
                            <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            selectedTime === time
                                                ? 'bg-[#5542F6] text-white'
                                                : 'bg-white border border-[#E4E7EC] text-[#24282E] hover:border-[#D0D5DD]'
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

                {/* Footer */}
                <div className="flex justify-end px-6 pb-6">
                    <button
                        onClick={handleBookCall}
                        className="px-6 py-2.5 bg-[#5542F6] text-white rounded-sm font-medium text-sm hover:bg-[#4535D6] transition-colors"
                    >
                        Book Call
                    </button>
                </div>
            </div>
        </div>
    );
}
