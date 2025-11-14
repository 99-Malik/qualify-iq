'use client';

import React from 'react';

interface PastCompanyFilterProps {
    company: string;
    onCompanyChange: (value: string) => void;
}

export const PastCompanyFilter: React.FC<PastCompanyFilterProps> = ({
    company,
    onCompanyChange,
}) => {
    return (
        <div>
            <label className="block text-sm text-[#727A90] mb-1">Company</label>
            <input
                type="text"
                value={company}
                onChange={(e) => onCompanyChange(e.target.value)}
                className="w-full px-3 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
                placeholder="Search here"
            />
        </div>
    );
};

