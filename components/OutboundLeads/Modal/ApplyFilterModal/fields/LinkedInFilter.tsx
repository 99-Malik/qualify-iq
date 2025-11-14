'use client';

import React from 'react';

interface LinkedInFilterProps {
    url: string;
    onUrlChange: (value: string) => void;
}

export const LinkedInFilter: React.FC<LinkedInFilterProps> = ({
    url,
    onUrlChange,
}) => {
    return (
        <div>
            <label className="block text-sm text-[#727A90] mb-1">URL</label>
            <input
                type="text"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                className="w-full px-3 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
                placeholder="www.linkedin/profile.com"
            />
        </div>
    );
};

