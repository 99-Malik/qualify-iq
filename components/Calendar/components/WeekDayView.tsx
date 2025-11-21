'use client';

import React from 'react';
import { isSameDay } from 'date-fns';
import { DayInfo, CalendarEvent, ViewMode } from '../types';
import TimeColumn from './TimeColumn';
import DayColumn from './DayColumn';

interface WeekDayViewProps {
    viewMode: ViewMode;
    weekDays: DayInfo[];
    selectedDay: Date | null;
    timeSlots: number[];
    calendarEvents: CalendarEvent[];
    onDaySelect: (day: Date) => void;
    onTimeSlotClick: (date: Date, hour: number) => void;
    onEventClick: (event: CalendarEvent) => void;
    onRescheduleEvent?: (event: CalendarEvent) => void;
    onViewEventDetails?: (event: CalendarEvent) => void;
    onResizeEvent?: (event: CalendarEvent, newEndTime: string) => void;
}

export default function WeekDayView({
    viewMode,
    weekDays,
    selectedDay,
    timeSlots,
    calendarEvents,
    onDaySelect,
    onTimeSlotClick,
    onEventClick,
    onRescheduleEvent,
    onViewEventDetails,
    onResizeEvent,
}: WeekDayViewProps) {
    const getEventsForDate = (date: Date) => {
        return calendarEvents.filter(event => isSameDay(event.date, date));
    };

    return (
        <div className="border border-[#E4E7EC] rounded-lg overflow-hidden">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className={viewMode === 'day' ? 'min-w-[300px]' : 'min-w-max'}>
                    {/* Days Header - Sticky to stay with scroll */}
                    <div 
                        className="grid border-b border-[#E4E7EC] sticky top-0 bg-white z-10" 
                        style={{ 
                            gridTemplateColumns: viewMode === 'day' 
                                ? '60px 1fr' 
                                : `60px ${weekDays.map(() => '1fr').join(' ')}`
                        }}
                    >
                        <div className="p-3 text-center text-sm font-semibold text-[#727A90] border-r border-[#E4E7EC] shrink-0">
                            Time
                        </div>
                        {weekDays.map((day, dayIndex) => {
                            const isSelected = selectedDay && isSameDay(day.date, selectedDay);
                            const isLastDay = dayIndex === weekDays.length - 1;
                            return (
                                <button
                                    key={day.date.toString()}
                                    onClick={() => onDaySelect(day.date)}
                                    className={`p-3 text-center text-sm font-semibold transition-colors min-w-[200px] ${
                                        isLastDay ? '' : 'border-r border-[#E4E7EC]'
                                    } ${
                                        isSelected 
                                            ? 'text-[#5542F6] bg-[#E9E8FB]' 
                                            : 'text-[#24282E] hover:bg-[#F7F8FA]'
                                    }`}
                                >
                                    {day.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Time Slots and Events - Aligned grid with scroll */}
                    <div 
                        className="relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
                        style={{ 
                            height: viewMode === 'day' ? '800px' : '600px', 
                            maxHeight: viewMode === 'day' ? '800px' : '600px' 
                        }}
                    >
                        <div 
                            className="grid" 
                            style={{ 
                                gridTemplateColumns: viewMode === 'day' 
                                    ? '60px 1fr' 
                                    : `60px ${weekDays.map(() => '1fr').join(' ')}`, 
                                height: '2400px',
                                boxSizing: 'border-box'
                            }}
                        >
                            <TimeColumn timeSlots={timeSlots} />
                            {/* Day columns */}
                            {weekDays.map((day, dayIndex) => {
                                const isLastDay = dayIndex === weekDays.length - 1;
                                const dayEvents = getEventsForDate(day.date);
                                return (
                                    <DayColumn
                                        key={day.date.toString()}
                                        day={day}
                                        isLastDay={isLastDay}
                                        timeSlots={timeSlots}
                                        events={dayEvents}
                                        onTimeSlotClick={onTimeSlotClick}
                                        onEventClick={onEventClick}
                                        onRescheduleEvent={onRescheduleEvent}
                                        onViewEventDetails={onViewEventDetails}
                                        onResizeEvent={onResizeEvent}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

