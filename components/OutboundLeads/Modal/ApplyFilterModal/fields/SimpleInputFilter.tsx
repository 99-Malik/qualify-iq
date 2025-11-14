'use client';

import React from 'react';

interface SimpleInputFilterProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SimpleInputFilter: React.FC<SimpleInputFilterProps> = ({
    value,
    onChange,
    placeholder = 'Enter value',
}) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
            placeholder={placeholder}
        />
    );
};

