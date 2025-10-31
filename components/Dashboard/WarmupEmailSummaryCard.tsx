import React from 'react';

export default function WarmupEmailSummaryCard() {
    const metrics = [
        { label: 'Total Email Sent', value: '13,596', total: '23,008', percentage: 59, color: '#5542F6' },
        { label: 'Spam Rate', value: '2%', total: '23,008', percentage: 2, color: '#FC3400' },
        { label: 'Reply Rate', value: '40%', total: '23,008', percentage: 40, color: '#14B13B' },
        { label: 'BOUNCE RATE', value: '60%', total: '23,008', percentage: 60, color: '#EC4899' },
    ];

    return (
        <div className="bg-white rounded-xl h-full p-5 sm:p-6 shadow-lg border border-[#E4E7EC] flex flex-col">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 shrink-0">
                <div className="flex-1">
                    {/* Email dropdown at top left */}
                    <div className="mb-2 relative inline-block">
                        <select className="text-sm text-[#5542F6] border-none bg-transparent font-medium appearance-none cursor-pointer pr-6">
                            <option>abc123@gmail.com</option>
                        </select>
                        <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 12 12" fill="none">
                            <path d="M2 4L6 8L10 4H2Z" fill="#24282E" />
                        </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#24282E] mb-1">Warmup Email Summary</h3>
                    <p className="text-sm text-[#727A90]">You can view all metrics of warmup email from here.</p>
                </div>
                {/* Show stats dropdown at top right */}
                <button className="inline-flex items-center justify-between bg-white rounded-md px-2.5 sm:px-4 py-1.5 sm:py-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#F1F2F6] hover:bg-[#F7F8FA] transition-colors self-start sm:self-auto">
                    <span className="text-xs sm:text-base font-medium text-[#8C8A92] whitespace-nowrap">
                        Show stats: <span className="text-[#24282E] font-semibold">Yearly</span>
                    </span>
                    <svg className="shrink-0 ml-1.5 sm:ml-2" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9H6Z" fill="#84818A" />
                    </svg>
                </button>
            </div>
            
            {/* Metrics Grid - fills remaining space */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                {metrics.map((metric) => (
                    <div key={metric.label} className="bg-white border border-[#E4E7EC] rounded-lg p-4 min-w-0 flex flex-col">
                        {/* Title at top left */}
                        <span className="text-sm text-[#727A90] font-normal mb-3 shrink-0">{metric.label}</span>
                        {/* Value on left, "from" text on right */}
                        <div className="flex items-baseline justify-between mb-3 shrink-0">
                            <span className="text-lg sm:text-xl font-bold text-[#24282E]">{metric.value}</span>
                            <span className="text-xs text-[#727A90] font-normal">from {metric.total}</span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full bg-[#F4F5FA] rounded-full h-2 overflow-hidden mt-auto">
                            <div
                                className="h-full rounded-full transition-all"
                                style={{
                                    width: `${metric.percentage}%`,
                                    backgroundColor: metric.color,
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

