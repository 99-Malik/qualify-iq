'use client';

import React from 'react';

interface EducationFilterProps {
    school: string;
    onSchoolChange: (value: string) => void;
    major: string;
    onMajorChange: (value: string) => void;
}

export const EducationFilter: React.FC<EducationFilterProps> = ({
    school,
    onSchoolChange,
    major,
    onMajorChange,
}) => {
    return (
        <div className="space-y-3">
            <div>
                <label className="block text-sm text-[#727A90] mb-1">School</label>
                <input
                    type="text"
                    value={school}
                    onChange={(e) => onSchoolChange(e.target.value)}
                    className="w-full px-3 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
                    placeholder="Search here"
                />
            </div>
            <div>
                <label className="block text-sm text-[#727A90] mb-1">Major</label>
                <input
                    type="text"
                    value={major}
                    onChange={(e) => onMajorChange(e.target.value)}
                    className="w-full px-3 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
                    placeholder="Search here"
                />
            </div>
        </div>
    );
};

