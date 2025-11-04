'use client';

import React, { useState, useRef, useEffect } from 'react';

interface PreviewDropdownProps {
    value: string;
    options: string[];
    onChange?: (value: string) => void;
    placeholder?: string;
    paddingY?: string;
    disabled?: boolean;
    width?: string; // Custom width prop (e.g., 'w-full', 'w-64', 'flex-1', etc.)
    borderRadius?: string; // Custom border radius (e.g., 'rounded-lg', 'rounded-sm', 'rounded-md', etc.)
    fontWeight?: string; // Custom font weight (e.g., 'font-bold', 'font-semibold', 'font-normal', etc.)
    fontSize?: string; // Custom font size (e.g., 'text-sm', 'text-base', 'text-lg', etc.)
    textColor?: string; // Custom text color (e.g., 'text-[#24282E]', 'text-black', etc.)
    chevronIcon?: React.ReactNode; // Custom chevron SVG icon element
}

export default function PreviewDropdown({ value, options, onChange, placeholder, paddingY = 'py-4', disabled = false, width, borderRadius = 'rounded-sm', fontWeight, fontSize, textColor, chevronIcon }: PreviewDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || options[0] || placeholder || 'Option 1');
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

    const handleSelect = (option: string) => {
        setSelectedValue(option);
        if (onChange) {
            onChange(option);
        }
        setIsOpen(false);
    };

    const displayValue = selectedValue || placeholder || 'Option 1';
    const displayOptions = options.length > 0 ? options : [placeholder || 'Option 1'];

    return (
        <div className={`relative ${width || 'w-full'}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full px-4 ${paddingY} border-2 border-[#EBEAED] ${borderRadius} bg-white ${textColor || 'text-[#727A90]'} ${fontSize || 'text-sm'} flex items-center justify-between transition-colors ${
                    disabled 
                        ? 'cursor-not-allowed opacity-75' 
                        : 'hover:border-[#D1CEFF]'
                }`}
            >
                <span className={`text-left flex-1 ${fontWeight || ''} ${fontSize || 'text-sm'} ${textColor || 'text-[#727A90]'}`}>{displayValue}</span>
                {chevronIcon ? (
                    <div className={`transition-transform shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`}>
                        {chevronIcon}
                    </div>
                ) : (
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`}
                    >
                        <path d="M6 9.99984L7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984Z" fill="#84818A"/>
                    </svg>
                )}
            </button>

            {isOpen && !disabled && (
                <div className={`absolute top-full left-0 right-0 mt-0.5 bg-white border-2 border-[#EBEAED] ${borderRadius} shadow-lg z-20 max-h-60 overflow-y-auto scroll-hidden`}>
                    {displayOptions.map((option, index) => {
                        const optionText = option || `Option ${index + 1}`;
                        const isSelected = selectedValue === option || (index === 0 && !selectedValue);
                        
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                                    isSelected
                                        ? 'bg-[#5542F6] text-white'
                                        : 'bg-white text-[#24282E] hover:bg-[#F7F8FA]'
                                }`}
                            >
                                {optionText}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

