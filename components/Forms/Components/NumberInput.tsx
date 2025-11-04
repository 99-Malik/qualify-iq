'use client';

interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    onDecrement: () => void;
    onIncrement: () => void;
    inputWidth?: string;
    width?: string; // Custom width prop (e.g., 'w-full', 'w-auto', 'w-64', etc.)
    height?: string; // Custom height prop (e.g., 'h-8', 'h-10', 'h-12', etc.)
    fontWeight?: string; // Custom font weight (e.g., 'font-bold', 'font-semibold', 'font-normal', etc.)
    fontSize?: string; // Custom font size (e.g., 'text-sm', 'text-base', 'text-lg', etc.)
    textColor?: string; // Custom text color (e.g., 'text-[#24282E]', 'text-black', etc.)
}

export default function NumberInput({
    value,
    onChange,
    onDecrement,
    onIncrement,
    inputWidth = 'flex-1',
    width,
    height,
    fontWeight,
    fontSize,
    textColor
}: NumberInputProps) {
    const heightClass = height || 'h-auto';
    const buttonHeight = height || 'h-8';
    
    return (
        <div className={`flex items-center border border-[#E4E7EC] rounded-lg bg-white overflow-hidden ${width || 'w-auto'} ${heightClass}`}>
            <button
                onClick={onDecrement}
                type="button"
                className={`w-8 ${buttonHeight} flex items-center justify-center bg-white text-[#24282E] hover:bg-[#F7F8FA] transition-colors border-r border-[#E4E7EC] shrink-0 focus:outline-none`}
            >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8.25H3V9.75H15V8.25Z" fill="#84818A" />
                </svg>

            </button>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
                className={`${inputWidth} py-1.5 px-2 border-none bg-white ${fontSize || 'text-sm'} ${fontWeight || ''} ${textColor || 'text-[#24282E]'} text-center focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shrink min-w-[40px]`}
                style={{ textAlign: 'center' }}
            />
            <button
                onClick={onIncrement}
                type="button"
                className={`w-8 ${buttonHeight} flex items-center justify-center bg-white text-[#24282E] hover:bg-[#F7F8FA] transition-colors border-l border-[#E4E7EC] shrink-0 focus:outline-none`}
            >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 9.75H9.75V14.25H8.25V9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75Z" fill="#504F54" />
                </svg>

            </button>
        </div>
    );
}

