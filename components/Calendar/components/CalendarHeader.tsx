'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CalendarHeaderProps {
    onCreateMeeting: () => void;
}

export default function CalendarHeader({ onCreateMeeting }: CalendarHeaderProps) {
    const router = useRouter();
    const [isConnectDropdownOpen, setIsConnectDropdownOpen] = useState(false);
    const connectDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (connectDropdownRef.current && !connectDropdownRef.current.contains(event.target as Node)) {
                setIsConnectDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="overflow-x-auto scroll-hidden mb-6">
            <div className="flex items-center justify-end gap-3 min-w-max">
                <button
                    onClick={() => router.push('/calendar/set-availability')}
                    className="px-4 py-2 bg-[#EBEAED] border border-[#E4E7EC] text-[#2E2C34] rounded-sm text-sm font-medium hover:bg-[#F7F8FA] transition-colors whitespace-nowrap shrink-0"
                >
                    Set Availability Hours
                </button>
                <button
                    onClick={() => router.push('/calendar/manage-groups')}
                    className="px-4 py-2 bg-[#e9e8fb] border border-[#E4E7EC] text-[#24282E] rounded-sm text-sm font-medium hover:bg-[#F7F8FA] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0007 7.9987C11.9207 7.9987 12.6607 7.25203 12.6607 6.33203C12.6607 5.41203 11.9207 4.66536 11.0007 4.66536C10.0807 4.66536 9.33398 5.41203 9.33398 6.33203C9.33398 7.25203 10.0807 7.9987 11.0007 7.9987ZM6.00065 7.33203C7.10732 7.33203 7.99398 6.4387 7.99398 5.33203C7.99398 4.22536 7.10732 3.33203 6.00065 3.33203C4.89398 3.33203 4.00065 4.22536 4.00065 5.33203C4.00065 6.4387 4.89398 7.33203 6.00065 7.33203ZM11.0007 9.33203C9.78065 9.33203 7.33398 9.94536 7.33398 11.1654V12.6654H14.6673V11.1654C14.6673 9.94536 12.2207 9.33203 11.0007 9.33203ZM6.00065 8.66536C4.44732 8.66536 1.33398 9.44536 1.33398 10.9987V12.6654H6.00065V11.1654C6.00065 10.5987 6.22065 9.60536 7.58065 8.85203C7.00065 8.73203 6.44065 8.66536 6.00065 8.66536Z" fill="#2E2C34" />
                    </svg>
                    Manage Groups
                </button>
                <div className="relative shrink-0" ref={connectDropdownRef}>
                    <button
                        onClick={() => setIsConnectDropdownOpen(!isConnectDropdownOpen)}
                        className="px-4 py-2 bg-[#5542F6] text-white rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                        Connect Google Calendar
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9H6Z" fill="white" />
                        </svg>

                    </button>
                    {isConnectDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E4E7EC] rounded-lg shadow-lg z-10">
                            <button className="w-full text-left px-4 py-2 text-sm text-[#24282E] hover:bg-[#F7F8FA]">
                                Connect Outlook
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-[#24282E] hover:bg-[#F7F8FA]">
                                Disconnect
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

