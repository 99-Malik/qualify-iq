'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CalendarEvent } from '../types';

// Helper function to get a lighter version of a color for background
const getLightColor = (hexColor: string): string => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Create a light version (10% opacity equivalent)
    return `rgba(${r}, ${g}, ${b}, 0.1)`;
};

interface EventCardProps {
    event: CalendarEvent;
    topPx: number;
    heightPx: number;
    onClick: (event: CalendarEvent) => void;
    onReschedule?: (event: CalendarEvent) => void;
    onViewDetails?: (event: CalendarEvent) => void;
    onResize?: (event: CalendarEvent, newEndTime: string) => void;
}

export default function EventCard({ event, topPx, heightPx, onClick, onReschedule, onViewDetails, onResize }: EventCardProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [isResizing, setIsResizing] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const resizeHandleRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isPopupOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsPopupOpen(false);
            }
        };

        const handleScroll = () => {
            setIsPopupOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleScroll);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleScroll);
        };
    }, [isPopupOpen]);

    const handleThreeDotsClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const popupWidth = 140;
            const spacing = 4;
            
            // Position popup to the right of the button
            let leftPosition = rect.right + spacing;
            const viewportWidth = window.innerWidth;
            
            // If popup would overflow, position it to the left
            if (leftPosition + popupWidth > viewportWidth) {
                leftPosition = rect.left - popupWidth - spacing;
            }
            
            // Ensure popup doesn't overflow screen width
            if (leftPosition < 0) {
                leftPosition = spacing;
            }
            
            setPopupPosition({
                top: rect.top,
                left: leftPosition,
            });
            setIsPopupOpen(!isPopupOpen);
        }
    };

    // Format time display: "7- 8:00am"
    // Handle resize drag
    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef.current || !onResize) return;

            // Get the calendar grid container (parent of the day column)
            const dayColumn = cardRef.current.closest('[data-day-column]');
            if (!dayColumn) return;

            const dayColumnRect = dayColumn.getBoundingClientRect();
            
            // Calculate mouse position relative to the day column top
            const mouseY = e.clientY - dayColumnRect.top;
            
            // Convert pixel position to time
            // Each hour = 180px, each minute = 3px
            const pixelsPerMinute = 3;
            const totalMinutes = Math.round(mouseY / pixelsPerMinute);
            
            // Calculate hours and minutes
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            
            // Ensure we don't go before start time (minimum 15 minutes duration)
            const [startHours, startMinutes] = event.time.split(':').map(Number);
            const startTotalMinutes = startHours * 60 + startMinutes;
            const newTotalMinutes = hours * 60 + minutes;
            
            // Minimum duration of 15 minutes
            if (newTotalMinutes > startTotalMinutes + 15) {
                const newEndTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                onResize(event, newEndTime);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, event, onResize]);

    const handleResizeStart = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsResizing(true);
    };

    const formatTimeDisplay = (startTime: string, endTime: string) => {
        const formatTime = (time: string) => {
            const [hours, minutes] = time.split(':');
            const hour = parseInt(hours, 10);
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            const period = hour >= 12 ? 'pm' : 'am';
            const mins = minutes === '00' ? '' : `:${minutes}`;
            return `${displayHour}${mins}${period}`;
        };
        return `${formatTime(startTime)}- ${formatTime(endTime)}`;
    };

    const eventColor = event.color || '#14B13B'; // Default to green if no color
    const lightColor = getLightColor(eventColor);

    return (
        <>
            <div
                ref={cardRef}
                className="absolute left-0 right-0 rounded-sm cursor-pointer hover:shadow-md transition-shadow overflow-visible"
                style={{
                    top: `${topPx}px`,
                    height: `${heightPx}px`,
                    backgroundColor: lightColor,
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(event);
                }}
            >
                {/* Inner relative container for absolute children */}
                <div className="relative w-full h-full">
                    {/* Top color bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-sm" style={{ backgroundColor: eventColor }}></div>
                
                    <div className="flex items-start justify-between gap-2 h-full pl-3 pr-3 pt-3 pb-2">
                        <div className="flex-1 min-w-0 flex flex-col">
                            {/* Time - first, smaller, using event color */}
                            <p className="text-[10px] mb-1" style={{ color: eventColor }}>{formatTimeDisplay(event.time, event.endTime)}</p>
                            {/* Meeting title - bold, dark */}
                            <p className="font-bold text-xs text-[#24282E] truncate">{event.title}</p>
                            {/* Client name - "with John" format */}
                            <p className="font-bold text-xs text-[#24282E] truncate">with {event.client}</p>
                        </div>
                        <button
                            ref={buttonRef}
                            onClick={handleThreeDotsClick}
                            className="flex items-center justify-center text-[#24282E] hover:text-[#24282E] transition-colors shrink-0 p-1"
                            style={{ minWidth: '24px', minHeight: '24px' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 4.66667C8.73638 4.66667 9.33333 5.26362 9.33333 6C9.33333 6.73638 8.73638 7.33333 8 7.33333C7.26362 7.33333 6.66667 6.73638 6.66667 6C6.66667 5.26362 7.26362 4.66667 8 4.66667Z" fill="currentColor" />
                                <path d="M8 8.66667C8.73638 8.66667 9.33333 9.26362 9.33333 10C9.33333 10.7364 8.73638 11.3333 8 11.3333C7.26362 11.3333 6.66667 10.7364 6.66667 10C6.66667 9.26362 7.26362 8.66667 8 8.66667Z" fill="currentColor" />
                                <path d="M6.66667 2.66667C6.66667 3.40305 7.26362 4 8 4C8.73638 4 9.33333 3.40305 9.33333 2.66667C9.33333 1.93029 8.73638 1.33333 8 1.33333C7.26362 1.33333 6.66667 1.93029 6.66667 2.66667Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                {/* Resize handle at bottom */}
                {onResize && (
                    <div
                        ref={resizeHandleRef}
                        onMouseDown={handleResizeStart}
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 cursor-ns-resize hover:scale-110 transition-transform z-10"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="19.5" width="19" height="19" rx="9.5" transform="rotate(-90 0.5 19.5)" fill="white"/>
                            <rect x="0.5" y="19.5" width="19" height="19" rx="9.5" transform="rotate(-90 0.5 19.5)" stroke="#B6B4BA"/>
                            <path d="M5 11.6648L6.175 12.8398L10 9.02318L13.825 12.8398L15 11.6648L10 6.66484L5 11.6648Z" fill="#84818A"/>
                        </svg>
                    </div>
                )}
            </div>

            {isPopupOpen && typeof window !== 'undefined' && createPortal(
                <div
                    ref={popupRef}
                    className="fixed bg-white rounded-lg border border-[#E4E7EC] shadow-lg z-50 w-[140px]"
                    style={{
                        top: `${popupPosition.top}px`,
                        left: `${popupPosition.left}px`,
                        maxWidth: 'calc(100vw - 16px)',
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsPopupOpen(false);
                            if (onReschedule) {
                                onReschedule(event);
                            }
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-[#24282E] hover:bg-[#F7F8FA] transition-colors border-b-[0.1875rem] border-[#E4E7EC]"
                    >
                        Reschedule
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsPopupOpen(false);
                            if (onViewDetails) {
                                onViewDetails(event);
                            }
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-[#24282E] hover:bg-[#F7F8FA] transition-colors"
                    >
                        View Details
                    </button>
                </div>,
                document.body
            )}
        </>
    );
}

