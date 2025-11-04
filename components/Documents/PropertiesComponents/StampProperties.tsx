'use client';

import React from 'react';

export interface SavedStamp {
    id: number;
    text?: string;
    number?: string;
    name?: string;
    imageUrl?: string;
}

interface StampPropertiesProps {
    savedStamps?: SavedStamp[];
    onUploadStamp?: () => void;
    onStampSelect?: (stampId: number) => void;
}

export default function StampProperties({
    savedStamps = [],
    onUploadStamp,
    onStampSelect
}: StampPropertiesProps) {
    // Default stamps for preview (can be replaced with actual savedStamps)
    const displayStamps = savedStamps.length > 0 ? savedStamps : [
        { id: 1, text: 'ACADEMICS', number: '0941 380431', name: 'JASTINIAH' },
        { id: 2, text: 'ACADEMICS', number: '0941 380431', name: 'JASTINIAH' },
        { id: 3, text: 'ACADEMICS', number: '0941 380431', name: 'JASTINIAH' },
        { id: 4, text: 'ACADEMICS', number: '0941 380431', name: 'JASTINIAH' },
        { id: 5, text: 'ACADEMICS', number: '0941 380431', name: 'JASTINIAH' },
    ];

    return (
        <div className="w-56 lg:w-64 2xl:w-96 shrink-0 px-4 py-6 bg-white border border-[#E4E7EC] rounded-lg">
            {/* Properties Button */}
            <button className="w-full px-4 py-3 bg-white border-3 border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors mb-3">
                <span className="text-lg font-extrabold text-[#24282E]">Properties</span>
            </button>

            {/* Upload Stamp Button */}
            <div className="mb-6">
                <button
                    onClick={onUploadStamp}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white border-3 border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors"
                >
                    {/* Upload Icon - Purple */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8346 7.5H12.5013V2.5H7.5013V7.5H4.16797L10.0013 13.3333L15.8346 7.5ZM4.16797 15V16.6667H15.8346V15H4.16797Z" fill="#5542F6" />
                    </svg>
                    <span className="text-md font-semibold text-[#24282E]">Upload Stamp</span>
                </button>
            </div>

            {/* Saved Stamps - Vertical List with Scalloped Borders */}
            {displayStamps.length > 0 && (
                <div className="space-y-3">
                    {displayStamps.map((stamp) => (
                        <div
                            key={stamp.id}
                            onClick={() => onStampSelect?.(stamp.id)}
                            className="bg-[#F5F5F5] rounded-lg p-3 hover:bg-[#EBEBEB] transition-colors cursor-pointer"
                        >
                            {/* White inner area with scalloped border */}
                            <div className="relative bg-white p-4 rounded-lg" style={{
                                border: '2px solid #E4E7EC',
                                clipPath: 'polygon(0% 8%, 4% 0%, 8% 8%, 12% 0%, 16% 8%, 20% 0%, 24% 8%, 28% 0%, 32% 8%, 36% 0%, 40% 8%, 44% 0%, 48% 8%, 52% 0%, 56% 8%, 60% 0%, 64% 8%, 68% 0%, 72% 8%, 76% 0%, 80% 8%, 84% 0%, 88% 8%, 92% 0%, 96% 8%, 100% 0%, 100% 8%, 96% 16%, 100% 24%, 96% 32%, 100% 40%, 96% 48%, 100% 56%, 96% 64%, 100% 72%, 96% 80%, 100% 88%, 96% 96%, 100% 100%, 96% 92%, 92% 100%, 88% 92%, 84% 100%, 80% 92%, 76% 100%, 72% 92%, 68% 100%, 64% 92%, 60% 100%, 56% 92%, 52% 100%, 48% 92%, 44% 100%, 40% 92%, 36% 100%, 32% 92%, 28% 100%, 24% 92%, 20% 100%, 16% 92%, 12% 100%, 8% 92%, 4% 100%, 0% 100%, 0% 92%, 4% 84%, 0% 76%, 4% 68%, 0% 60%, 4% 52%, 0% 44%, 4% 36%, 0% 28%, 4% 20%, 0% 12%)'
                            }}>
                                {/* Blue Oval Stamp Graphic with Text */}
                                <div className="flex items-center justify-center min-h-[100px]">
                                    <div 
                                        className="relative"
                                        style={{
                                            transform: 'rotate(-8deg)',
                                            transformOrigin: 'center'
                                        }}
                                    >
                                        {/* Blue Oval Background */}
                                        <div 
                                            className="bg-[#5542F6] flex flex-col items-center justify-center px-5 py-3"
                                            style={{
                                                width: '130px',
                                                height: '75px',
                                                borderRadius: '50%',
                                                border: '2px solid white'
                                            }}
                                        >
                                            {/* Text Content */}
                                            <span className="text-white text-[10px] font-bold uppercase leading-tight whitespace-nowrap">
                                                {stamp.text || 'ACADEMICS'}
                                            </span>
                                            <span className="text-white text-[10px] font-semibold leading-tight mt-0.5 whitespace-nowrap">
                                                {stamp.number || '0941 380431'}
                                            </span>
                                            <span className="text-white text-[10px] font-bold uppercase leading-tight mt-0.5 whitespace-nowrap">
                                                {stamp.name || 'JASTINIAH'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

