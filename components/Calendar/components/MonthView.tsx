'use client';

import React from 'react';
import { isSameDay, isToday } from 'date-fns';
import { DayInfo, CalendarEvent } from '../types';

interface MonthViewProps {
    weekDays: DayInfo[];
    selectedDay: Date | null;
    calendarEvents: CalendarEvent[];
    onDayClick: (day: Date, events: CalendarEvent[]) => void;
    onEventClick: (event: CalendarEvent) => void;
}

export default function MonthView({
    weekDays,
    selectedDay,
    calendarEvents,
    onDayClick,
    onEventClick,
}: MonthViewProps) {
    const getEventsForDate = (date: Date) => {
        return calendarEvents.filter(event => isSameDay(event.date, date));
    };

    return (
        <div className="border border-[#E4E7EC] rounded-lg overflow-hidden">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="min-w-[700px]">
                    {/* Week day headers */}
                    <div className="grid grid-cols-7 border-b border-[#E4E7EC]">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, index) => {
                            const isLast = index === 6; // Last column (Sat)
                            return (
                                <div key={dayName} className={`p-3 text-center text-sm font-semibold text-[#727A90] min-w-[100px] ${
                                    isLast ? '' : 'border-r border-[#E4E7EC]'
                                }`}>
                                    {dayName}
                                </div>
                            );
                        })}
                    </div>
                    {/* Month grid */}
                    <div className="grid grid-cols-7">
                        {weekDays.map((day, index) => {
                            const isSelected = selectedDay && isSameDay(day.date, selectedDay);
                            const isTodayDate = isToday(day.date);
                            const dayEvents = getEventsForDate(day.date);
                            const isCurrentMonth = day.isCurrentMonth ?? true;
                            const isLastColumn = (index + 1) % 7 === 0;
                            
                            return (
                                <div
                                    key={day.date.toString()}
                                    className={`min-h-[100px] border-b border-[#E4E7EC] p-2 cursor-pointer transition-colors min-w-[100px] ${
                                        isLastColumn ? '' : 'border-r border-[#E4E7EC]'
                                    } ${
                                        !isCurrentMonth ? 'bg-[#F7F8FA] text-[#A0AEC0]' : 'bg-white'
                                    } ${
                                        isSelected ? 'bg-[#E9E8FB]' : 'hover:bg-[#F7F8FA]'
                                    }`}
                                    onClick={() => onDayClick(day.date, dayEvents)}
                                >
                                    <div className={`text-xs font-semibold mb-1 ${
                                        isTodayDate ? 'text-[#5542F6]' : isCurrentMonth ? 'text-[#24282E]' : 'text-[#A0AEC0]'
                                    }`}>
                                        {day.dayOfMonth}
                                    </div>
                                    <div className="space-y-1">
                                        {dayEvents.slice(0, 3).map((event) => (
                                            <div
                                                key={event.id}
                                                className="text-xs p-1 rounded-sm bg-[#E6F7EB] border-l-2 border-[#14B13B] truncate cursor-pointer hover:shadow-sm transition-shadow"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEventClick(event);
                                                }}
                                            >
                                                <span className="font-medium text-[#24282E]">{event.time}</span> {event.title}
                                            </div>
                                        ))}
                                        {dayEvents.length > 3 && (
                                            <div className="text-xs text-[#727A90] font-medium">
                                                +{dayEvents.length - 3} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

