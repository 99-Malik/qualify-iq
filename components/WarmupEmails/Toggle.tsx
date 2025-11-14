'use client';

import React from 'react';

interface ToggleProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    className?: string;
}

export default function Toggle({ enabled, onChange, className = '' }: ToggleProps) {
    return (
        <button
            onClick={() => onChange(!enabled)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${enabled ? 'bg-[#34C759]' : 'bg-[#D1D5DB]'} ${className}`}
        >
            <span
                className={`absolute top-0.5 left-0.5 w-6 h-5 bg-white rounded-[10px] transition-transform shadow-sm ${enabled ? 'translate-x-4' : 'translate-x-0'}`}
            />
        </button>
    );
}

