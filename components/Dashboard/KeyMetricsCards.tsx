import React from 'react';
import MetricCard from './MetricCard';

export default function KeyMetricsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 sm:mt-6">
            {/* Total Leads Card */}
            <MetricCard
                title="Total Leads"
                value="250"
                percentage="21"
                todayChange="12"
                variant="purple"
                icon={
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#FBFAFC" fill-opacity="0.1" />
                        <path d="M16 8C16.5523 8 17 8.44772 17 9V15C17 15.5523 16.5523 16 16 16H8C7.44772 16 7 15.5523 7 15V9C7 8.44772 7.44772 8 8 8H16ZM11.5 9.5V10H11C10.725 10 10.5 10.225 10.5 10.5V12C10.5 12.275 10.725 12.5 11 12.5H12.5V13H10.5V14H11.5V14.5H12.5V14H13C13.275 14 13.5 13.775 13.5 13.5V12C13.5 11.725 13.275 11.5 13 11.5H11.5V11H13.5V10H12.5V9.5H11.5Z" fill="white" />
                    </svg>


                }
            />

            {/* Approved Leads Card */}
            <MetricCard
                title="Approved Leads"
                value="50"
                percentage="13"
                todayChange="7"
                variant="white"
                icon={
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#14B13B" fill-opacity="0.1" />
                        <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM11 14.5L8.5 12L9.205 11.295L11 13.085L14.795 9.29L15.5 10L11 14.5Z" fill="#14B13B" />
                    </svg>

                }
            />

            {/* Rejected Leads Card */}
            <MetricCard
                title="Rejected Leads"
                value="20"
                percentage="11"
                todayChange="21"
                variant="white"
                icon={
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="#FFBEBE"/>
                    <path d="M12.25 10C10.925 10 9.725 10.495 8.8 11.3L7 9.5V14H11.5L9.69 12.19C10.385 11.61 11.27 11.25 12.25 11.25C14.02 11.25 15.525 12.405 16.05 14L17.235 13.61C16.54 11.515 14.575 10 12.25 10Z" fill="#FC3400"/>
                    </svg>
                    

                }
            />
        </div>
    );
}
