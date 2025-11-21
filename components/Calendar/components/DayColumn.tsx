'use client';

import React from 'react';
import { DayInfo, CalendarEvent } from '../types';
import { getEventPosition } from '../utils/calendarUtils';
import EventCard from './EventCard';

interface DayColumnProps {
    day: DayInfo;
    isLastDay: boolean;
    timeSlots: number[];
    events: CalendarEvent[];
    onTimeSlotClick: (date: Date, hour: number) => void;
    onEventClick: (event: CalendarEvent) => void;
    onRescheduleEvent?: (event: CalendarEvent) => void;
    onViewEventDetails?: (event: CalendarEvent) => void;
    onResizeEvent?: (event: CalendarEvent, newEndTime: string) => void;
}

export default function DayColumn({
    day,
    isLastDay,
    timeSlots,
    events,
    onTimeSlotClick,
    onEventClick,
    onRescheduleEvent,
    onViewEventDetails,
    onResizeEvent,
}: DayColumnProps) {
    return (
        <div 
            data-day-column
            className={`relative min-w-[200px] ${
                isLastDay ? '' : 'border-r border-[#E4E7EC]'
            }`}
            style={{
                boxSizing: 'border-box',
                margin: 0,
                padding: 0
            }}
        >
            {timeSlots.map((hour, index) => {
                const isLast = index === timeSlots.length - 1;
                return (
                    <div 
                        key={`${day.date.toString()}-${hour}`} 
                        className={`h-[180px] cursor-pointer hover:bg-[#F7F8FA] transition-colors ${
                            !isLast ? 'border-b border-[#E4E7EC]' : ''
                        }`}
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            margin: 0,
                            padding: 0,
                            display: 'block'
                        }}
                        onClick={() => onTimeSlotClick(day.date, hour)}
                    ></div>
                );
            })}
            {/* Events for this day */}
            {events.map((event) => {
                const { topPx, heightPx } = getEventPosition(event.time, event.endTime);
                return (
                    <EventCard
                        key={event.id}
                        event={event}
                        topPx={topPx}
                        heightPx={heightPx}
                        onClick={onEventClick}
                        onReschedule={onRescheduleEvent}
                        onViewDetails={onViewEventDetails}
                        onResize={onResizeEvent}
                    />
                );
            })}
        </div>
    );
}

