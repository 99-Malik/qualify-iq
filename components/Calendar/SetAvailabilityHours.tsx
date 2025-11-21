'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/components/OutboundLeads/Modal/ApplyFilterModal/components/Dropdown';

interface TimeSlot {
    startTime: string;
    endTime: string;
}

interface DaySchedule {
    day: string;
    enabled: boolean;
    timeSlots: TimeSlot[];
}

export default function SetAvailabilityHours() {
    const router = useRouter();

    // Generate time options (12-hour format with AM/PM)
    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time24 = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                const ampm = hour < 12 ? 'AM' : 'PM';
                const time12 = `${hour12}:${String(minute).padStart(2, '0')} ${ampm}`;
                options.push({ value: time24, label: time12 });
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions();

    const [days, setDays] = useState<DaySchedule[]>([
        { day: 'Monday', enabled: true, timeSlots: [{ startTime: '09:00', endTime: '09:00' }] },
        { day: 'Tuesday', enabled: false, timeSlots: [] },
        { day: 'Wednesday', enabled: false, timeSlots: [] },
        { day: 'Thursday', enabled: false, timeSlots: [] },
        { day: 'Friday', enabled: false, timeSlots: [] },
        { day: 'Saturday', enabled: false, timeSlots: [] },
        { day: 'Sunday', enabled: false, timeSlots: [] },
    ]);

    const addTimeSlot = (dayIndex: number) => {
        const updatedDays = [...days];
        updatedDays[dayIndex].enabled = true;
        updatedDays[dayIndex].timeSlots.push({ startTime: '09:00', endTime: '17:00' });
        setDays(updatedDays);
    };

    const updateTimeSlot = (dayIndex: number, slotIndex: number, field: 'startTime' | 'endTime', value: string) => {
        const updatedDays = [...days];
        updatedDays[dayIndex].timeSlots[slotIndex][field] = value;
        setDays(updatedDays);
    };

    const deleteTimeSlot = (dayIndex: number, slotIndex: number) => {
        const updatedDays = [...days];
        updatedDays[dayIndex].timeSlots.splice(slotIndex, 1);
        if (updatedDays[dayIndex].timeSlots.length === 0) {
            updatedDays[dayIndex].enabled = false;
        }
        setDays(updatedDays);
    };

    return (
        <div className="w-full">
            {/* Breadcrumb */}
            <div className="mb-2">
                <span className="text-sm text-[#727A90]">Home / Calendar</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-lg lg:text-xl font-bold text-[#24282E] mb-4">Calendar</h1>

            {/* Divider */}
            <div className="w-full h-px bg-[#EBEAED] mb-4"></div>

            {/* Back Button */}
            <button
                onClick={() => router.push('/calendar')}
                className="flex items-center gap-2 text-[#24282E] font-bold hover:text-[#5542F6] transition-colors mb-6"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                </svg>
                <span>Set Weekly Availability</span>
            </button>

            {/* Days List */}
            <div className='w-full h-fit border border-[#E4E7EC] rounded-lg bg-white p-4 '>
                <div className="space-y-2 mb-6">
                    {days.map((day, dayIndex) => (
                        <div
                            key={day.day}
                            className={`flex items-center gap-3 rounded-sm px-4 py-5 border border-[#E4E7EC] relative ${day.enabled ? 'bg-[#E9E8FB]' : 'bg-[#FBFAFC]'
                                }`}
                        >
                            {/* Day Name */}
                            <span
                                className={`text-sm font-bold w-24 shrink-0 ${day.enabled ? 'text-[#5542F6]' : 'text-[#24282E]'
                                    }`}
                            >
                                {day.day}
                            </span>

                            {day.enabled && day.timeSlots.length > 0 ? (
                                <>
                                    {/* Spacer between day name and time slots */}
                                    <div className="w-4"></div>

                                    {/* Scrollable Time Slots Container - Takes full space on large screens */}
                                    <div className="flex-1 overflow-x-auto scroll-hidden">
                                        <div className="flex items-center gap-3 min-w-max">
                                            {day.timeSlots.map((slot, slotIndex) => (
                                                <React.Fragment key={slotIndex}>
                                                    {/* Clock Icon */}
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="shrink-0"
                                                    >
                                                        <path
                                                            d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z"
                                                            fill="#24282E"
                                                        />
                                                        <path
                                                            d="M8 4V8L11 10"
                                                            stroke="#24282E"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    {/* Start Time Dropdown */}
                                                    <div className="flex-1 min-w-[120px]">
                                                        <Dropdown
                                                            value={slot.startTime}
                                                            onChange={(value) => updateTimeSlot(dayIndex, slotIndex, 'startTime', value)}
                                                            options={timeOptions}
                                                            placeholder="Start time"
                                                            buttonClassName="w-full px-3 py-2 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white hover:border-[#D1CEFF] transition-colors"
                                                            bg="white"
                                                        />
                                                    </div>

                                                    {/* Dash */}
                                                    <span className="text-sm text-[#24282E] shrink-0">-</span>

                                                    {/* End Time Dropdown */}
                                                    <div className="flex-1 min-w-[120px]">
                                                        <Dropdown
                                                            value={slot.endTime}
                                                            onChange={(value) => updateTimeSlot(dayIndex, slotIndex, 'endTime', value)}
                                                            options={timeOptions}
                                                            placeholder="End time"
                                                            buttonClassName="w-full px-3 py-2 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white hover:border-[#D1CEFF] transition-colors"
                                                            bg="white"
                                                        />
                                                    </div>

                                                    {/* Edit Button */}
                                                    <button
                                                        className="w-8 h-8 rounded bg-white border border-[#E4E7EC] flex items-center justify-center hover:bg-[#F7F8FA] transition-colors shrink-0"
                                                        title="Edit"
                                                    >
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.75 2.25023C12.947 2.05324 13.1808 1.89699 13.4382 1.79038C13.6956 1.68378 13.9714 1.62891 14.25 1.62891C14.5286 1.62891 14.8044 1.68378 15.0618 1.79038C15.3192 1.89699 15.553 2.05324 15.75 2.25023C15.947 2.44721 16.1032 2.68106 16.2098 2.93843C16.3165 3.1958 16.3713 3.47165 16.3713 3.75023C16.3713 4.0288 16.3165 4.30465 16.2098 4.56202C16.1032 4.81939 15.947 5.05324 15.75 5.25023L5.625 15.3752L1.5 16.5002L2.625 12.3752L12.75 2.25023Z" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => deleteTimeSlot(dayIndex, slotIndex)}
                                                        className="w-8 h-8 rounded bg-white border border-[#E4E7EC] flex items-center justify-center hover:bg-[#F7F8FA] transition-colors shrink-0"
                                                        title="Delete"
                                                    >
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.25 4.5H3.75M3.75 4.5H15.75M3.75 4.5V15C3.75 15.3978 3.90804 15.7794 4.18934 16.0607C4.47064 16.342 4.85218 16.5 5.25 16.5H12.75C13.1478 16.5 13.5294 16.342 13.8107 16.0607C14.092 15.7794 14.25 15.3978 14.25 15V4.5M6 4.5V3C6 2.60218 6.15804 2.22064 6.43934 1.93934C6.72064 1.65804 7.10218 1.5 7.5 1.5H10.5C10.8978 1.5 11.2794 1.65804 11.5607 1.93934C11.842 2.22064 12 2.60218 12 3V4.5M7.5 8.25V12.75M10.5 8.25V12.75" stroke="#FC3400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Add Button - Very little space from delete button */}
                                    <button
                                        onClick={() => addTimeSlot(dayIndex)}
                                        className="px-3 py-1.5 bg-[#E9E8FB] border border-[#D1CEFF] rounded text-sm font-medium text-[#5542F6] hover:bg-[#D1CEFF] transition-colors flex items-center gap-1 shrink-0 ml-0.5"
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7 3V11M3 7H11"
                                                stroke="#5542F6"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span>Add</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Spacer to push Unavailable to center */}
                                    <div className="flex-1"></div>

                                    {/* Unavailable Text - Centered */}
                                    <span className="text-sm text-black">Unavailable</span>

                                    {/* Spacer to push Add button to right */}
                                    <div className="flex-1"></div>

                                    {/* Add Button - Far Right */}
                                    <button
                                        onClick={() => addTimeSlot(dayIndex)}
                                        className="px-3 py-1.5 bg-[#E9E8FB] border border-[#D1CEFF] rounded text-sm font-medium text-[#5542F6] hover:bg-[#D1CEFF] transition-colors flex items-center gap-1 shrink-0"
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7 3V11M3 7H11"
                                                stroke="#5542F6"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span>Add</span>
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Save Button */}
                <div className="mt-6 ">
                    <button className="px-4 py-2.5 bg-[#5542F6] text-xs font-medium text-white rounded-sm hover:bg-[#4535D6] transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
