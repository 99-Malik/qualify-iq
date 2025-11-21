'use client';

import React from 'react';
import { isToday, isThisWeek, isThisMonth, format } from 'date-fns';
import { Meeting } from '../types';

interface ScheduledMeetingsListProps {
    meetings: Meeting[];
}

const getColorClasses = (color: string) => {
    switch (color) {
        case 'green':
            return 'bg-[#20C9AC]';
        case 'orange':
            return 'bg-[#FFA043]';
        case 'red':
            return 'bg-[#FC3400]';
        case 'gray':
            return 'bg-[#757575]';
        default:
            return 'bg-[#727A90]';
    }
};

const getTextColorClasses = (color: string) => {
    switch (color) {
        case 'green':
            return 'text-[#20C9AC]';
        case 'orange':
            return 'text-[#FFA043]';
        case 'red':
            return 'text-[#FC3400]';
        case 'gray':
            return 'text-[#757575]';
        default:
            return 'text-[#727A90]';
    }
};

const parseMeetingDetails = (details: string) => {
    // Format: "John Andrew (24 Aug 2025, 7-8:00am)"
    const match = details.match(/^(.+?)\s*\((.+)\)$/);
    if (match) {
        return {
            name: match[1].trim(),
            dateTime: match[2].trim()
        };
    }
    return {
        name: details,
        dateTime: ''
    };
};

export default function ScheduledMeetingsList({ meetings }: ScheduledMeetingsListProps) {
    // Filter meetings by time period
    const todayMeetings = meetings.filter(m => isToday(m.date));
    const thisWeekMeetings = meetings.filter(m => isThisWeek(m.date) && !isToday(m.date));
    const thisMonthMeetings = meetings.filter(m => isThisMonth(m.date) && !isThisWeek(m.date));

    return (
        <div className="bg-white border border-[#E4E7EC] rounded-lg p-6">
            <h2 className="text-lg font-bold text-[#24282E] mb-6">Schedule Meetings</h2>

            {/* Today Section */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#24282E] mb-3">Today</h3>
                {todayMeetings.length > 0 ? (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto scroll-hidden">
                        {todayMeetings.map((meeting) => {
                            const { name, dateTime } = parseMeetingDetails(meeting.details);
                            return (
                                <div key={meeting.id} className="flex gap-3">
                                    <div className={`w-1 ${getColorClasses(meeting.color)} rounded-full shrink-0`} style={{ alignSelf: 'stretch' }}></div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-[#24282E] mb-1">{meeting.title}</h4>
                                        <p className="text-xs">
                                            <span className={getTextColorClasses(meeting.color)}>{name}</span>
                                            {dateTime && <span className="text-[#727A90]"> ({dateTime})</span>}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-xs text-[#727A90]">No meetings</p>
                )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#EBEAED] mb-6"></div>

            {/* This Week Section */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#24282E] mb-3">This Week</h3>
                {thisWeekMeetings.length > 0 ? (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto scroll-hidden">
                        {thisWeekMeetings.map((meeting) => {
                            const { name, dateTime } = parseMeetingDetails(meeting.details);
                            return (
                                <div key={meeting.id} className="flex gap-3">
                                    <div className={`w-1 ${getColorClasses(meeting.color)} rounded-full shrink-0`} style={{ alignSelf: 'stretch' }}></div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-[#24282E] mb-1">{meeting.title}</h4>
                                        <p className="text-xs">
                                            <span className={getTextColorClasses(meeting.color)}>{name}</span>
                                            {dateTime && <span className="text-[#727A90]"> ({dateTime})</span>}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-xs text-[#727A90]">No meetings</p>
                )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#EBEAED] mb-6"></div>

            {/* This Month Section */}
            <div>
                <h3 className="text-sm font-semibold text-[#24282E] mb-3">This Month</h3>
                {thisMonthMeetings.length > 0 ? (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto scroll-hidden">
                        {thisMonthMeetings.map((meeting) => {
                            const { name, dateTime } = parseMeetingDetails(meeting.details);
                            return (
                                <div key={meeting.id} className="flex gap-3">
                                    <div className={`w-1 ${getColorClasses(meeting.color)} rounded-full shrink-0`} style={{ alignSelf: 'stretch' }}></div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-[#24282E] mb-1">{meeting.title}</h4>
                                        <p className="text-xs">
                                            <span className={getTextColorClasses(meeting.color)}>{name}</span>
                                            {dateTime && <span className="text-[#727A90]"> ({dateTime})</span>}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-xs text-[#727A90]">No meetings</p>
                )}
            </div>
        </div>
    );
}

