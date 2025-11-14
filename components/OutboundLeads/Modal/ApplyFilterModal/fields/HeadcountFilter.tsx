'use client';

import React from 'react';
import { Dropdown } from '../components/Dropdown';
import { DropdownOption } from '../types';

interface HeadcountFilterProps {
    headcount: string;
    onHeadcountChange: (value: string) => void;
}

const headcountOptions: DropdownOption[] = [
    { value: '1-10', label: '1-10' },
    { value: '11-50', label: '11-50' },
    { value: '51-200', label: '51-200' },
    { value: '201-500', label: '201-500' },
    { value: '501-1000', label: '501-1000' },
    { value: '1000+', label: '1000+' },
];

export const HeadcountFilter: React.FC<HeadcountFilterProps> = ({
    headcount,
    onHeadcountChange,
}) => {
    return (
        <div>
            <Dropdown
                value={headcount}
                onChange={onHeadcountChange}
                options={headcountOptions}
                placeholder="Company Headcount"
                className="w-full"
            />
        </div>
    );
};

