'use client';

import React, { useState } from 'react';
import { PillInputProps } from '../types';

export const PillInput: React.FC<PillInputProps> = ({
    values,
    onAdd,
    onRemove,
    placeholder = 'Enter value',
    label,
    includeButtonText = 'Include',
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        if (inputValue.trim()) {
            onAdd(inputValue.trim());
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            handleAdd();
        }
    };

    return (
        <div>
            {label && (
                <label className="block text-sm text-[#727A90] mb-1">
                    {label}
                </label>
            )}
            <div className="flex items-center gap-2">
                <div className="flex-1 border border-[#E4E7EC] rounded-sm bg-white min-h-[40px] flex items-center px-2 overflow-x-auto">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 bg-[#F5F5F5] rounded px-2 py-1 shrink-0"
                            >
                                <span className="text-sm text-[#24282E]">{value}</span>
                                <button
                                    onClick={() => onRemove(index)}
                                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                                    type="button"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 min-w-[100px] px-2 py-1 text-sm text-[#24282E] focus:outline-none"
                            placeholder={placeholder}
                        />
                    </div>
                </div>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-[#EDECFE] border border-[#5542F6] rounded-sm text-sm font-medium text-[#5542F6] hover:bg-[#E0DEFE] transition-colors shrink-0"
                    type="button"
                >
                    {includeButtonText}
                </button>
            </div>
        </div>
    );
};

