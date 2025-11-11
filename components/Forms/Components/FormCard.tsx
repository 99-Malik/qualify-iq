'use client';

import { useState, useRef, useEffect } from 'react';
import { Question } from './QuestionCard';
import FormPreview from './FormPreview';

interface FormCardProps {
    id: string;
    title: string;
    description: string;
    type: string;
    questions: Question[];
    createdAt: string;
    onUse?: () => void;
    onDelete?: () => void;
}

export default function FormCard({ id, title, description, type, questions, createdAt, onUse, onDelete }: FormCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
            setIsMenuOpen(false);
        }
    };
    return (
        <div className="bg-white border border-[#E4E7EC] rounded-lg p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 min-w-0">
                        <h3 
                            className="text-xl font-bold text-[#24282E] truncate min-w-0" 
                            title={title}
                        >
                            {title}
                        </h3>
                    </div>
                    <p className="text-sm text-[#727A90]">{description}</p>
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                    <span className={`px-3 py-2 rounded-sm text-xs font-medium shrink-0 ${
                        type === 'Short Form' 
                            ? 'bg-[#c8c2fc] text-black text-extrabold' 
                            : type === 'Long Form'
                            ? 'bg-[#FFDFC0] text-black text-extrabold'
                            : 'bg-[#E9E8FB] text-[#5542F6]'
                    }`}>
                        {type}
                    </span>
                    <div className="relative" ref={menuRef}>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 hover:bg-[#F7F8FA] rounded-md transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="#84818A"/>
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 bg-white border border-[#E4E7EC] rounded-md shadow-lg z-20 min-w-[150px]">
                            <button
                                onClick={handleDelete}
                                className="w-full text-left px-4 py-2 text-sm text-[#FC3400] hover:bg-[#F7F8FA] transition-colors flex items-center gap-2"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM6 18.9999C6 20.0999 6.9 20.9999 8 20.9999H16C17.1 20.9999 18 20.0999 18 18.9999V6.9999H6V18.9999ZM8.0001 9H16.0001V19H8.0001V9Z" fill="#FC3400" />
                                </svg>
                                Delete Form
                            </button>
                        </div>
                    )}
                    </div>
                </div>
            </div>

            {/* Form Preview - Non-interactive Preview Mode - Flex grow to push button down */}
            <div className="mb-4 bg-white border border-[#E4E7EC] rounded-lg p-4 relative overflow-hidden flex-1">
                {/* Overlay to prevent interactions - like Canva preview */}
                <div 
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={onUse}
                    style={{ pointerEvents: 'auto' }}
                />
                {/* Form Preview with disabled interactions - Limited height for cards */}
                <div className="pointer-events-none select-none relative" style={{ userSelect: 'none', maxHeight: '400px', overflow: 'hidden' }}>
                    <FormPreview 
                        questions={questions} 
                        showSubmitButton={false} 
                        hideHeader={true} 
                        isPreviewOnly={true} 
                        maxVisibleQuestions={5}
                    />
                    {/* Show question count indicator and gradient fade for long forms */}
                    {questions.length > 5 && (
                        <>
                            {/* Question count indicator - styled as a small badge/tag */}
                            <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
                                <span className="inline-block px-2 py-1 bg-primary border border-[#E4E7EC] rounded text-[13px] text-white  font-medium">
                                    +{questions.length - 5} more question{questions.length - 5 > 1 ? 's' : ''}
                                </span>
                            </div>
                            {/* Gradient fade at bottom for long forms - industry standard */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/98 to-transparent pointer-events-none z-10" />
                        </>
                    )}
                </div>
            </div>

            {/* Use Button - Always at bottom */}
            <div className="flex justify-start mt-auto">
                <button
                    onClick={onUse}
                    className="px-8 py-3 bg-[#F7F8FA] text-[#24282E] border border-[#E4E7EC] rounded-sm text-sm font-medium hover:bg-[#E4E7EC] transition-colors"
                >
                    Use
                </button>
            </div>
        </div>
    );
}

