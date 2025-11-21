export interface CalendarEvent {
    id: string;
    title: string;
    client: string;
    date: Date;
    time: string; // Start time in HH:mm format
    endTime: string; // End time in HH:mm format
    color: string; // Hex color code for the event card
}

export interface Meeting {
    id: string;
    title: string;
    details: string;
    color: 'green' | 'orange' | 'red' | 'gray';
    date: Date;
    startTime: string;
    endTime: string;
}

export interface DayInfo {
    date: Date;
    label: string;
    dayOfMonth: string;
    dayName: string;
    isCurrentMonth?: boolean;
}

export type ViewMode = 'week' | 'month' | 'day';

