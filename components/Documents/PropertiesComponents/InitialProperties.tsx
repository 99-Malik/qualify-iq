'use client';

import React, { useState } from 'react';
import NumberInput from '../../Forms/Components/NumberInput';
import PreviewDropdown from '../../Forms/Components/PreviewDropdown';

interface InitialPropertiesProps {
    label?: string; // Custom label for the text field (defaults to "Text")
    onTextChange?: (text: string, fontFamily: string, fontWeight: string, fontSize: number) => void;
    onTextSync?: (callback: (text: string) => void) => void; // Callback to register sync function
}

export default function InitialProperties({ label = 'Text', onTextChange, onTextSync }: InitialPropertiesProps) {
    // State for Initial properties
    const [initialText, setInitialText] = useState('');
    const [fontFamily, setFontFamily] = useState('Global Font');
    const [fontWeight, setFontWeight] = useState('Bold');
    const [fontSize, setFontSize] = useState(25);

    // Options for dropdowns
    const fontFamilyOptions = ['Global Font', 'Arial', 'Times New Roman', 'Courier New', 'Georgia'];
    const fontWeightOptions = ['Bold', 'Normal', 'Light', 'Extra Bold'];

    // Register sync callback to receive text updates from bubble
    React.useEffect(() => {
        if (onTextSync) {
            onTextSync((text: string) => {
                setInitialText(text);
            });
        }
    }, [onTextSync]);

    // Update document when any property changes
    React.useEffect(() => {
        if (onTextChange) {
            onTextChange(initialText, fontFamily, fontWeight, fontSize);
        }
    }, [initialText, fontFamily, fontWeight, fontSize, onTextChange]);

    return (
        <div className="w-56 lg:w-64 2xl:w-96 shrink-0 h-[50%] bg-white border border-[#E4E7EC] rounded-lg p-4">
            {/* Properties Button */}
            <button className="w-full px-4 py-3 bg-white border-3 border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors mb-4">
                <span className="text-lg font-extrabold text-[#24282E]">Properties</span>
            </button>

            {/* Text Input Section */}
            <div className="mb-4">
                {/* Segmented Input - Label on left, input on right */}
                <div className="flex bg-white border-2 border-[#E4E7EC] rounded-lg overflow-hidden h-[48px] lg:h-[60px]">
                    {/* Left Section - Label */}
                    <div className="bg-white border-r-2 border-[#E4E7EC] shrink-0 flex items-center justify-center self-stretch w-auto px-2">
                        <span className="text-md font-bold text-[#24282E]">{label}</span>
                    </div>
                    {/* Right Section - Input */}
                    <input
                        type="text"
                        value={initialText}
                        onChange={(e) => setInitialText(e.target.value)}
                        className="flex-1 px-3 py-4 bg-white border-none outline-none text-sm text-[#24282E]  focus:outline-none"
                        placeholder=""
                    />
                </div>
            </div>

            {/* Font Family Dropdown */}
            <div className="mb-4 flex flex-col gap-2 md:flex-col lg:flex-row lg:items-center lg:justify-between">
                <label className="text-md font-bold text-[#24282E]">Font Family</label>
                <div className="lg:shrink-0">
                    <PreviewDropdown
                        value={fontFamily}
                        options={fontFamilyOptions}
                        onChange={(value) => setFontFamily(value)}
                        paddingY="py-2.5"
                        width="w-full lg:w-auto"
                        borderRadius="rounded-lg"
                        fontWeight="font-bold"
                        textColor="text-[#24282E]"
                        chevronIcon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 6.75L9 11.25L13.5 6.75H4.5Z" fill="#504F54" />
                        </svg>
                        }
                    />
                </div>
            </div>

            {/* Font Weight Dropdown */}
            <div className="mb-4 flex flex-col gap-2 md:flex-col lg:flex-row lg:items-center lg:justify-between">
                <label className="text-md font-bold text-[#24282E]">Font Weight</label>
                <div className="lg:shrink-0">
                    <PreviewDropdown
                        value={fontWeight}
                        options={fontWeightOptions}
                        onChange={(value) => setFontWeight(value)}
                        paddingY="py-2.5"
                        width="w-full lg:w-auto"
                        borderRadius="rounded-lg"
                        fontWeight="font-bold"
                        textColor="text-[#24282E]"
                        chevronIcon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 6.75L9 11.25L13.5 6.75H4.5Z" fill="#504F54" />
                        </svg>
                        }
                    />
                </div>
            </div>

            {/* Font Size Number Input */}
            <div className="flex flex-col gap-2 md:flex-col lg:flex-row lg:items-center lg:justify-between">
                <label className="text-md font-bold text-[#24282E]">Font Size</label>
                <div className="lg:shrink-0">
                    <NumberInput
                        value={fontSize}
                        onChange={(value: number) => setFontSize(value)}
                        onDecrement={() => setFontSize(Math.max(1, fontSize - 1))}
                        onIncrement={() => setFontSize(fontSize + 1)}
                        width="w-full lg:w-30"
                        height="h-11"
                        fontWeight="font-bold"
                        textColor="text-[#24282E]"
                    />
                </div>
            </div>
        </div>
    );
}

