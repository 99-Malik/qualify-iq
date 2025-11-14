'use client';

import React from 'react';

interface YearFoundedFilterProps {
    yearFounded: string;
    onYearFoundedChange: (value: string) => void;
}

export const YearFoundedFilter: React.FC<YearFoundedFilterProps> = ({
    yearFounded,
    onYearFoundedChange,
}) => {
    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    value={yearFounded}
                    onChange={(e) => onYearFoundedChange(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:ring-2 focus:ring-[#EDECFE] focus:border-[#5542F6]"
                    placeholder="Year Founded"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1667 10.8346H10V15.0013H14.1667V10.8346ZM13.3333 1.66797V3.33464H6.66667V1.66797H5V3.33464H4.16667C3.24167 3.33464 2.50833 4.08464 2.50833 5.0013L2.5 16.668C2.5 17.5846 3.24167 18.3346 4.16667 18.3346H15.8333C16.75 18.3346 17.5 17.5846 17.5 16.668V5.0013C17.5 4.08464 16.75 3.33464 15.8333 3.33464H15V1.66797H13.3333ZM15.8333 16.668H4.16667V7.5013H15.8333V16.668Z" fill="#84818A" />
                    </svg>

                </div>
            </div>
        </div>
    );
};

