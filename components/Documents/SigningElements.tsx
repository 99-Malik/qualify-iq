'use client';

import React from 'react';

export interface SigningElement {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface SigningElementsProps {
    elements: SigningElement[];
    selectedElement: string;
    onElementSelect: (elementId: string) => void;
}

export default function SigningElements({ elements, selectedElement, onElementSelect }: SigningElementsProps) {
    return (
        <div className="w-34 lg:w-64 2xl:w-70 shrink-0 bg-white border border-[#E4E7EC] rounded-lg py-4 px-2 overflow-y-auto">
            <div className="space-y-2">
                {elements.map((element) => (
                    <button
                        key={element.id}
                        onClick={() => onElementSelect(element.id)}
                        className={`w-full flex items-center gap-2 px-2 lg:px-6 py-2 lg:py-6 rounded-lg transition-colors ${
                            selectedElement === element.id
                                ? 'bg-[#edecfe] text-base lg:text-lg text-primary font-extrabold'
                                : 'bg-white text-[#24282E] text-lg border-2 border-[#ebeaed] hover:bg-[#F7F8FA]'
                        }`}
                    >
                        <div className={`flex items-center justify-center shrink-0 ${selectedElement === element.id ? 'text-primary' : 'text-[#2E2C34]'}`}>
                            {element.icon}
                        </div>
                        {element.id === 'email' ? (
                            <>
                                <span className="text-xs md:inline lg:hidden font-bold text-center">Email</span>
                                <span className="text-xs hidden lg:inline lg:text-lg font-bold text-center">Email Address</span>
                            </>
                        ) : element.id === 'date-signed' ? (
                            <>
                                <span className="text-xs md:inline lg:hidden font-bold text-center">Date Sign</span>
                                <span className="text-xs hidden lg:inline lg:text-lg font-bold text-center">Date Signed</span>
                            </>
                        ) : (
                            <span className="text-xs lg:text-lg font-bold text-center">{element.label}</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

