'use client';

import React, { useState } from 'react';
import { Dropdown } from '../components/Dropdown';
import { DropdownOption } from '../types';

interface JobInfoFilterProps {
    jobTitles: string[];
    onJobTitleAdd: (value: string) => void;
    onJobTitleRemove: (index: number) => void;
    jobTitleLevel: string;
    onJobTitleLevelChange: (value: string) => void;
    jobRole: string;
    onJobRoleChange: (value: string) => void;
}

const jobTitleLevelOptions: DropdownOption[] = [
    { value: 'entry', label: 'Entry' },
    { value: 'mid', label: 'Mid' },
    { value: 'senior', label: 'Senior' },
    { value: 'executive', label: 'Executive' },
];

const jobRoleOptions: DropdownOption[] = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
    { value: 'analyst', label: 'Analyst' },
];

export const JobInfoFilter: React.FC<JobInfoFilterProps> = ({
    jobTitles,
    onJobTitleAdd,
    onJobTitleRemove,
    jobTitleLevel,
    onJobTitleLevelChange,
    jobRole,
    onJobRoleChange,
}) => {
    const [jobTitleInput, setJobTitleInput] = useState('');

    const handleInclude = () => {
        // Add Job Title if input has value
        if (jobTitleInput.trim() && !jobTitles.includes(jobTitleInput.trim())) {
            onJobTitleAdd(jobTitleInput.trim());
            setJobTitleInput('');
        }

        // Add Job Title Level if selected
        if (jobTitleLevel) {
            const selectedOption = jobTitleLevelOptions.find(opt => opt.value === jobTitleLevel);
            if (selectedOption && !jobTitles.includes(selectedOption.label)) {
                onJobTitleAdd(selectedOption.label);
                onJobTitleLevelChange('');
            }
        }

        // Add Job Role if selected
        if (jobRole) {
            const selectedOption = jobRoleOptions.find(opt => opt.value === jobRole);
            if (selectedOption && !jobTitles.includes(selectedOption.label)) {
                onJobTitleAdd(selectedOption.label);
                onJobRoleChange('');
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleInclude();
        }
    };

    const hasAnySelection = jobTitleInput.trim() || jobTitleLevel || jobRole;

    return (
        <div className="space-y-3">
            {/* Job Title with Pills Container */}
            <div>
                <label className="block text-sm text-[#727A90] mb-1">Job Title</label>
                <div className="flex items-center gap-2">
                    <div className="flex-1 border border-[#E4E7EC] rounded-sm bg-white min-h-[40px] flex items-center px-2 overflow-x-auto scroll-hidden">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            {jobTitles.map((title, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 bg-[#FBFAFC] rounded px-2 py-1 shrink-0"
                                >
                                    <span className="text-xs text-[#24282E]">{title}</span>
                                    <button
                                        onClick={() => onJobTitleRemove(index)}
                                        className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                                        type="button"
                                    >
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_559_48561)">
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
                                value={jobTitleInput}
                                onChange={(e) => setJobTitleInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 min-w-[100px] px-2 py-1 text-sm text-[#24282E] focus:outline-none"
                                placeholder="Enter job title"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleInclude}
                        disabled={!hasAnySelection}
                        className="px-4 py-2 bg-[#e9e8fb] border-2 border-[#5542F6] rounded-sm text-sm font-bold text-[#5542F6] hover:bg-[#E0DEFE] transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                    >
                        Include
                    </button>
                </div>
            </div>

            <div className="flex gap-3">
                <Dropdown
                    value={jobTitleLevel}
                    onChange={onJobTitleLevelChange}
                    options={jobTitleLevelOptions}
                    placeholder="Select level"
                    label="Job Title Level"
                    className="flex-1"
                />
                <Dropdown
                    value={jobRole}
                    onChange={onJobRoleChange}
                    options={jobRoleOptions}
                    placeholder="Select role"
                    label="Job Role"
                    className="flex-1"
                />
            </div>
        </div>
    );
};
