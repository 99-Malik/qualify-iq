'use client';

import React from 'react';

interface NameFilterProps {
    firstName: string;
    lastName: string;
    onFirstNameChange: (value: string) => void;
    onLastNameChange: (value: string) => void;
}

export const NameFilter: React.FC<NameFilterProps> = ({
    firstName,
    lastName,
    onFirstNameChange,
    onLastNameChange,
}) => {
    return (
        <div className="flex gap-3">
            <div className="flex-1">
                <label className="block text-sm text-[#727A90] mb-1">First Name (Exact Match)</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => onFirstNameChange(e.target.value)}
                    className="w-full px-3 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
                    placeholder="Enter first name"
                />
            </div>
            <div className="flex-1">
                <label className="block text-sm text-[#727A90] mb-1">Last Name (Exact Match)</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => onLastNameChange(e.target.value)}
                    className="w-full px-3 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
                    placeholder="Enter last name"
                />
            </div>
        </div>
    );
};

