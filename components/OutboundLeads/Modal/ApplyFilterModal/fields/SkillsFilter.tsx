'use client';

import React, { useState } from 'react';

interface SkillsFilterProps {
    skills: string[];
    onSkillAdd: (value: string) => void;
    onSkillRemove: (index: number) => void;
}

export const SkillsFilter: React.FC<SkillsFilterProps> = ({
    skills,
    onSkillAdd,
    onSkillRemove,
}) => {
    const [skillInput, setSkillInput] = useState('');

    const handleAdd = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            onSkillAdd(skillInput.trim());
            setSkillInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            handleAdd();
        }
    };

    return (
        <div>
            <div className="flex-1 border border-[#E4E7EC] rounded-sm bg-white min-h-[40px] flex items-center px-2 overflow-x-auto scroll-hidden">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 bg-[#FBFAFC] rounded px-2 py-1 shrink-0"
                        >
                            <span className="text-xs text-[#24282E]">{skill}</span>
                            <button
                                onClick={() => onSkillRemove(index)}
                                className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                                type="button"
                            >
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_559_48561)">
                                        <path d="M5.00065 0.833984C2.70065 0.833984 0.833984 2.70065 0.833984 5.00065C0.833984 7.30065 2.70065 9.16732 5.00065 9.16732C7.30065 9.16732 9.16732 7.30065 9.16732 5.00065C9.16732 2.70065 7.30065 0.833984 5.00065 0.833984ZM7.08398 5.41732H2.91732V4.58398H7.08398V5.41732Z" fill="#84818A" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_559_48561">
                                            <rect width="10" height="10" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    ))}
                    <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 min-w-[100px] px-2 py-1 text-sm text-[#24282E] focus:outline-none"
                        placeholder="Enter skill"
                    />
                </div>
            </div>
        </div>
    );
};

