'use client';

import { useState, useEffect } from 'react';
import PreviewDropdown from './PreviewDropdown';
import NumberInput from './NumberInput';

interface ThemeSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ThemeSettingsModal({ isOpen, onClose }: ThemeSettingsModalProps) {
    const [formBgColor, setFormBgColor] = useState('#5542F6');
    const [buttonColor, setButtonColor] = useState('#5542F6');
    const [font, setFont] = useState('Manrope');
    const [padding, setPadding] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
    const [radius, setRadius] = useState(0);
    const [border, setBorder] = useState(0);
    
    const fontOptions = ['Manrope', 'Arial', 'Helvetica', 'Times New Roman'];

    const handlePaddingChange = (side: 'top' | 'right' | 'bottom' | 'left', delta: number) => {
        setPadding(prev => ({
            ...prev,
            [side]: Math.max(0, prev[side] + delta)
        }));
    };

    const handleRadiusChange = (delta: number) => {
        setRadius(prev => Math.max(0, prev + delta));
    };

    const handleBorderChange = (delta: number) => {
        setBorder(prev => Math.max(0, prev + delta));
    };

    const handleSave = () => {
        // TODO: Implement save functionality
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Modal Content */}
                <div className="relative bg-white rounded-lg shadow-xl flex flex-col max-h-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-start justify-between px-6 pt-6 shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-[#24282E] mb-1">Theme Settings</h2>
                        <p className="text-sm text-[#727A90]">Here is the inquiry form preview</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#24282E] hover:text-[#FC3400] transition-colors"
                    >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9987 2.33301C7.54703 2.33301 2.33203 7.54801 2.33203 13.9997C2.33203 20.4513 7.54703 25.6663 13.9987 25.6663C20.4504 25.6663 25.6654 20.4513 25.6654 13.9997C25.6654 7.54801 20.4504 2.33301 13.9987 2.33301ZM19.832 18.188L18.187 19.833L13.9987 15.6447L9.81036 19.833L8.16537 18.188L12.3537 13.9997L8.16537 9.81134L9.81036 8.16634L13.9987 12.3547L18.187 8.16634L19.832 9.81134L15.6437 13.9997L19.832 18.188Z" fill="#504F54" />
                        </svg>

                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1 scroll-hidden">
                        {/* Content */}
                        <div className="p-6 space-y-4">
                    {/* Image Upload */}
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-md font-extrabold text-[#24282E] shrink-0">Image Upload</label>
                        <button className="px-6 py-3 bg-[#edecfe] text-primary border-none rounded-sm text-sm font-bold hover:bg-[#E1DEFF] transition-colors">
                            Upload Image
                        </button>
                    </div>

                    {/* Form Background Color */}
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-md font-extrabold text-[#24282E] shrink-0">Form Background Color</label>
                        <div className="flex items-center gap-2 pl-2 pr-4 py-2 bg-white border border-[#E4E7EC] rounded-lg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="2" fill="#5542F6" />
                                <path d="M16.2179 8.04947L14.9504 6.78197C14.7392 6.57072 14.3979 6.57072 14.1867 6.78197L12.4967 8.47197L11.4513 7.43739L10.6875 8.20114L11.4567 8.97031L6.625 13.802V16.3749H9.19792L14.0296 11.5432L14.7987 12.3124L15.5625 11.5486L14.5225 10.5086L16.2125 8.81864C16.4292 8.60197 16.4292 8.26072 16.2179 8.04947ZM8.74833 15.2916L7.70833 14.2516L12.0742 9.88572L13.1142 10.9257L8.74833 15.2916Z" fill="white" />
                            </svg>

                            <span className="text-sm text-[#24282E]">{formBgColor}</span>
                        </div>
                    </div>

                    {/* Button Color */}
                    <div className="flex items-center justify-between">
                        <label className="text-md font-extrabold text-[#24282E] shrink-0">Button Color</label>
                        <div className="flex items-center gap-2 pl-2 pr-4 py-2 bg-white border border-[#E4E7EC] rounded-lg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="2" fill="#5542F6" />
                                <path d="M16.2179 8.04947L14.9504 6.78197C14.7392 6.57072 14.3979 6.57072 14.1867 6.78197L12.4967 8.47197L11.4513 7.43739L10.6875 8.20114L11.4567 8.97031L6.625 13.802V16.3749H9.19792L14.0296 11.5432L14.7987 12.3124L15.5625 11.5486L14.5225 10.5086L16.2125 8.81864C16.4292 8.60197 16.4292 8.26072 16.2179 8.04947ZM8.74833 15.2916L7.70833 14.2516L12.0742 9.88572L13.1142 10.9257L8.74833 15.2916Z" fill="white" />
                            </svg>

                            <span className="text-sm text-[#24282E]">{buttonColor}</span>
                        </div>
                    </div>

                    {/* Font */}
                    <div className="mt-6">
                        <label className="text-md font-extrabold text-[#24282E] block mb-3">Font</label>
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <PreviewDropdown
                                    value={font}
                                    options={fontOptions}
                                    onChange={(value) => setFont(value)}
                                    paddingY="py-2"
                                />
                            </div>
                            <button className="px-4 py-2 h-10 bg-[#edecfe] font-bold text-primary border-[#E4E7EC] rounded-sm text-sm hover:bg-[#E1DEFF] transition-colors whitespace-nowrap">
                                Upload Font
                            </button>
                        </div>
                    </div>

                    {/* Padding */}
                    <div className="mt-6">
                        <label className="text-md font-extrabold text-[#24282E] block mb-3">Padding</label>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Top Row Labels */}
                            <div className="text-sm font-bold text-[#2E2C34]">Top</div>
                            <div className="text-sm font-bold text-[#2E2C34] text-left">Right</div>
                            
                            {/* Top Row Inputs */}
                            <NumberInput
                                value={padding.top}
                                onChange={(value) => setPadding(prev => ({ ...prev, top: value }))}
                                onDecrement={() => handlePaddingChange('top', -1)}
                                onIncrement={() => handlePaddingChange('top', 1)}
                                inputWidth="flex-1"
                            />
                            <NumberInput
                                value={padding.right}
                                onChange={(value) => setPadding(prev => ({ ...prev, right: value }))}
                                onDecrement={() => handlePaddingChange('right', -1)}
                                onIncrement={() => handlePaddingChange('right', 1)}
                                inputWidth="flex-1"
                            />
                            
                            {/* Bottom Row Labels */}
                            <div className="text-sm font-bold text-[#2E2C34]">Left</div>
                            <div className="text-sm font-bold text-[#2E2C34] text-left">Bottom</div>
                            
                            {/* Bottom Row Inputs */}
                            <NumberInput
                                value={padding.left}
                                onChange={(value) => setPadding(prev => ({ ...prev, left: value }))}
                                onDecrement={() => handlePaddingChange('left', -1)}
                                onIncrement={() => handlePaddingChange('left', 1)}
                                inputWidth="flex-1"
                            />
                            <NumberInput
                                value={padding.bottom}
                                onChange={(value) => setPadding(prev => ({ ...prev, bottom: value }))}
                                onDecrement={() => handlePaddingChange('bottom', -1)}
                                onIncrement={() => handlePaddingChange('bottom', 1)}
                                inputWidth="flex-1"
                            />
                        </div>
                    </div>

                    {/* Radius */}
                    <div className="mt-6">
                        <label className="text-md font-extrabold text-[#24282E] block mb-3">Radius</label>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#2E2C34]">All Sides:</span>
                            <NumberInput
                                value={radius}
                                onChange={(value) => setRadius(value)}
                                onDecrement={() => handleRadiusChange(-1)}
                                onIncrement={() => handleRadiusChange(1)}
                                inputWidth="w-16"
                            />
                        </div>
                    </div>

                    {/* Border */}
                    <div className="mt-6">
                        <label className="text-md font-extrabold text-[#24282E] block mb-3">Border</label>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#2E2C34]">All Sides:</span>
                            <NumberInput
                                value={border}
                                onChange={(value) => setBorder(value)}
                                onDecrement={() => handleBorderChange(-1)}
                                onIncrement={() => handleBorderChange(1)}
                                inputWidth="w-16"
                            />
                            </div>
                        </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end p-6 shrink-0">
                            <button
                                onClick={handleSave}
                                className="px-6 py-3 bg-[#5542F6] text-white rounded-md text-sm font-medium hover:bg-[#4535D6] transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

