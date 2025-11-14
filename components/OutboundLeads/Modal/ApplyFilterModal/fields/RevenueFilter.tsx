'use client';

import React from 'react';
import { Dropdown } from '../components/Dropdown';
import { DropdownOption } from '../types';

interface RevenueFilterProps {
    revenue: string;
    onRevenueChange: (value: string) => void;
}

const revenueOptions: DropdownOption[] = [
    { value: '0-1M', label: '$0 - $1M' },
    { value: '1M-10M', label: '$1M - $10M' },
    { value: '10M-50M', label: '$10M - $50M' },
    { value: '50M-100M', label: '$50M - $100M' },
    { value: '100M-500M', label: '$100M - $500M' },
    { value: '500M+', label: '$500M+' },
];

export const RevenueFilter: React.FC<RevenueFilterProps> = ({
    revenue,
    onRevenueChange,
}) => {
    return (
        <div>
            <Dropdown
                value={revenue}
                onChange={onRevenueChange}
                options={revenueOptions}
                placeholder="Revenue"
                className="w-full"
            />
        </div>
    );
};

