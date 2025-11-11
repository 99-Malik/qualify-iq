'use client';

import React from 'react';
import { format } from 'date-fns';
import { format as formatTz } from 'date-fns-tz';

interface ScheduledModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: Date | null;
    selectedTime: string;
    selectedTimezone: string;
    personName?: string;
}

export default function ScheduledModal({
    isOpen,
    onClose,
    selectedDate,
    selectedTime,
    selectedTimezone,
    personName = 'Khatchadour Israelyan',
}: ScheduledModalProps) {
    if (!isOpen) return null;

    const getFormattedDateTime = () => {
        if (!selectedDate) return 'Date not selected';

        const dateStr = format(selectedDate, 'EEEE, MMMM d, yyyy');
        const timeStr = selectedTime || 'Time not selected';
        const endTime = getEndTime(selectedTime);
        return `${timeStr} - ${endTime}, ${dateStr}`;
    };

    const getEndTime = (startTime: string): string => {
        if (!startTime) return '';
        const [hours, minutes] = startTime.split(':').map(Number);
        const endMinutes = minutes + 45;
        const endHours = hours + Math.floor(endMinutes / 60);
        const finalMinutes = endMinutes % 60;
        return `${String(endHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
    };

    const getTimezoneDisplay = (): string => {
        return selectedTimezone
            .replace(/_/g, ' ')
            .split('/')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join('/');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-xl my-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col items-center p-8">
                    <div className="w-20 h-20 rounded-full bg-[#5542F6] flex items-center justify-center mb-6">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="64" height="64" rx="32" fill="#5542F6" />
                            <path d="M41.3333 19.9997H35.76C35.2 18.453 33.7333 17.333 32 17.333C30.2667 17.333 28.8 18.453 28.24 19.9997H22.6667C21.2 19.9997 20 21.1997 20 22.6663V41.333C20 42.7997 21.2 43.9997 22.6667 43.9997H41.3333C42.8 43.9997 44 42.7997 44 41.333V22.6663C44 21.1997 42.8 19.9997 41.3333 19.9997ZM32 19.9997C32.7333 19.9997 33.3333 20.5997 33.3333 21.333C33.3333 22.0663 32.7333 22.6663 32 22.6663C31.2667 22.6663 30.6667 22.0663 30.6667 21.333C30.6667 20.5997 31.2667 19.9997 32 19.9997ZM34.6667 38.6663H25.3333V35.9997H34.6667V38.6663ZM38.6667 33.333H25.3333V30.6663H38.6667V33.333ZM38.6667 27.9997H25.3333V25.333H38.6667V27.9997Z" fill="white" />
                        </svg>

                    </div>

                    <h2 className="text-xl font-bold text-[#2E2C34] mb-3 text-center">
                        You are scheduled
                    </h2>
                    <p className="text-sm text-[#727A90] mb-8 text-center">
                        A calendar invitation has been sent to your email address.
                    </p>

                    <div className="w-full border border-[#E4E7EC] rounded-lg p-4">
                        <h3 className="text-lg font-bold text-[#2E2C34] mb-4">Schedule eClosing</h3>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_559_40543)">
                                            <path d="M5.49972 5.5C5.49972 6.09095 5.61611 6.67611 5.84226 7.22208C6.06841 7.76804 6.39987 8.26412 6.81774 8.68198C7.2356 9.09984 7.73168 9.43131 8.27764 9.65746C8.82361 9.8836 9.40877 10 9.99972 10C10.5907 10 11.1758 9.8836 11.7218 9.65746C12.2678 9.43131 12.7638 9.09984 13.1817 8.68198C13.5996 8.26412 13.931 7.76804 14.1572 7.22208C14.3833 6.67611 14.4997 6.09095 14.4997 5.5C14.4997 4.90905 14.3833 4.32389 14.1572 3.77792C13.931 3.23196 13.5996 2.73588 13.1817 2.31802C12.7638 1.90016 12.2678 1.56869 11.7218 1.34254C11.1758 1.1164 10.5907 1 9.99972 1C9.40877 1 8.82361 1.1164 8.27764 1.34254C7.73168 1.56869 7.2356 1.90016 6.81774 2.31802C6.39987 2.73588 6.06841 3.23196 5.84226 3.77792C5.61611 4.32389 5.49972 4.90905 5.49972 5.5ZM18.4877 19C17.8685 17.2434 16.7195 15.7222 15.1992 14.6462C13.6789 13.5702 11.8623 12.9923 9.99972 12.9923C8.13717 12.9923 6.32051 13.5702 4.80023 14.6462C3.27996 15.7222 2.13097 17.2434 1.51172 19H18.4877Z" stroke="#2E2C34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_559_40543">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </div>
                                <span className="text-md text-[#84818A]">{personName}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className=" flex items-center justify-center shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_559_40547)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C6 0.447715 5.55229 0 5 0C4.44772 0 4 0.447715 4 1V2H3C2.20435 2 1.44129 2.31607 0.87868 2.87868C0.316071 3.44129 0 4.20435 0 5V8V17C0 17.7957 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7957 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7957 20 17V8V5C20 4.20435 19.6839 3.44129 19.1213 2.87868C18.5587 2.31607 17.7957 2 17 2H16V1C16 0.447715 15.5523 0 15 0C14.4477 0 14 0.447715 14 1V2H6V1ZM18 7V5C18 4.73479 17.8946 4.48043 17.7071 4.2929C17.5196 4.10536 17.2652 4 17 4H15.001H15H14.999H5.00099H4.99901H3C2.73478 4 2.48043 4.10536 2.29289 4.2929C2.10536 4.48043 2 4.73479 2 5V7H18ZM2 9H18V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8947 17.2652 18 17 18H3C2.73478 18 2.48043 17.8947 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V9Z" fill="#2E2C34" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_559_40547">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </div>
                                <span className="text-md text-[#84818A]">{getFormattedDateTime()}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className=" flex items-center justify-center shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_559_40551)">
                                            <path d="M1 10C1 12.3869 1.94821 14.6761 3.63604 16.364C5.32387 18.0518 7.61305 19 10 19C12.3869 19 14.6761 18.0518 16.364 16.364C18.0518 14.6761 19 12.3869 19 10C19 7.61305 18.0518 5.32387 16.364 3.63604C14.6761 1.94821 12.3869 1 10 1C7.61305 1 5.32387 1.94821 3.63604 3.63604C1.94821 5.32387 1 7.61305 1 10Z" stroke="#2E2C34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M1.69141 13.4615H4.11541C4.75794 13.4609 5.37398 13.2053 5.82814 12.7508C6.2823 12.2963 6.53741 11.68 6.53741 11.0375V8.96147C6.53741 8.31858 6.79279 7.70203 7.24738 7.24744C7.70197 6.79285 8.31852 6.53747 8.96141 6.53747C9.27947 6.53747 9.59442 6.47482 9.88827 6.35311C10.1821 6.23139 10.4491 6.05299 10.674 5.82808C10.8989 5.60318 11.0773 5.33618 11.199 5.04233C11.3208 4.74848 11.3834 4.43353 11.3834 4.11547V1.10547M18.9994 9.85747C18.3084 9.5008 17.543 9.31235 16.7654 9.30747H13.7994C13.4754 9.29816 13.1527 9.35394 12.8506 9.47152C12.5485 9.5891 12.2731 9.76608 12.0406 9.992C11.8081 10.2179 11.6232 10.4882 11.497 10.7868C11.3708 11.0854 11.3058 11.4063 11.3058 11.7305C11.3058 12.0547 11.3708 12.3755 11.497 12.6742C11.6232 12.9728 11.8081 13.243 12.0406 13.4689C12.2731 13.6949 12.5485 13.8718 12.8506 13.9894C13.1527 14.107 13.4754 14.1628 13.7994 14.1535C14.2582 14.1535 14.6983 14.3357 15.0227 14.6602C15.3471 14.9846 15.5294 15.4246 15.5294 15.8835V17.0935" stroke="#2E2C34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_559_40551">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </div>
                                <span className="text-md text-[#84818A]">{getTimezoneDisplay()}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className=" flex items-center justify-center shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_559_40556)">
                                            <g clip-path="url(#clip1_559_40556)">
                                                <path d="M13.9571 7.41768V5.00492C13.9571 4.4851 13.7506 3.98656 13.3831 3.61899C13.0155 3.25142 12.517 3.04492 11.9971 3.04492H2.80082C2.281 3.04492 1.78246 3.25142 1.41489 3.61899C1.04732 3.98656 0.84082 4.4851 0.84082 5.00492V14.8049C0.84082 15.3247 1.04732 15.8233 1.41489 16.1909C1.78246 16.5584 2.281 16.7649 2.80082 16.7649H11.9971C12.517 16.7649 13.0155 16.5584 13.3831 16.1909C13.7506 15.8233 13.9571 15.3247 13.9571 14.8049V12.3922L17.0402 14.0366C17.1895 14.1161 17.3568 14.1556 17.5259 14.1513C17.6949 14.1469 17.86 14.0989 18.005 14.0119C18.15 13.9249 18.2701 13.8019 18.3535 13.6547C18.4368 13.5076 18.4807 13.3414 18.4808 13.1722V6.6376C18.4807 6.46848 18.4368 6.30227 18.3535 6.15513C18.2701 6.00798 18.15 5.88492 18.005 5.79791C17.86 5.7109 17.6949 5.6629 17.5259 5.65858C17.3568 5.65425 17.1895 5.69375 17.0402 5.77324L13.9571 7.41768Z" stroke="#2E2C34" stroke-width="1.995" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_559_40556">
                                                <rect width="19.95" height="19.95" fill="white" />
                                            </clipPath>
                                            <clipPath id="clip1_559_40556">
                                                <rect width="19.6" height="19.6" fill="white" transform="translate(-0.139648 0.105469)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </div>
                                <span className="text-md text-[#84818A]">Web conferencing details to follow.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

