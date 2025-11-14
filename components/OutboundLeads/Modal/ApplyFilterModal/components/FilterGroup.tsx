'use client';

import React from 'react';

interface FilterGroupProps {
    title: string;
    children: React.ReactNode;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({ title, children }) => {
    return (
        <div className="mb-6">
            <div className="relative flex items-center justify-center mb-4">
                <div className="absolute left-0 right-0 h-px bg-[#EAECEF]"></div>
                <h3 className="relative bg-white px-3 text-sm text-[#84818A]">{title}</h3>
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
};

