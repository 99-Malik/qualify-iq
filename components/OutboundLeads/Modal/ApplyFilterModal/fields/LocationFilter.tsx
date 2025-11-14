'use client';

import React, { useState } from 'react';
import { Dropdown } from '../components/Dropdown';
import { DropdownOption } from '../types';

interface LocationFilterProps {
    locations: string[];
    onLocationAdd: (value: string) => void;
    onLocationRemove: (index: number) => void;
    cityPostalCode: string;
    onCityPostalCodeChange: (value: string) => void;
    radius: string;
    onRadiusChange: (value: string) => void;
}

const radiusOptions: DropdownOption[] = [
    { value: '5', label: '5 miles' },
    { value: '10', label: '10 miles' },
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' },
    { value: '100', label: '100 miles' },
];

export const LocationFilter: React.FC<LocationFilterProps> = ({
    locations,
    onLocationAdd,
    onLocationRemove,
    cityPostalCode,
    onCityPostalCodeChange,
    radius,
    onRadiusChange,
}) => {
    const [searchInput, setSearchInput] = useState('');

    const handleAdd = () => {
        // Add search input if it has value
        if (searchInput.trim() && !locations.includes(searchInput.trim())) {
            onLocationAdd(searchInput.trim());
            setSearchInput('');
        }

        // Add city/postal code if it has value
        if (cityPostalCode.trim() && !locations.includes(cityPostalCode.trim())) {
            onLocationAdd(cityPostalCode.trim());
            onCityPostalCodeChange('');
        }
    };

    const hasAnySelection = searchInput.trim() || cityPostalCode.trim();

    return (
        <div className="space-y-3">
            {/* Type or search locations */}
            <div>
                <label className="block text-sm text-[#727A90] mb-1">Type or search locations</label>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && hasAnySelection) {
                            handleAdd();
                        }
                    }}
                    className="w-full px-3 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
                    placeholder="Search here"
                />
            </div>

            {/* Radius Search */}
            <div>
                <div className="flex items-center gap-1 mb-1">
                    <label className="block text-sm text-[#727A90]">Radius Search</label>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="7.5" stroke="#84818A" strokeWidth="1"/>
                        <path d="M8 4.5V7.5M8 11.5H8.01" stroke="#84818A" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className="space-y-3">
                    <input
                        type="text"
                        value={cityPostalCode}
                        onChange={(e) => onCityPostalCodeChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && hasAnySelection) {
                                handleAdd();
                            }
                        }}
                        className="w-full px-3 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
                        placeholder="Search by City or Postal Code"
                    />
                    <Dropdown
                        value={radius}
                        onChange={onRadiusChange}
                        options={radiusOptions}
                        placeholder="Select Radius"
                        className="w-full"
                    />
                </div>
            </div>

            {/* Locations Pills Container */}
            {locations.length > 0 && (
                <div>
                    <div className="flex-1 border border-[#E4E7EC] rounded-sm bg-white min-h-[40px] flex items-center px-2 overflow-x-auto scroll-hidden">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            {locations.map((location, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 bg-[#FBFAFC] rounded px-2 py-1 shrink-0"
                                >
                                    <span className="text-xs text-[#24282E]">{location}</span>
                                    <button
                                        onClick={() => onLocationRemove(index)}
                                        className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                                        type="button"
                                    >
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_559_48561)">
                                                <path d="M5.00065 0.833984C2.70065 0.833984 0.833984 2.70065 0.833984 5.00065C0.833984 7.30065 2.70065 9.16732 5.00065 9.16732C7.30065 9.16732 9.16732 7.30065 9.16732 5.00065C9.16732 2.70065 7.30065 0.833984 5.00065 0.833984ZM7.08398 5.41732H2.91732V4.58398H7.08398V5.41732Z" fill="#84818A" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_559_48561">
                                                    <rect width="10" height="10" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Add Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleAdd}
                    disabled={!hasAnySelection}
                    className="px-4 py-2 bg-[#e9e8fb] border-2 border-[#5542F6] rounded-sm text-sm font-bold text-[#5542F6] hover:bg-[#E0DEFE] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                >
                    Add
                </button>
            </div>
        </div>
    );
};

