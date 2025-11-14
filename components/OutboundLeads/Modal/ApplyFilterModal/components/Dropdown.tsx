'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DropdownProps } from '../types';

export const Dropdown: React.FC<DropdownProps> = ({
    value,
    onChange,
    options,
    placeholder = 'Select option',
    label,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;

    return (
        <div className={className}>
            {label && (
                <label className="block text-sm text-[#727A90] mb-1">
                    {label}
                </label>
            )}
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full pl-4 pr-1 py-2 border-2 ${isOpen ? 'border-[#D1CEFF]' : 'border-[#EBEAED]'} rounded-sm bg-white text-sm flex items-center justify-between transition-colors hover:border-[#D1CEFF] ${
                        value ? 'text-[#24282E]' : 'text-[#727A90]'
                    }`}
                >
                    <span className="text-left flex-1">{displayValue}</span>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    >
                        <path d="M5 7.5L10 12.5L15 7.5H5Z" fill="#5542F6"/>
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-0.5 bg-white border-2 border-[#EBEAED] rounded-sm shadow-lg z-20 max-h-60 overflow-y-auto">
                        {options.map((option) => {
                            const isSelected = value === option.value;
                            
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                                        isSelected
                                            ? 'bg-[#5542F6] text-white'
                                            : 'bg-white text-[#24282E] hover:bg-[#F7F8FA]'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
