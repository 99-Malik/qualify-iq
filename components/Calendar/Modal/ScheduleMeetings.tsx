'use client';

import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Dropdown } from '@/components/OutboundLeads/Modal/ApplyFilterModal/components/Dropdown';

interface ScheduleMeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSchedule: (meeting: {
        title: string;
        client: string;
        date: Date;
        time: string;
        endTime: string;
    }) => void;
    initialDate?: Date;
    initialTime?: string;
}

export default function ScheduleMeetingModal({
    isOpen,
    onClose,
    onSchedule,
    initialDate,
    initialTime,
}: ScheduleMeetingModalProps) {
    const [title, setTitle] = useState('Booking Discussion');
    const [client, setClient] = useState('Henry Stephen');
    const [date, setDate] = useState<Date>(initialDate || new Date());
    const [time, setTime] = useState(initialTime || '15:00');
    const [endTime, setEndTime] = useState(() => {
        // Default to 1 hour after start time
        if (initialTime) {
            const [hours, minutes] = initialTime.split(':').map(Number);
            const nextHour = (hours + 1) % 24;
            return `${nextHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
        return '16:00';
    });

    // Update date and time when initialDate or initialTime changes
    useEffect(() => {
        if (initialDate) {
            setDate(initialDate);
        }
        if (initialTime) {
            setTime(initialTime);
            const [hours, minutes] = initialTime.split(':').map(Number);
            const nextHour = (hours + 1) % 24;
            setEndTime(`${nextHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
        }
    }, [initialDate, initialTime]);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [datePickerPosition, setDatePickerPosition] = useState({ top: 0, left: 0 });
    const modalRef = useRef<HTMLDivElement>(null);
    const dateButtonRef = useRef<HTMLButtonElement>(null);

    const clients = [
        { value: 'Henry Stephen', label: 'Henry Stephen' },
        { value: 'John Andrew', label: 'John Andrew' },
        { value: 'Jane Smith', label: 'Jane Smith' },
        { value: 'Mike Johnson', label: 'Mike Johnson' },
    ];

    const timeSlots = Array.from({ length: 24 }, (_, i) => {
        const hour = i;
        const period = hour >= 12 ? 'pm' : 'am';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return {
            value: `${hour.toString().padStart(2, '0')}:00`,
            label: `${displayHour}:00 ${period}`,
        };
    });

    useEffect(() => {
        if (initialDate) {
            setDate(initialDate);
        }
        if (initialTime) {
            setTime(initialTime);
            // Update endTime to be 1 hour after start time
            const [hours, minutes] = initialTime.split(':').map(Number);
            const nextHour = (hours + 1) % 24;
            setEndTime(`${nextHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
        }
    }, [initialDate, initialTime]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            // Check if click is outside the date button and calendar picker
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

    const handleSchedule = () => {
        onSchedule({
            title,
            client,
            date,
            time,
            endTime,
        });
        // Reset form
        setTitle('Booking Discussion');
        setClient('Henry Stephen');
        setDate(new Date());
        setTime('15:00');
        const [hours, minutes] = '15:00'.split(':').map(Number);
        const nextHour = (hours + 1) % 24;
        setEndTime(`${nextHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
        onClose();
    };

    const handleDateChange = (selectedDate: Date) => {
        setDate(selectedDate);
        setIsDatePickerOpen(false);
    };

    // Generate calendar days for date picker
    const getCalendarDays = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        // Empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        // Days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const calendarDays = getCalendarDays();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const goToPreviousMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()} style={{ overflow: 'visible' }} ref={modalRef}>
                <div className="relative bg-white rounded-lg shadow-xl flex flex-col max-h-full" style={{ overflow: 'visible' }}>
                    {/* Header */}
                    <div className="flex items-start justify-between px-6 pt-6 pb-4 shrink-0">
                        <div>
                            <h2 className="text-2xl font-bold text-[#24282E] mb-1">Schedule Meeting</h2>
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

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1 scroll-hidden" style={{ overflowX: 'visible' }}>
                        <div className="px-6 pb-6 space-y-4" style={{ position: 'relative', overflow: 'visible' }}>
                            {/* Title Field */}
                            <div>
                                <label className="block text-sm font-medium text-[#24282E] mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] placeholder-[#727A90] focus:outline-none focus:border-[#5542F6] transition-colors"
                                    placeholder="Enter meeting title"
                                />
                            </div>

                            {/* Client Field */}
                            <div>
                                <label className="block text-sm font-medium text-[#24282E] mb-2">
                                    Client
                                </label>
                                <Dropdown
                                    value={client}
                                    onChange={(value) => setClient(value)}
                                    options={clients}
                                    placeholder="Select client"
                                    buttonClassName="w-full px-4 py-2.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white hover:border-[#D1CEFF] transition-colors"
                                    openUpward={true}
                                />
                            </div>

                            {/* Date Field */}
                            <div className="relative z-50">
                                <label className="block text-sm font-medium text-[#24282E] mb-2">
                                    Date
                                </label>
                                <button
                                    ref={dateButtonRef}
                                    type="button"
                                    onClick={() => {
                                        // Center the calendar in the modal viewport
                                        if (modalRef.current) {
                                            const modalRect = modalRef.current.getBoundingClientRect();
                                            const calendarWidth = 320; // w-80 = 320px
                                            const calendarHeight = 320; // Approximate height
                                            setDatePickerPosition({
                                                top: modalRect.top + (modalRect.height / 2) - (calendarHeight / 2),
                                                left: modalRect.left + (modalRect.width / 2) - (calendarWidth / 2)
                                            });
                                        }
                                        setIsDatePickerOpen(!isDatePickerOpen);
                                    }}
                                    className="w-full px-4 py-2.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white flex items-center justify-between hover:border-[#D1CEFF] transition-colors"
                                >
                                    <span>{format(date, 'MM/dd/yyyy')}</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 5V15C2.5 15.9205 3.24619 16.6667 4.16667 16.6667H15.8333C16.7538 16.6667 17.5 15.9205 17.5 15V5C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" stroke="#24282E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M13.3333 2.5V4.16667" stroke="#24282E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6.66667 2.5V4.16667" stroke="#24282E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2.5 7.5H17.5" stroke="#24282E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                {isDatePickerOpen && (
                                    <div 
                                        data-calendar-picker
                                        className="fixed bg-white border border-[#E4E7EC] rounded-lg shadow-lg z-50 w-80 p-4" 
                                        style={{ 
                                            top: `${datePickerPosition.top}px`,
                                            left: `${datePickerPosition.left}px`
                                        }}
                                    >
                                        {/* Calendar Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <button
                                                onClick={goToPreviousMonth}
                                                className="p-1 hover:bg-[#F7F8FA] rounded transition-colors"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.5 15L7.5 10L12.5 5" stroke="#24282E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                            <span className="text-sm font-semibold text-[#24282E]">
                                                {monthNames[date.getMonth()]} {date.getFullYear()}
                                            </span>
                                            <button
                                                onClick={goToNextMonth}
                                                className="p-1 hover:bg-[#F7F8FA] rounded transition-colors"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="#24282E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                        {/* Day Names */}
                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {dayNames.map((day) => (
                                                <div key={day} className="text-center text-xs font-semibold text-[#727A90] py-1">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>
                                        {/* Calendar Days */}
                                        <div className="grid grid-cols-7 gap-1">
                                            {calendarDays.map((day, index) => {
                                                if (!day) {
                                                    return <div key={`empty-${index}`} className="aspect-square"></div>;
                                                }
                                                const isSelected = format(day, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                                                const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                                                return (
                                                    <button
                                                        key={day.toString()}
                                                        onClick={() => handleDateChange(day)}
                                                        className={`aspect-square flex items-center justify-center text-sm rounded transition-colors ${
                                                            isSelected
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

                            {/* Time Field */}
                            <div>
                                <label className="block text-sm font-medium text-[#24282E] mb-2">
                                    Start Time
                                </label>
                                <Dropdown
                                    value={time}
                                    onChange={(value) => {
                                        setTime(value);
                                        // Auto-update endTime to be 1 hour after start time
                                        const [hours, minutes] = value.split(':').map(Number);
                                        const nextHour = (hours + 1) % 24;
                                        setEndTime(`${nextHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
                                    }}
                                    options={timeSlots}
                                    placeholder="Select start time"
                                    buttonClassName="w-full px-4 py-2.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white hover:border-[#D1CEFF] transition-colors"
                                    openUpward={true}
                                />
                            </div>

                            {/* End Time Field */}
                            <div>
                                <label className="block text-sm font-medium text-[#24282E] mb-2">
                                    End Time
                                </label>
                                <Dropdown
                                    value={endTime}
                                    onChange={(value) => setEndTime(value)}
                                    options={timeSlots.filter(slot => {
                                        // Only show end times that are after start time
                                        const [startHours, startMinutes] = time.split(':').map(Number);
                                        const [slotHours, slotMinutes] = slot.value.split(':').map(Number);
                                        const startTotal = startHours * 60 + startMinutes;
                                        const slotTotal = slotHours * 60 + slotMinutes;
                                        return slotTotal > startTotal;
                                    })}
                                    placeholder="Select end time"
                                    buttonClassName="w-full px-4 py-2.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white hover:border-[#D1CEFF] transition-colors"
                                    openUpward={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end px-6 pb-6 shrink-0">
                        <button
                            onClick={handleSchedule}
                            className="px-6 py-2.5 bg-[#5542F6] text-white rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors"
                        >
                            Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

