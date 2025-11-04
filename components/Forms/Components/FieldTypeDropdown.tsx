'use client';

import { div, svg } from 'framer-motion/client';
import { useState, useRef, useEffect } from 'react';

export type FieldType = 'multiple-choice' | 'email' | 'text' | 'dropdown' | 'phone-number' | 'long-description';

interface FieldTypeOption {
    id: FieldType;
    label: string;
    icon: React.ReactNode;
}

interface FieldTypeDropdownProps {
    value: FieldType;
    onChange: (type: FieldType) => void;
}

const fieldTypes: FieldTypeOption[] = [
    {
        id: 'multiple-choice',
        label: 'Multiple Choice',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#5542F6" />
            </svg>

        )
    },
    {
        id: 'email',
        label: 'Email',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#5542F6" />
            </svg>

        )
    },
    {
        id: 'text',
        label: 'Text',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4V7H7.5V19H10.5V7H15.5V4H2.5ZM21.5 9H12.5V12H15.5V19H18.5V12H21.5V9Z" fill="#5542F6"/>
            </svg>
            
        )
    },
    {
        id: 'dropdown',
        label: 'Dropdown',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9H6Z" fill="#5542F6"/>
            </svg>
            
        )
    },
    {
        id: 'phone-number',
        label: 'Phone Number',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9C10.4 9 8.85 9.25 7.4 9.72V12.82C7.4 13.21 7.17 13.56 6.84 13.72C5.86 14.21 4.97 14.84 4.18 15.57C4 15.75 3.75 15.85 3.48 15.85C3.2 15.85 2.95 15.74 2.77 15.56L0.29 13.08C0.11 12.91 0 12.66 0 12.38C0 12.1 0.11 11.85 0.29 11.67C3.34 8.78 7.46 7 12 7C16.54 7 20.66 8.78 23.71 11.67C23.89 11.85 24 12.1 24 12.38C24 12.66 23.89 12.91 23.71 13.09L21.23 15.57C21.05 15.75 20.8 15.86 20.52 15.86C20.25 15.86 20 15.75 19.82 15.58C19.03 14.84 18.13 14.22 17.15 13.73C16.82 13.57 16.59 13.23 16.59 12.83V9.73C15.15 9.25 13.6 9 12 9Z" fill="#5542F6"/>
            </svg>
            
        )
    },
    {
        id: 'long-description',
        label: 'Long Description',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12H20V14H4V12ZM4 16H14V18H4V16Z" fill="#5542F6"/>
            <path d="M4 5H20V7H4V5ZM4 9H14V11H4V9Z" fill="#5542F6"/>
            </svg>
            
        )
    }
];

export default function FieldTypeDropdown({ value, onChange }: FieldTypeDropdownProps) {
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

    const selectedType = fieldTypes.find(type => type.id === value);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-4 bg-white border border-[#E4E7EC] rounded-md hover:bg-[#F7F8FA] transition-colors w-full justify-between"
            >
                <div className="flex items-center gap-2">
                    {selectedType?.icon}
                    <span className="text-sm font-medium text-[#24282E]">{selectedType?.label}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="#504F54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full h-40 overflow-y-auto custom-scroll left-0 mt-1 bg-white border border-[#E4E7EC] rounded-lg shadow-lg z-10 w-full min-w-[200px]">
                    {fieldTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => {
                                onChange(type.id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-4 text-left hover:bg-[#F7F8FA] transition-colors ${value === type.id ? 'bg-[#dbd9ee] border-none' : 'border-b border-2 border-[#E4E7EC]'
                                }`}
                        >
                            {type.icon}
                            <span className="text-sm font-medium text-[#24282E]">{type.label}</span>
                            {value === type.id && (
                                <div className="ml-auto">
                               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M9.00016 16.1701L4.83016 12.0001L3.41016 13.4101L9.00016 19.0001L21.0002 7.00009L19.5902 5.59009L9.00016 16.1701Z" fill="#5542F6"/>
                               </svg>
                               </div>
                               
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

