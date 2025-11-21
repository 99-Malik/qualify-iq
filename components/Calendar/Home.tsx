'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ScheduleMeetingModal from './Modal/ScheduleMeetings';
import MeetingDetailsModal from './Modal/MeetingDetails';
import RescheduleModal from './Modal/RescheduleModal';
import CalendarHeader from './components/CalendarHeader';
import IncomingCallNotification from './components/IncomingCallNotification';
import ScheduledMeetingsList from './components/ScheduledMeetingsList';
import CalendarNavigation from './components/CalendarNavigation';
import MonthView from './components/MonthView';
import WeekDayView from './components/WeekDayView';
import { CalendarEvent, Meeting, ViewMode } from './types';
import { getDaysForView, navigateDate, getRandomEventColor } from './utils/calendarUtils';

export default function CalendarHome() {
    const router = useRouter();
    
    // Helper function to normalize date to start of day
    const normalizeDate = (date: Date): Date => {
        const normalized = new Date(date);
        normalized.setHours(0, 0, 0, 0);
        return normalized;
    };
    
    const [currentDate, setCurrentDate] = useState(() => normalizeDate(new Date(2021, 2, 1))); // March 2021
    const [viewMode, setViewMode] = useState<ViewMode>('week');
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isMeetingDetailsModalOpen, setIsMeetingDetailsModalOpen] = useState(false);
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ date: Date; time: string } | null>(null);

    // Sample events - in real app, these would come from API
    const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
        // Normalize all initial dates to start of day
        const events = [
            { id: '1', title: 'Meeting with John', client: 'John Doe', date: new Date(2021, 2, 5), time: '7:00', endTime: '8:00', color: getRandomEventColor() },
            { id: '2', title: 'Proposal Discussion', client: 'Jane Smith', date: new Date(2021, 2, 7), time: '9:00', endTime: '10:00', color: getRandomEventColor() },
            { id: '3', title: 'Project Automation', client: 'Mike Johnson', date: new Date(2021, 2, 7), time: '9:30', endTime: '10:30', color: getRandomEventColor() },
            { id: '4', title: 'Kunex Updates', client: 'Sarah Williams', date: new Date(2021, 2, 10), time: '7:00', endTime: '8:00', color: getRandomEventColor() },
            { id: '5', title: 'KPI Discussion', client: 'David Brown', date: new Date(2021, 2, 11), time: '11:00', endTime: '12:30', color: getRandomEventColor() },
        ];
        return events.map(event => ({
            ...event,
            date: normalizeDate(event.date),
        }));
    });

    // Sample meetings data - in real app, these would come from API
    const today = new Date();
    const thisWeekDate = new Date(today);
    thisWeekDate.setDate(today.getDate() + 2); // 2 days from today (within this week)
    const thisMonthDate = new Date(today);
    thisMonthDate.setDate(today.getDate() + 15); // 15 days from today (this month but not this week)
    
    const meetings: Meeting[] = [
        // Today meetings (5 meetings as shown in image)
        { id: '1', title: 'Proposal Discussion', details: 'John Andrew (24 Aug 2025, 7-8:00am)', color: 'green', date: new Date(today), startTime: '7:00', endTime: '8:00' },
        { id: '2', title: 'John Meeting', details: 'John Andrew (24 Aug 2025, 7-8:00am)', color: 'orange', date: new Date(today), startTime: '7:00', endTime: '8:00' },
        { id: '3', title: 'Project Automation', details: 'John Andrew (24 Aug 2025, 7-8:00am)', color: 'green', date: new Date(today), startTime: '7:00', endTime: '8:00' },
        { id: '4', title: 'Kunex Updates', details: 'John Andrew (24 Aug 2025, 7-8:00am)', color: 'red', date: new Date(today), startTime: '7:00', endTime: '8:00' },
        { id: '5', title: 'KPI Discussion', details: 'John Andrew (24 Aug 2025, 7-8:00am)', color: 'gray', date: new Date(today), startTime: '7:00', endTime: '8:00' },
        // This Week meetings (2 meetings as shown in image)
        { id: '6', title: 'Proposal Discussion', details: 'John Andrew (24 Aug 2025, 7-8:00am)', color: 'green', date: thisWeekDate, startTime: '7:00', endTime: '8:00' },
        { id: '7', title: 'John Meeting', details: 'John Andrew (24 Aug 2025, 7-8:00am)', color: 'orange', date: thisWeekDate, startTime: '7:00', endTime: '8:00' },
        // This Month meetings (2 meetings as shown in image)
        { id: '8', title: 'Proposal Discussion', details: 'John Andrew (24 Aug 2025, 7-8:00am)', color: 'green', date: thisMonthDate, startTime: '7:00', endTime: '8:00' },
        { id: '9', title: 'John Meeting', details: 'John Andrew (24 Aug 2025, 7-8:00am)', color: 'orange', date: thisMonthDate, startTime: '7:00', endTime: '8:00' },
    ];

    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    // Handle day select (from day header click)
    const handleDaySelect = (date: Date) => {
        const normalizedDate = normalizeDate(date);
        setSelectedDay(normalizedDate);
        // Also open the modal to add a meeting
        setSelectedTimeSlot({ date: normalizedDate, time: '09:00' });
        setIsScheduleModalOpen(true);
    };

    const weekDays = useMemo(() => {
        return getDaysForView(viewMode, currentDate);
    }, [viewMode, currentDate]);

    // Generate 24 hour time slots
    const timeSlots = Array.from({ length: 24 }, (_, i) => i);

    // Navigation functions
    const goToPrevious = () => {
        setCurrentDate(normalizeDate(navigateDate(currentDate, viewMode, 'prev')));
    };

    const goToNext = () => {
        setCurrentDate(normalizeDate(navigateDate(currentDate, viewMode, 'next')));
    };

    const goToToday = () => {
        setCurrentDate(normalizeDate(new Date()));
    };

    // Handle time slot click
    const handleTimeSlotClick = (date: Date, hour: number) => {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        // Normalize date to start of day
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);
        setSelectedTimeSlot({ date: normalizedDate, time: timeString });
        setIsScheduleModalOpen(true);
    };

    // Handle event click
    const handleEventClick = (event: CalendarEvent) => {
        setSelectedEvent(event);
    };

    // Handle reschedule event
    const handleRescheduleEvent = (event: CalendarEvent) => {
        setSelectedEvent(event);
        setIsRescheduleModalOpen(true);
    };

    // Handle view event details
    const handleViewEventDetails = (event: CalendarEvent) => {
        setSelectedEvent(event);
        setIsMeetingDetailsModalOpen(true);
    };

    // Handle resize event (change duration)
    const handleResizeEvent = (event: CalendarEvent, newEndTime: string) => {
        setCalendarEvents(calendarEvents.map(e => 
            e.id === event.id 
                ? { ...e, endTime: newEndTime }
                : e
        ));
    };

    // Handle create meeting
    const handleCreateMeeting = () => {
        setSelectedTimeSlot(null);
        setIsScheduleModalOpen(true);
    };

    // Handle schedule meeting
    const handleScheduleMeeting = (meetingData: {
        title: string;
        client: string;
        date: Date;
        time: string;
        endTime: string;
    }) => {
        // Normalize date to start of day (midnight) to ensure proper matching with calendar days
        const normalizedDate = normalizeDate(meetingData.date);
        
        const newEvent: CalendarEvent = {
            id: Date.now().toString(),
            title: meetingData.title,
            client: meetingData.client,
            date: normalizedDate,
            time: meetingData.time,
            endTime: meetingData.endTime,
            color: getRandomEventColor(), // Assign random color to new event
        };
        setCalendarEvents([...calendarEvents, newEvent]);
        setIsScheduleModalOpen(false);
        setSelectedTimeSlot(null);
    };

    // Handle month day click
    const handleMonthDayClick = (date: Date, events: CalendarEvent[]) => {
        const normalizedDate = normalizeDate(date);
        setSelectedDay(normalizedDate);
        setCurrentDate(normalizedDate);
        
        // If day has meetings, switch to day view
        if (events.length > 0) {
            setViewMode('day');
        } else {
            // If no meetings, open add meeting modal
            setSelectedTimeSlot({ date: normalizedDate, time: '09:00' });
            setIsScheduleModalOpen(true);
        }
    };

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Calendar</span>
                </nav>
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-6">Calendar</h1>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-6"></div>

            {/* Top Action Buttons */}
            <CalendarHeader onCreateMeeting={handleCreateMeeting} />

            {/* Incoming Call Notification */}
            <IncomingCallNotification />

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Scheduled Meetings */}
                <div className="lg:col-span-1">
                    <ScheduledMeetingsList meetings={meetings} />
                </div>

                {/* Right Column - Calendar Grid */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-[#E4E7EC] rounded-lg p-6">
                        <CalendarNavigation
                            currentDate={currentDate}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            onPrevious={goToPrevious}
                            onNext={goToNext}
                            onToday={goToToday}
                            onCreateMeeting={handleCreateMeeting}
                        />

                        {/* Calendar Grid */}
                        {viewMode === 'month' ? (
                            <MonthView
                                weekDays={weekDays}
                                selectedDay={selectedDay}
                                calendarEvents={calendarEvents}
                                onDayClick={handleMonthDayClick}
                                onEventClick={handleEventClick}
                            />
                        ) : (
                            <WeekDayView
                                viewMode={viewMode}
                                weekDays={weekDays}
                                selectedDay={selectedDay}
                                timeSlots={timeSlots}
                                calendarEvents={calendarEvents}
                                onDaySelect={handleDaySelect}
                                onTimeSlotClick={handleTimeSlotClick}
                                onEventClick={handleEventClick}
                                onRescheduleEvent={handleRescheduleEvent}
                                onViewEventDetails={handleViewEventDetails}
                                onResizeEvent={handleResizeEvent}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Schedule Meeting Modal */}
            <ScheduleMeetingModal
                isOpen={isScheduleModalOpen}
                onClose={() => {
                    setIsScheduleModalOpen(false);
                    setSelectedTimeSlot(null);
                }}
                onSchedule={handleScheduleMeeting}
                initialDate={selectedTimeSlot?.date}
                initialTime={selectedTimeSlot?.time}
            />

            {/* Meeting Details Modal */}
            <MeetingDetailsModal
                isOpen={isMeetingDetailsModalOpen}
                onClose={() => {
                    setIsMeetingDetailsModalOpen(false);
                    setSelectedEvent(null);
                }}
                event={selectedEvent}
            />

            {/* Reschedule Modal */}
            <RescheduleModal
                isOpen={isRescheduleModalOpen}
                onClose={() => {
                    setIsRescheduleModalOpen(false);
                    setSelectedEvent(null);
                }}
                event={selectedEvent}
                onReschedule={(data) => {
                    if (selectedEvent && data.selectedDate && data.selectedTime) {
                        setCalendarEvents(prevEvents =>
                            prevEvents.map(event =>
                                event.id === selectedEvent.id
                                    ? { ...event, date: data.selectedDate!, time: data.selectedTime, endTime: data.selectedTime }
                                    : event
                            )
                        );
                    }
                    setIsRescheduleModalOpen(false);
                    setSelectedEvent(null);
                }}
            />
        </div>
    );
}
