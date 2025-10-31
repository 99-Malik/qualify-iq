'use client';

import React, { useState, useRef, useEffect } from 'react';

interface RowsPerPageDropdownProps {
    value: number;
    onChange: (value: number) => void;
    options?: number[];
    className?: string;
}

export default function RowsPerPageDropdown({
    value,
    onChange,
    options = [10, 25, 50, 100],
    className = ''
}: RowsPerPageDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (option: number) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Input field */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full min-w-[80px] px-3 py-2 rounded-lg border text-sm text-[#24282E] bg-white hover:bg-[#F7F8FA] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] transition-all duration-200 flex items-center justify-between ${
                    isOpen ? 'border-[#D1CEFF] shadow-sm' : 'border-[#E4E7EC]'
                }`}
            >
                <span className="font-medium">{value}</span>
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path
                        d="M4 6L8 10L12 6H4Z"
                        fill="#24282E"
                    />
                </svg>
            </button>

            {/* Dropdown panel */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-full min-w-[80px] bg-white rounded-lg border border-[#E4E7EC] shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-50 overflow-hidden">
                    <div className="py-1">
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className={`w-full px-4 py-2.5 text-sm text-center transition-all duration-150 ${
                                    option === value
                                        ? 'bg-[#5542F6] text-white font-medium'
                                        : 'text-[#24282E] hover:bg-[#F7F8FA]'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

