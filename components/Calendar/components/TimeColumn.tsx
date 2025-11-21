'use client';

import React from 'react';
import { formatTimeDisplay } from '../utils/calendarUtils';

interface TimeColumnProps {
    timeSlots: number[];
}

export default function TimeColumn({ timeSlots }: TimeColumnProps) {
    return (
        <div className="border-r border-[#E4E7EC] shrink-0">
            {timeSlots.map((hour, index) => {
                const isLast = index === timeSlots.length - 1;
                return (
                    <div 
                        key={`time-${hour}`} 
                        className={`p-2 text-xs text-[#727A90] text-center h-[180px] border-b border-[#E4E7EC] ${
                            isLast ? 'border-b-0' : ''
                        }`}
                    >
                        {formatTimeDisplay(hour)}
                    </div>
                );
            })}
        </div>
    );
}

