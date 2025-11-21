import {
    format,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    addDays,
    addWeeks,
    subWeeks,
    addMonths,
    subMonths,
    subDays,
} from 'date-fns';
import { DayInfo, ViewMode } from '../types';

// Color palette for event cards
export const EVENT_COLOR_PALETTE = [
    '#14B13B', // Green
    '#5542F6', // Purple
    '#FF6B35', // Orange
    '#20C9AC', // Teal
    '#FC3400', // Red
    '#FFB800', // Yellow
    '#007AFF', // Blue
    '#AF52DE', // Purple-pink
    '#FF2D55', // Pink
    '#5AC8FA', // Light blue
    '#FF9500', // Orange-yellow
    '#34C759', // Light green
];

// Get a random color from the palette
export const getRandomEventColor = (): string => {
    const randomIndex = Math.floor(Math.random() * EVENT_COLOR_PALETTE.length);
    return EVENT_COLOR_PALETTE[randomIndex];
};

export const getWeekDays = (currentDate: Date): DayInfo[] => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const days: DayInfo[] = [];
    for (let i = 0; i < 7; i++) {
        const day = addDays(weekStart, i);
        // Normalize date to start of day
        const normalizedDay = new Date(day);
        normalizedDay.setHours(0, 0, 0, 0);
        days.push({
            date: normalizedDay,
            label: format(normalizedDay, 'EEE d'),
            dayOfMonth: format(normalizedDay, 'd'),
            dayName: format(normalizedDay, 'EEE'),
        });
    }
    return days;
};

export const getMonthDays = (currentDate: Date): DayInfo[] => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    
    return days.map(day => {
        // Normalize date to start of day
        const normalizedDay = new Date(day);
        normalizedDay.setHours(0, 0, 0, 0);
        return {
            date: normalizedDay,
            label: format(normalizedDay, 'EEE d'),
            dayOfMonth: format(normalizedDay, 'd'),
            dayName: format(normalizedDay, 'EEE'),
            isCurrentMonth: isSameMonth(normalizedDay, currentDate),
        };
    });
};

export const getDayView = (currentDate: Date): DayInfo[] => {
    // Normalize date to start of day
    const normalizedDate = new Date(currentDate);
    normalizedDate.setHours(0, 0, 0, 0);
    return [{
        date: normalizedDate,
        label: format(normalizedDate, 'EEE d'),
        dayOfMonth: format(normalizedDate, 'd'),
        dayName: format(normalizedDate, 'EEE'),
    }];
};

export const getDaysForView = (viewMode: ViewMode, currentDate: Date): DayInfo[] => {
    if (viewMode === 'week') {
        return getWeekDays(currentDate);
    } else if (viewMode === 'month') {
        return getMonthDays(currentDate);
    } else {
        return getDayView(currentDate);
    }
};

export const navigateDate = (currentDate: Date, viewMode: ViewMode, direction: 'prev' | 'next'): Date => {
    if (viewMode === 'week') {
        return direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1);
    } else if (viewMode === 'month') {
        return direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1);
    } else {
        return direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1);
    }
};

export const getEventPosition = (startTime: string, endTime: string): { topPx: number; heightPx: number } => {
    // Parse start time
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    
    // Parse end time
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    // Calculate duration in minutes
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    
    // Calendar constants - each hour slot is 180px (24 hours * 180px = 4320px total)
    const slotHeight = 180; // Each time slot (1 hour) is 180px
    const minutesPerHour = 60;
    const pixelsPerMinute = slotHeight / minutesPerHour; // 180px / 60min = 3px per minute
    
    // Calculate top position: how many minutes from midnight (12am = 0)
    // Each minute = 3px, so multiply minutes by pixelsPerMinute
    const topPx = startTotalMinutes * pixelsPerMinute;
    
    // Calculate height based on exact duration in minutes
    // Height should exactly match the duration: durationMinutes * pixelsPerMinute
    const heightPx = durationMinutes * pixelsPerMinute;
    
    // Ensure minimum height for visibility (at least 30 minutes = 90px)
    const minHeightPx = 90;
    
    const finalHeightPx = Math.max(heightPx, minHeightPx);
    
    return { 
        topPx, 
        heightPx: finalHeightPx 
    };
};

export const formatTimeDisplay = (hour: number): string => {
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const period = hour >= 12 ? 'pm' : 'am';
    return `${displayHour}${period}`;
};

