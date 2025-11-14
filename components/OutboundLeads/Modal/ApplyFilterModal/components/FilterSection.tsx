'use client';

import React from 'react';
import { FilterSectionProps } from '../types';

export const FilterSection: React.FC<FilterSectionProps> = ({
    section,
    icon,
    onToggle,
    children,
}) => {
    return (
        <div className="bg-[#fbfafc] border border-[#E4E7EC] rounded-sm">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
                type="button"
            >
                <div className="flex items-center gap-3 flex-1">
                    {icon}
                    <span className="text-sm font-medium text-[#24282E]">{section.label}</span>
                </div>
                {/* Plus/Minus Icon */}
                {section.isExpanded ? (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                    >
                        <path d="M4 10H16" stroke="#5542F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                    >
                        <path d="M10 4V16M4 10H16" stroke="#5542F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </button>
            {section.isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                    {children}
                </div>
            )}
        </div>
    );
};

