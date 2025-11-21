'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DropdownProps } from '../types';

export const Dropdown: React.FC<DropdownProps> = ({
    value,
    onChange,
    options,
    placeholder = 'Select option',
    label,
    className = '',
    buttonClassName = '',
    openUpward = false,
    bg,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleScroll = (event: Event) => {
            // Don't close if scrolling inside the dropdown itself
            if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
                return;
            }
            setIsOpen(false);
        };

        const handleResize = () => {
            setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScroll, true);
            window.addEventListener('resize', handleResize);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const dropdownHeight = Math.min(options.length * 48, 240); // Max height 240px
            const viewportHeight = window.innerHeight;
            const spaceAbove = rect.top;
            const spaceBelow = viewportHeight - rect.bottom;
            
            // If openUpward is requested, check if there's enough space above
            // If not enough space above but enough below, open downward instead
            const shouldOpenUpward = openUpward && spaceAbove >= dropdownHeight + 10; // 10px buffer
            
            let top: number;
            if (shouldOpenUpward) {
                top = rect.top - dropdownHeight - 2; // 2px gap
                // Ensure it doesn't go above viewport
                if (top < 2) {
                    top = 2;
                }
            } else {
                // Open downward
                top = rect.bottom + 2; // 2px gap
                // Ensure it doesn't go below viewport
                if (top + dropdownHeight > viewportHeight - 2) {
                    top = Math.max(2, viewportHeight - dropdownHeight - 2);
                }
            }
            
            setDropdownPosition({
                top: Math.max(2, Math.min(top, viewportHeight - dropdownHeight - 2)), // Clamp to viewport
                left: rect.left,
                width: rect.width,
            });
        }
    }, [isOpen, openUpward, options.length]);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;

    return (
        <div className={className}>
            {label && (
                <label className="block text-xs text-[#727A90] mb-1">
                    {label}
                </label>
            )}
            <div className="relative" ref={dropdownRef}>
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full pl-4 pr-1 py-2 ${buttonClassName ? (isOpen ? 'border-[#5542F6]' : '') : `border ${isOpen ? 'border-[#5542F6]' : 'border-[#EBEAED]'} rounded-sm`} bg-white text-xs flex items-center justify-between transition-colors ${buttonClassName ? '' : 'hover:border-[#D1CEFF]'} ${
                        value ? 'text-[#24282E]' : 'text-[#727A90]'
                    } ${buttonClassName}`}
                >
                    <span className="text-left flex-1 text-xs">{displayValue}</span>
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
            </div>

            {isOpen && typeof window !== 'undefined' && createPortal(
                <div
                    ref={dropdownRef}
                    className="fixed border-2 border-[#EBEAED] rounded-sm shadow-lg z-[100] max-h-60 overflow-y-auto custom-scroll"
                    style={{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        width: `${dropdownPosition.width}px`,
                        backgroundColor: bg || 'white',
                    }}
                >
                    {options.map((option) => {
                        const isSelected = value === option.value;
                        
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full px-4 py-3 text-left text-xs transition-colors ${
                                    isSelected
                                        ? 'bg-[#5542F6] text-xs text-white'
                                        : 'bg-white text-[#24282E] text-xs hover:bg-[#F7F8FA]'
                                }`}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>,
                document.body
            )}
        </div>
    );
};
