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
    const [openAbove, setOpenAbove] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            
            // Calculate position based on available space
            const calculatePosition = () => {
                if (buttonRef.current) {
                    const buttonRect = buttonRef.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    // Estimate dropdown height: ~40px per option + 8px padding
                    const estimatedDropdownHeight = options.length * 40 + 8;
                    const spaceBelow = viewportHeight - buttonRect.bottom;
                    const spaceAbove = buttonRect.top;
                    
                    // If not enough space below but enough space above, open upward
                    if (spaceBelow < estimatedDropdownHeight && spaceAbove > estimatedDropdownHeight) {
                        setOpenAbove(true);
                    } else {
                        setOpenAbove(false);
                    }
                }
            };
            
            // Calculate position immediately
            calculatePosition();
            
            // Refine position after dropdown renders with actual height
            const refinePosition = () => {
                if (buttonRef.current && panelRef.current) {
                    const buttonRect = buttonRef.current.getBoundingClientRect();
                    const panelRect = panelRef.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const dropdownHeight = panelRect.height;
                    const spaceBelow = viewportHeight - buttonRect.bottom;
                    const spaceAbove = buttonRect.top;
                    
                    // Check if dropdown is currently positioned above or below based on its actual position
                    const isCurrentlyAbove = panelRect.top < buttonRect.top;
                    
                    // If dropdown is below and gets cut off, try opening above
                    if (!isCurrentlyAbove && spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                        setOpenAbove(true);
                    } 
                    // If dropdown is above and gets cut off, try opening below and scroll
                    else if (isCurrentlyAbove && spaceAbove < dropdownHeight) {
                        setOpenAbove(false);
                        // Scroll to ensure dropdown is visible
                        const scrollAmount = dropdownHeight - spaceBelow + 20;
                        if (scrollAmount > 0) {
                            window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                        }
                    }
                    // If dropdown is below and gets cut off but can't open above, scroll
                    else if (!isCurrentlyAbove && spaceBelow < dropdownHeight && spaceAbove < dropdownHeight) {
                        const scrollAmount = dropdownHeight - spaceBelow + 20;
                        if (scrollAmount > 0) {
                            window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                        }
                    }
                }
            };
            
            // Refine after a short delay to allow DOM to update
            setTimeout(refinePosition, 0);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, options.length]);

    const handleSelect = (option: number) => {
        onChange(option);
        setIsOpen(false);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Input field */}
            <button
                ref={buttonRef}
                type="button"
                onClick={handleToggle}
                className={`w-full min-w-[80px] px-3 py-1 rounded-lg border text-sm text-[#24282E] bg-white hover:bg-[#F7F8FA] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] transition-all duration-200 flex items-center justify-between ${
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
                <div
                    ref={panelRef}
                    className={`absolute left-0 w-full min-w-[80px] bg-white rounded-lg border border-[#E4E7EC] shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-50 overflow-hidden ${
                        openAbove ? 'bottom-full mb-1' : 'top-full mt-1'
                    }`}
                >
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

