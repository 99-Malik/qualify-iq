import React from 'react';

type MetricCardProps = {
    title: string;
    value: string | number;
    percentage: string | number;
    todayChange: string | number;
    icon: React.ReactNode;
    variant?: 'purple' | 'white';
};

export default function MetricCard({ 
    title, 
    value, 
    percentage, 
    todayChange, 
    icon, 
    variant = 'white' 
}: MetricCardProps) {
    const isPurple = variant === 'purple';
    
    return (
        <div className={`min-w-0 rounded-sm px-5 py-6 lg:h-[168px] sm:p-6 shadow-lg ${
            isPurple 
                ? ' bg-[#5542F6] text-white' 
                : 'bg-white border border-[#E4E7EC]'
        }`}>
            {/* Header: icon + title (left-aligned to match figma) */}
            <div className="flex items-center gap-2 mb-3">
                {icon}
                <h3 className={`text-xs sm:text-sm font-medium ${
                    isPurple ? 'text-white/90' : 'text-[#727A90]'
                }`}>
                    {title}
                </h3>
            </div>
            
            {/* Main Value */}
            <div className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isPurple ? 'text-white' : 'text-[#24282E]'
            }`}>
                {value}
            </div>
            
            {/* Change Indicator */}
            <div className={`flex items-center gap-2 text-sm ${
                isPurple ? 'text-white' : 'text-[#24282E]'
            }`}>
                <span className="flex items-center gap-1">
                    {Number(percentage) >= 0 ? (
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.3737 3.54199V4.95866H11.0416L2.83203 13.1682L3.83078 14.167L12.0404 5.95741V10.6253H13.457V3.54199H6.3737Z" fill="#20C9AC"/>
                        </svg>
                    ) : (
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.457 6.37467H12.0404V11.0426L3.83078 2.83301L2.83203 3.83176L11.0416 12.0413H6.3737V13.458H13.457V6.37467Z" fill="#FC3400"/>
                        </svg>
                    )}
                    {percentage}%
                </span>
                <span className="opacity-80">+{todayChange} today</span>
            </div>
        </div>
    );
}

