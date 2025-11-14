'use client';

import React from 'react';
import { Dropdown } from '../components/Dropdown';
import { DropdownOption } from '../types';

interface IndustryFilterProps {
    industry: string;
    onIndustryChange: (value: string) => void;
    industryClassification: string;
    onIndustryClassificationChange: (value: string) => void;
    niasCode: string;
    onNiasCodeChange: (value: string) => void;
}

const industryOptions: DropdownOption[] = [
    { value: 'tech', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
];

const industryClassificationOptions: DropdownOption[] = [
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'tertiary', label: 'Tertiary' },
];

export const IndustryFilter: React.FC<IndustryFilterProps> = ({
    industry,
    onIndustryChange,
    industryClassification,
    onIndustryClassificationChange,
    niasCode,
    onNiasCodeChange,
}) => {
    return (
        <div className="space-y-3">
            {/* Industry Dropdown */}
            <div>
                <label className="block text-sm text-[#727A90] mb-1">Industry</label>
                <Dropdown
                    value={industry}
                    onChange={onIndustryChange}
                    options={industryOptions}
                    placeholder="Industry"
                    className="w-full"
                />
            </div>

            {/* Industry Classification Dropdown */}
            <div>
                <label className="block text-sm text-[#727A90] mb-1">Industry Classification</label>
                <Dropdown
                    value={industryClassification}
                    onChange={onIndustryClassificationChange}
                    options={industryClassificationOptions}
                    placeholder="Industry Classification"
                    className="w-full"
                />
            </div>

            {/* Search by NIAS Code Input */}
            <div>
                <label className="block text-sm text-[#727A90] mb-1">Search by NIAS Code</label>
                <input
                    type="text"
                    value={niasCode}
                    onChange={(e) => onNiasCodeChange(e.target.value)}
                    className="w-full px-3 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
                    placeholder="Search by NIAS Code"
                />
            </div>
        </div>
    );
};

