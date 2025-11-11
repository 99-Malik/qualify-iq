'use client';

import React from 'react';

interface JourneyModalProps {
    isOpen: boolean;
    onClose: () => void;
    leadId?: string;
}

interface JourneyEvent {
    id: number;
    icon: 'short-form' | 'calendar' | 'document' | 'long-form' | 'franchise-operating-agreement';
    iconColor: 'green' | 'purple' | 'orange';
    text: string;
    timestamp: string;
}

const journeyEvents: JourneyEvent[] = [
    {
        id: 1,
        icon: 'short-form',
        iconColor: 'green',
        text: 'Short Form Submitted by John',
        timestamp: 'Oct 16, 2020 at 9:12 AM'
    },
    {
        id: 2,
        icon: 'calendar',
        iconColor: 'purple',
        text: 'Discovery Call Calendar by John Smith',
        timestamp: 'Oct 16, 2020 at 9:12 AM'
    },
    {
        id: 3,
        icon: 'long-form',
        iconColor: 'orange',
        text: 'Long Form Sent to John smith by you',
        timestamp: 'Oct 16, 2020 at 9:12 AM'
    },
    {
        id: 4,
        icon: 'document',
        iconColor: 'orange',
        text: 'NDA sent to John smith by you',
        timestamp: 'Oct 16, 2020 at 9:12 AM'
    },
    {
        id: 5,
        icon: 'document',
        iconColor: 'orange',
        text: 'FDD Sent to John smith by you',
        timestamp: 'Oct 16, 2020 at 9:12 AM'
    },
    {
        id: 6,
        icon: 'calendar',
        iconColor: 'purple',
        text: 'Discovery Day Calendar',
        timestamp: 'Oct 16, 2020 at 9:12 AM'
    },
    {
        id: 7,
        icon: 'franchise-operating-agreement',
        iconColor: 'green',
        text: 'Franchise Operating Agreement sent to John smith by you',
        timestamp: 'Oct 16, 2020 at 9:12 AM'
    }
];

export default function JourneyModal({
    isOpen,
    onClose,
    leadId,
}: JourneyModalProps) {
    if (!isOpen) return null;

    const getIconColor = (color: string) => {
        switch (color) {
            case 'green':
                return '#14B13B';
            case 'purple':
                return '#5542F6';
            case 'orange':
                return '#FFA043';
            default:
                return '#5542F6';
        }
    };

    const renderIcon = (icon: string, color: string) => {
        const iconColor = getIconColor(color);
        const bgColor = color === 'green' ? '#14B13B' : color === 'purple' ? '#5542F6' : '#FFA043';

        if (icon === 'short-form') {
            return (
                <div className=" w-auto h-auto flex items-center justify-center shrink-0">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21" cy="21" r="21" fill="#14B13B" fillOpacity="0.1" />
                        <path d="M20.1256 28.875H19.2506L20.1256 22.75H17.0631C16.5556 22.75 16.5643 22.47 16.7306 22.1725C16.8968 21.875 16.7743 22.1025 16.7918 22.0675C17.9206 20.0725 19.6181 17.0975 21.8756 13.125H22.7506L21.8756 19.25H24.9381C25.3668 19.25 25.4281 19.5388 25.3493 19.6962L25.2881 19.8275C21.8406 25.8562 20.1256 28.875 20.1256 28.875Z" fill="#14B13B" />
                    </svg>


                </div>
            );
        } else if (icon === 'calendar') {
            return (
                <div className="w-auto h-auto flex items-center justify-center shrink-0" >
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21" cy="21" r="21" fill="#5542F6" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M25.375 21.875H21V26.25H25.375V21.875ZM24.5 12.25V14H17.5V12.25H15.75V14H14.875C13.9038 14 13.1338 14.7875 13.1338 15.75L13.125 28C13.125 28.9625 13.9038 29.75 14.875 29.75H27.125C28.0875 29.75 28.875 28.9625 28.875 28V15.75C28.875 14.7875 28.0875 14 27.125 14H26.25V12.25H24.5ZM27.125 28H14.875V18.375H27.125V28Z" fill="white" />
                    </svg>

                </div>
            );

        } else if (icon === 'document') {
            return (
                <div className="w-auto h-auto flex items-center justify-center shrink-0" >
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21" cy="21" r="21" fill="#FF8D28" />
                        <path d="M27 26H15V24H27V26ZM27 22H15V20H27V22ZM27 18H15V16H27V18ZM12 31L13.5 29.5L15 31L16.5 29.5L18 31L19.5 29.5L21 31L22.5 29.5L24 31L25.5 29.5L27 31L28.5 29.5L30 31V11L28.5 12.5L27 11L25.5 12.5L24 11L22.5 12.5L21 11L19.5 12.5L18 11L16.5 12.5L15 11L13.5 12.5L12 11V31Z" fill="white" />
                    </svg>

                </div>
            );
        }
        else if (icon === 'long-form') {
            return (
                <div className="w-auto h-auto flex items-center justify-center shrink-0" >
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21" cy="21" r="21" fill="#FC3400" />
                        <path d="M27 26H15V24H27V26ZM27 22H15V20H27V22ZM27 18H15V16H27V18ZM12 31L13.5 29.5L15 31L16.5 29.5L18 31L19.5 29.5L21 31L22.5 29.5L24 31L25.5 29.5L27 31L28.5 29.5L30 31V11L28.5 12.5L27 11L25.5 12.5L24 11L22.5 12.5L21 11L19.5 12.5L18 11L16.5 12.5L15 11L13.5 12.5L12 11V31Z" fill="white" />
                    </svg>

                </div>
            );
        }
        else if (icon === 'franchise-operating-agreement') {
            return (
                <div className="w-auto h-auto flex items-center justify-center shrink-0" >
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21" cy="21" r="21" fill="#14B13B" />
                        <path d="M27 26H15V24H27V26ZM27 22H15V20H27V22ZM27 18H15V16H27V18ZM12 31L13.5 29.5L15 31L16.5 29.5L18 31L19.5 29.5L21 31L22.5 29.5L24 31L25.5 29.5L27 31L28.5 29.5L30 31V11L28.5 12.5L27 11L25.5 12.5L24 11L22.5 12.5L21 11L19.5 12.5L18 11L16.5 12.5L15 11L13.5 12.5L12 11V31Z" fill="white" />
                    </svg>


                </div>
            );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl my-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-start justify-between p-6 pb-4">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-[#2E2C34] mb-1">
                            View Journey Map
                        </h2>
                        <p className="text-md text-[#727A90] mb-3">
                            You can set your discovery details here
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F8FA] transition-colors"
                    >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9997 2.33398C7.54801 2.33398 2.33301 7.54898 2.33301 14.0007C2.33301 20.4523 7.54801 25.6673 13.9997 25.6673C20.4513 25.6673 25.6663 20.4523 25.6663 14.0007C25.6663 7.54898 20.4513 2.33398 13.9997 2.33398ZM19.833 18.189L18.188 19.834L13.9997 15.6457L9.81134 19.834L8.16634 18.189L12.3547 14.0007L8.16634 9.81232L9.81134 8.16732L13.9997 12.3557L18.188 8.16732L19.833 9.81232L15.6447 14.0007L19.833 18.189Z" fill="#504F54" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 pb-6">
                    <div className="border border-[#E4E7EC] rounded-lg p-6">
                        <div className="space-y-0 relative">
                            {journeyEvents.map((event, index) => {
                                const isLast = index === journeyEvents.length - 1;
                                return (
                                    <div key={event.id} className="flex items-center gap-4 relative z-10 pb-6">
                                        <div className="relative shrink-0 flex items-center justify-center h-3">
                                            {!isLast && (
                                                <div
                                                    className="absolute left-[0.395rem] top-1/2 w-0.5 border-l-2 border-dashed border-[#E4E7EC] transform -translate-x-1/2"
                                                    style={{ height: 'calc(100% + 3rem)' }}
                                                ></div>
                                            )}
                                            <div className="w-3 h-3 rounded-full bg-[#B6B4BA] relative z-10"></div>
                                        </div>
                                        {renderIcon(event.icon, event.iconColor)}
                                        <div className="flex-1">
                                            <p className="text-sm text-[#24282E] mb-1">{event.text}</p>
                                            <p className="text-xs text-[#727A90]">{event.timestamp}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

