'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Notification {
    id: string;
    icon: React.ReactNode;
    iconBgColor: string;
    title: string;
    description: string;
    timestamp: string;
    actionButton?: {
        label: string;
        color: 'green' | 'purple';
        onClick?: () => void;
    };
    additionalInfo?: string;
}

export default function Notifications() {
    const router = useRouter();

    const notifications: Notification[] = [
        {
            id: '1',
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#FC3400" fill-opacity="0.1" />
                    <path d="M18.62 22.7883C20.06 25.6183 22.38 27.9283 25.21 29.3783L27.41 27.1783C27.68 26.9083 28.08 26.8183 28.43 26.9383C29.55 27.3083 30.76 27.5083 32 27.5083C32.55 27.5083 33 27.9583 33 28.5083V31.9983C33 32.5483 32.55 32.9983 32 32.9983C22.61 32.9983 15 25.3883 15 15.9983C15 15.4483 15.45 14.9983 16 14.9983H19.5C20.05 14.9983 20.5 15.4483 20.5 15.9983C20.5 17.2483 20.7 18.4483 21.07 19.5683C21.18 19.9183 21.1 20.3083 20.82 20.5883L18.62 22.7883ZM32.16 15.6883L31.45 14.9883L25 21.2883V16.9983H24V22.9983H30V21.9983H25.85L32.16 15.6883Z" fill="#FC3400" />
                </svg>

            ),
            iconBgColor: '#FFF5F2',
            title: 'Incoming Call',
            description: 'A call is coming from the client named John',
            timestamp: '2s ago',
            actionButton: {
                label: 'Answer Call',
                color: 'green'
            }
        },
        {
            id: '2',
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#5542F6" />
                    <path d="M31 15H26.82C26.4 13.84 25.3 13 24 13C22.7 13 21.6 13.84 21.18 15H17C15.9 15 15 15.9 15 17V31C15 32.1 15.9 33 17 33H31C32.1 33 33 32.1 33 31V17C33 15.9 32.1 15 31 15ZM24 15C24.55 15 25 15.45 25 16C25 16.55 24.55 17 24 17C23.45 17 23 16.55 23 16C23 15.45 23.45 15 24 15ZM26 29H19V27H26V29ZM29 25H19V23H29V25ZM29 21H19V19H29V21Z" fill="white" />
                </svg>

            ),
            iconBgColor: '#5542F6',
            title: 'FDD is Signed by you',
            description: 'A call is coming from the client named John',
            timestamp: '2s ago'
        },
        {
            id: '3',
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#5542F6" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M29 25H24V30H29V25ZM28 14V16H20V14H18V16H17C15.89 16 15.01 16.9 15.01 18L15 32C15 33.1 15.89 34 17 34H31C32.1 34 33 33.1 33 32V18C33 16.9 32.1 16 31 16H30V14H28ZM31 32H17V21H31V32Z" fill="white" />
                </svg>

            ),
            iconBgColor: '#5542F6',
            title: 'Discovery Day',
            description: 'FDD is signed by client "name"',
            timestamp: '2s ago',
            actionButton: {
                label: 'Confirm',
                color: 'purple'
            }
        },
        {
            id: '4',
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#FC3400" />
                    <path d="M27 13H21V15H27V13ZM23 26H25V20H23V26ZM31.03 19.39L32.45 17.97C32.02 17.46 31.55 16.98 31.04 16.56L29.62 17.98C28.07 16.74 26.12 16 24 16C19.03 16 15 20.03 15 25C15 29.97 19.02 34 24 34C28.98 34 33 29.97 33 25C33 22.88 32.26 20.93 31.03 19.39ZM24 32C20.13 32 17 28.87 17 25C17 21.13 20.13 18 24 18C27.87 18 31 21.13 31 25C31 28.87 27.87 32 24 32Z" fill="white" />
                </svg>

            ),
            iconBgColor: '#EA4335',
            title: 'Form is being sent to client "John"',
            description: 'You can view the details of lead and can change the form',
            timestamp: '2s ago',
            additionalInfo: 'Remaining Time : 00:00:20:21',
            actionButton: {
                label: 'View Details',
                color: 'purple'
            }
        },
        {
            id: '5',
            icon: (
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="21" r="21" fill="#14B13B" fill-opacity="0.1"/>
                <path d="M20.1256 28.875H19.2506L20.1256 22.75H17.0631C16.5556 22.75 16.5643 22.47 16.7306 22.1725C16.8968 21.875 16.7743 22.1025 16.7918 22.0675C17.9206 20.0725 19.6181 17.0975 21.8756 13.125H22.7506L21.8756 19.25H24.9381C25.3668 19.25 25.4281 19.5388 25.3493 19.6962L25.2881 19.8275C21.8406 25.8562 20.1256 28.875 20.1256 28.875Z" fill="#14B13B"/>
                </svg>
                
            ),
            iconBgColor: 'transparent',
            title: 'New Lead',
            description: 'A new lead is generated by the Qualify IQ of an agency',
            timestamp: '10 minutes ago'
        },
        {
            id: '6',
            icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#FC3400" fill-opacity="0.1"/>
            <path d="M18.62 22.7883C20.06 25.6183 22.38 27.9283 25.21 29.3783L27.41 27.1783C27.68 26.9083 28.08 26.8183 28.43 26.9383C29.55 27.3083 30.76 27.5083 32 27.5083C32.55 27.5083 33 27.9583 33 28.5083V31.9983C33 32.5483 32.55 32.9983 32 32.9983C22.61 32.9983 15 25.3883 15 15.9983C15 15.4483 15.45 14.9983 16 14.9983H19.5C20.05 14.9983 20.5 15.4483 20.5 15.9983C20.5 17.2483 20.7 18.4483 21.07 19.5683C21.18 19.9183 21.1 20.3083 20.82 20.5883L18.62 22.7883ZM32.16 15.6883L31.45 14.9883L25 21.2883V16.9983H24V22.9983H30V21.9983H25.85L32.16 15.6883Z" fill="#FC3400"/>
            </svg>
            ,
            iconBgColor: 'transparent',
            title: 'Incoming Call',
            description: 'A call is coming from the client named John',
            timestamp: '2s ago',
            actionButton: {
                label: 'Answer Call',
                color: 'green'
            }
        },
        {
            id: '7',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 5V15C2.5 15.9205 3.24619 16.6667 4.16667 16.6667H15.8333C16.7538 16.6667 17.5 15.9205 17.5 15V5C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.3333 2.5V4.16667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.66667 2.5V4.16667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 7.5H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            iconBgColor: '#5542F6',
            title: 'Discovery Day',
            description: 'FDD is signed by client "name"',
            timestamp: '2s ago',
            actionButton: {
                label: 'Confirm',
                color: 'purple'
            }
        },
        {
            id: '8',
            icon: (
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21" cy="21" r="21" fill="#14B13B" fill-opacity="0.1"/>
                    <path d="M20.1256 28.875H19.2506L20.1256 22.75H17.0631C16.5556 22.75 16.5643 22.47 16.7306 22.1725C16.8968 21.875 16.7743 22.1025 16.7918 22.0675C17.9206 20.0725 19.6181 17.0975 21.8756 13.125H22.7506L21.8756 19.25H24.9381C25.3668 19.25 25.4281 19.5388 25.3493 19.6962L25.2881 19.8275C21.8406 25.8562 20.1256 28.875 20.1256 28.875Z" fill="#14B13B"/>
                </svg>
            ),
            iconBgColor: 'transparent',
            title: 'New Lead',
            description: 'A new lead is generated by the Qualify IQ of client named',
            timestamp: '10 minutes ago'
        }
    ];

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Notifications</span>
                </nav>
            </div>

            {/* Back Arrow and Notifications Title */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => router.back()}
                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                    </svg>
                </button>
                <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Notifications</h1>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-8"></div>

            {/* Notifications List */}
            <div className="bg-white border border-[#E4E7EC] rounded-lg overflow-hidden">
                {notifications.map((notification, index) => (
                    <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-6 ${index !== notifications.length - 1 ? 'border-b border-[#E4E7EC]' : ''
                            }`}
                    >
                        {/* Icon */}
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: notification.iconBgColor }}
                        >
                            {notification.icon}
                        </div>

                        {/* Content - Title and Description */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-[#24282E] mb-1">{notification.title}</h3>
                            <p className="text-sm text-[#727A90]">{notification.description}</p>
                        </div>

                        {/* Right Section - Timestamp, Remaining Time, and Button */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="text-xs text-[#A0AEC0]">{notification.timestamp}</span>
                            {(notification.additionalInfo || notification.actionButton) && (
                                <div className="flex items-center gap-2">
                                    {notification.additionalInfo && (
                                        <span className="px-3 py-1 bg-[#ffdfc0] text-[#2E2C34] font-bold rounded-sm text-xs">
                                            {notification.additionalInfo}
                                        </span>
                                    )}
                                    {notification.actionButton && (
                                        <button
                                            onClick={notification.actionButton.onClick}
                                            className={`px-4 py-2 rounded-sm text-xs font-medium transition-colors ${notification.actionButton.color === 'green'
                                                ? 'bg-[#14B13B] text-white hover:bg-[#12A035]'
                                                : 'bg-[#5542F6] text-white hover:bg-[#4535D6]'
                                                }`}
                                        >
                                            {notification.actionButton.label}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

