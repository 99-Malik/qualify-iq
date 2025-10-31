import React from 'react';

export default function ConversionRateCard() {
    const percentage = 70;
    const radius = 95; // Larger radius for bigger chart and more center space
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-white  h-full rounded-xl p-6 shadow-lg border border-[#E4E7EC]">
            <h3 className="text-lg font-semibold text-[#24282E] mb-6">Leads Conversion Rate</h3>
            <div className="flex flex-col items-center">
                {/* Donut Chart */}
                <div className="relative w-64 h-64 mb-6 flex items-center justify-center">
                    <svg width="256" height="256" viewBox="0 0 200 200" className="transform -rotate-90">
                        {/* Background circle - light gray */}
                        <circle
                            cx="100"
                            cy="100"
                            r={radius}
                            fill="none"
                            stroke="#E4E7EC"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />
                        {/* Progress circle - purple */}
                        <circle
                            cx="100"
                            cy="100"
                            r={radius}
                            fill="none"
                            stroke="#5542F6"
                            strokeWidth="10"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                        />
                    </svg>
                    {/* Percentage text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#24282E] leading-none">{percentage}%</div>
                            <div className="text-sm text-[#727A90] mt-1.5">Conversion Rate</div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#E4E7EC] mb-6"></div>

                {/* Feedback section */}

            </div>
            <div className="flex  items-center gap-3 text-sm">
                {/* Circular icon with light purple background and white smiley */}
                <div className=" flex items-center justify-center shrink-0">
                    <svg width="50" height="50" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="38" height="38" rx="19" fill="#5542F6" fill-opacity="0.1" />
                        <path d="M18.9927 11.083C14.6227 11.083 11.084 14.6297 11.084 18.9997C11.084 23.3697 14.6227 26.9163 18.9927 26.9163C23.3707 26.9163 26.9173 23.3697 26.9173 18.9997C26.9173 14.6297 23.3707 11.083 18.9927 11.083ZM19.0007 25.333C15.5015 25.333 12.6673 22.4988 12.6673 18.9997C12.6673 15.5005 15.5015 12.6663 19.0007 12.6663C22.4998 12.6663 25.334 15.5005 25.334 18.9997C25.334 22.4988 22.4998 25.333 19.0007 25.333ZM21.7715 18.208C22.4286 18.208 22.959 17.6776 22.959 17.0205C22.959 16.3634 22.4286 15.833 21.7715 15.833C21.1144 15.833 20.584 16.3634 20.584 17.0205C20.584 17.6776 21.1144 18.208 21.7715 18.208ZM16.2298 18.208C16.8869 18.208 17.4173 17.6776 17.4173 17.0205C17.4173 16.3634 16.8869 15.833 16.2298 15.833C15.5727 15.833 15.0423 16.3634 15.0423 17.0205C15.0423 17.6776 15.5727 18.208 16.2298 18.208ZM19.0007 23.3538C20.8452 23.3538 22.4127 22.198 23.0461 20.583H14.9552C15.5886 22.198 17.1561 23.3538 19.0007 23.3538Z" fill="#5542F6" />
                    </svg>
                </div>
                <div>
                    <div className="text-[#24282E] font-semibold">It's good enough</div>
                    <div className="text-[#24282E]">But we think it can be better</div>
                </div>
            </div>
        </div>
    );
}

