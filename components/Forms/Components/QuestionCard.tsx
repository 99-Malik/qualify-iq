'use client';

import { useState, useEffect, useRef } from 'react';
import FieldTypeDropdown, { FieldType } from './FieldTypeDropdown';

export interface Question {
    id: string;
    type: FieldType;
    title: string;
    options: string[];
    required: boolean;
}

interface QuestionCardProps {
    question: Question;
    index: number;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onUpdate: (question: Question) => void;
    onDelete: () => void;
    onDuplicate: () => void;
    onDragStart: () => void;
    onDragEnd: () => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    isDragging: boolean;
    isDragOver: boolean;
}

export default function QuestionCard({
    question,
    index,
    isExpanded,
    onToggleExpand,
    onUpdate,
    onDelete,
    onDuplicate,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    isDragging,
    isDragOver
}: QuestionCardProps) {
    const [localQuestion, setLocalQuestion] = useState<Question>(question);
    const titleInputRef = useRef<HTMLDivElement>(null);
    const isUpdatingRef = useRef(false);

    const updateQuestion = (updates: Partial<Question>) => {
        const updated = { ...localQuestion, ...updates };
        setLocalQuestion(updated);
        onUpdate(updated);
    };

    // Modern text formatting function using Selection API
    const applyFormatting = (format: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
        const element = titleInputRef.current;
        if (!element) return;

        element.focus();
        
        const selection = window.getSelection();
        if (!selection) return;

        let range: Range;
        
        // If there's an existing selection, use it; otherwise select all
        if (selection.rangeCount > 0) {
            range = selection.getRangeAt(0);
            
            // If the selection is collapsed (no text selected), select all content
            if (range.collapsed) {
                range = document.createRange();
                range.selectNodeContents(element);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        } else {
            // No selection exists, create one for the entire element
            range = document.createRange();
            range.selectNodeContents(element);
            selection.addRange(range);
        }

        // Check if the selection is within our element
        if (!element.contains(range.commonAncestorContainer)) {
            range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        // Create the appropriate wrapper element
        const tagName = format === 'strikethrough' ? 's' : format === 'bold' ? 'b' : format === 'italic' ? 'i' : 'u';
        const wrapper = document.createElement(tagName);
        
        try {
            // Extract the selected content
            const contents = range.extractContents();
            
            // If contents is empty or only whitespace, don't apply formatting
            if (!contents.textContent || !contents.textContent.trim()) {
                return;
            }
            
            wrapper.appendChild(contents);
            range.insertNode(wrapper);

            // Normalize the element to merge adjacent nodes
            element.normalize();

            // Update the question title
            isUpdatingRef.current = true;
            const html = element.innerHTML;
            const text = element.innerText;
            updateQuestion({ title: html !== text ? html : text });
            
            setTimeout(() => {
                isUpdatingRef.current = false;
            }, 0);

            // Restore cursor position after the wrapper
            const newRange = document.createRange();
            newRange.setStartAfter(wrapper);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
        } catch (error) {
            console.error('Error applying formatting:', error);
        }
    };

    // Sync contentEditable when question changes externally
    useEffect(() => {
        if (titleInputRef.current && !isUpdatingRef.current) {
            const currentContent = titleInputRef.current.innerHTML;
            if (localQuestion.title !== currentContent) {
                titleInputRef.current.innerHTML = localQuestion.title || '';
            }
        }
    }, [localQuestion.title]);

    const needsOptions = localQuestion.type === 'dropdown' || localQuestion.type === 'multiple-choice';

    // Initialize options if switching to a type that needs them
    useEffect(() => {
        const typeNeedsOptions = localQuestion.type === 'dropdown' || localQuestion.type === 'multiple-choice';
        if (typeNeedsOptions && localQuestion.options.length === 0) {
            const updated = { ...localQuestion, options: ['', ''] };
            setLocalQuestion(updated);
            onUpdate(updated);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localQuestion.type]);

    return (
        <div
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={onDrop}
            className={`flex items-center gap-3 transition-all ${isDragging ? 'opacity-50' : ''}`}
        >
            {/* Drag Handle - Outside the card */}
            <div className="shrink-0 cursor-move">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 18C11 19.1 10.1 20 9 20C7.9 20 7 19.1 7 18C7 16.9 7.9 16 9 16C10.1 16 11 16.9 11 18ZM9 10C7.9 10 7 10.9 7 12C7 13.1 7.9 14 9 14C10.1 14 11 13.1 11 12C11 10.9 10.1 10 9 10ZM9 4C7.9 4 7 4.9 7 6C7 7.1 7.9 8 9 8C10.1 8 11 7.1 11 6C11 4.9 10.1 4 9 4ZM15 8C16.1 8 17 7.1 17 6C17 4.9 16.1 4 15 4C13.9 4 13 4.9 13 6C13 7.1 13.9 8 15 8ZM15 10C13.9 10 13 10.9 13 12C13 13.1 13.9 14 15 14C16.1 14 17 13.1 17 12C17 10.9 16.1 10 15 10ZM15 16C13.9 16 13 16.9 13 18C13 19.1 13.9 20 15 20C16.1 20 17 19.1 17 18C17 16.9 16.1 16 15 16Z" fill="#84818A" />
                </svg>
            </div>

            {/* Question Container */}
            <div
                className={`flex-1 bg-white py-4 transition-all relative ${isExpanded ? 'border-none shadow-md rounded-md ' : 'border border-[#E4E7EC] rounded-md  hover:bg-[#F7F8FA]'
                    } ${isDragOver ? 'border-[#5542F6] border-2 border-dashed' : ''}`}
            >
                {/* Purple Left Strip - Only visible when expanded */}
                {isExpanded && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3.6px] bg-[#5542F6] rounded-l-lg"></div>
                )}
                {/* Collapsed Header */}
                <button
                    onClick={onToggleExpand}
                    className="w-full flex items-center gap-3 px-4  transition-colors"
                >
                    <span className="flex-1 text-left font-bold text-[#24282E]">Question {index + 1}</span>

                    {/* Expand/Collapse Icon */}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    >
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#504F54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                    <div className="px-4 pb-4 pt-3 space-y-4">
                        {/* Field Type Selector */}
                        <div>
                            <FieldTypeDropdown
                                value={localQuestion.type}
                                onChange={(type) => {
                                    updateQuestion({
                                        type,
                                        options: (type === 'dropdown' || type === 'multiple-choice') ? localQuestion.options : []
                                    });
                                }}
                            />
                        </div>

                        {/* Text Formatting Toolbar */}
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    titleInputRef.current?.focus();
                                    applyFormatting('bold');
                                }}
                                className="w-10 h-10 flex items-center justify-center border border-none rounded bg-[#fbfafc] hover:bg-[#F7F8FA] transition-colors"
                            >
                                <span className="font-bold text-md text-[#24282E]">B</span>
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    titleInputRef.current?.focus();
                                    applyFormatting('italic');
                                }}
                                className="w-10 h-10  flex items-center justify-center  border border-none bg-[#fbfafc] rounded hover:bg-[#F7F8FA] transition-colors"
                            >
                                <span className="italic text-md text-[#24282E]"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.625 5.625V4.375H7.5V5.625H10.7125L7.98125 14.375H4.375V15.625H12.5V14.375H9.2875L12.0187 5.625H15.625Z" fill="#3F434F" />
                                </svg>
                                </span>
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    titleInputRef.current?.focus();
                                    applyFormatting('underline');
                                }}
                                className="w-10 h-10 flex items-center justify-center border border-none bg-[#fbfafc] rounded hover:bg-[#F7F8FA] transition-colors"
                            >
                                <span className="underline text-md text-[#24282E]"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 16.25H17.5V17.5H2.5V16.25ZM10 14.375C8.83968 14.375 7.72688 13.9141 6.90641 13.0936C6.08594 12.2731 5.625 11.1603 5.625 10V3.125H6.875V10C6.875 10.8288 7.20424 11.6237 7.79029 12.2097C8.37634 12.7958 9.1712 13.125 10 13.125C10.8288 13.125 11.6237 12.7958 12.2097 12.2097C12.7958 11.6237 13.125 10.8288 13.125 10V3.125H14.375V10C14.375 11.1603 13.9141 12.2731 13.0936 13.0936C12.2731 13.9141 11.1603 14.375 10 14.375Z" fill="#3F434F" />
                                </svg>
                                </span>
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    titleInputRef.current?.focus();
                                    applyFormatting('strikethrough');
                                }}
                                className="w-10 h-10 flex items-center justify-center border border-none bg-[#fbfafc] rounded hover:bg-[#F7F8FA] transition-colors"
                            >
                                <span className="line-through text-md text-[#24282E]"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.5 13.3749H15.2225C14.945 13.3003 14.6662 13.2305 14.3863 13.1655C12.6312 12.7505 11.6388 12.4468 11.6388 11.0261C11.6245 10.7809 11.6608 10.5354 11.7454 10.3047C11.83 10.0741 11.9612 9.86335 12.1306 9.68552C12.6615 9.24896 13.3264 9.0084 14.0137 9.00427C15.7825 8.96052 16.5981 9.56052 17.265 10.473L18.2744 9.73552C17.8019 9.05699 17.1578 8.51605 16.4078 8.16796C15.6578 7.81987 14.8288 7.67711 14.0056 7.75427C12.9944 7.76072 12.0189 8.12898 11.2556 8.79239C10.9663 9.08583 10.7402 9.43541 10.5913 9.81959C10.4423 10.2038 10.3736 10.6144 10.3894 11.0261C10.362 11.4767 10.4466 11.927 10.6357 12.3369C10.8248 12.7467 11.1125 13.1034 11.4731 13.3749H6.5V14.6249H15.0325C16.2619 14.9811 16.9969 15.4449 17.0156 16.7236C17.0359 16.9968 16.9985 17.2712 16.9056 17.5289C16.8128 17.7866 16.6667 18.0218 16.4769 18.2193C15.8155 18.7406 14.9938 19.0165 14.1519 18.9999C13.5234 18.9817 12.9074 18.8208 12.3503 18.5294C11.7932 18.2381 11.3097 17.8238 10.9362 17.318L9.97812 18.1205C10.4636 18.7675 11.0899 19.2954 11.8097 19.6643C12.5295 20.0333 13.3238 20.2335 14.1325 20.2499H14.195C15.3492 20.2632 16.4695 19.8595 17.35 19.113C17.6625 18.7979 17.9054 18.4208 18.0632 18.006C18.2209 17.5913 18.2898 17.148 18.2656 16.7049C18.289 15.9469 18.0332 15.2068 17.5469 14.6249H21.5V13.3749Z" fill="#3F434F" />
                                </svg>
                                </span>
                            </button>
                        </div>

                        {/* Question Title Input - ContentEditable for formatting */}
                        <div>
                            <div
                                ref={titleInputRef}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={(e) => {
                                    isUpdatingRef.current = true;
                                    const html = e.currentTarget.innerHTML;
                                    const text = e.currentTarget.innerText;
                                    // Store HTML if it contains formatting, otherwise store plain text
                                    updateQuestion({ title: html !== text ? html : text });
                                    setTimeout(() => {
                                        isUpdatingRef.current = false;
                                    }, 0);
                                }}
                                onBlur={(e) => {
                                    isUpdatingRef.current = true;
                                    const html = e.currentTarget.innerHTML;
                                    const text = e.currentTarget.innerText;
                                    updateQuestion({ title: html !== text ? html : text });
                                    setTimeout(() => {
                                        isUpdatingRef.current = false;
                                    }, 0);
                                }}
                                data-placeholder={`Untitled Question ${index + 1}`}
                                className="w-full px-3 py-5 bg-[#fbfafc] border-b border-[#E4E7EC] text-[#24282E] text-sm focus:outline-none min-h-[48px]"
                                style={{
                                    whiteSpace: 'pre-wrap',
                                }}
                            />
                            <style jsx>{`
                                [contenteditable][data-placeholder]:empty:before {
                                    content: attr(data-placeholder);
                                    color: #727A90;
                                    pointer-events: none;
                                }
                            `}</style>
                        </div>

                        {/* Options List (for Dropdown/Multiple Choice) */}
                        {needsOptions && (
                            <div className="space-y-2">
                                {localQuestion.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-1">
                                        <div className="w-4 h-4 rounded-full border-3 border-[#84818a] shrink-0"></div>
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => {
                                                const newOptions = [...localQuestion.options];
                                                newOptions[optIndex] = e.target.value;
                                                updateQuestion({ options: newOptions });
                                            }}
                                             placeholder={`Write Option ${optIndex + 1}`}
                                             className="flex-1 px-3 py-2 bg-white text-sm text-[#2E2C34] font-extrabold placeholder:text-[#2E2C34] placeholder:font-extrabold focus:outline-none"
                                        />
                                        <button
                                            onClick={() => {
                                                const newOptions = localQuestion.options.filter((_, i) => i !== optIndex);
                                                updateQuestion({ options: newOptions });
                                            }}
                                            className="w-6 h-6 flex items-center justify-center text-[#727A90] hover:text-[#FC3400] hover:bg-[#F7F8FA] rounded transition-colors shrink-0"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.99984 1.66675C5.3915 1.66675 1.6665 5.39175 1.6665 10.0001C1.6665 14.6084 5.3915 18.3334 9.99984 18.3334C14.6082 18.3334 18.3332 14.6084 18.3332 10.0001C18.3332 5.39175 14.6082 1.66675 9.99984 1.66675ZM14.1665 12.9917L12.9915 14.1667L9.99984 11.1751L7.00817 14.1667L5.83317 12.9917L8.82484 10.0001L5.83317 7.00841L7.00817 5.83342L9.99984 8.82508L12.9915 5.83342L14.1665 7.00841L11.1748 10.0001L14.1665 12.9917Z" fill="#504F54" />
                                            </svg>

                                        </button>
                                    </div>
                                ))}
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full border-3  border-[#84818a] shrink-0"></div>
                                    <button
                                        onClick={() => {
                                            const newOptions = [...localQuestion.options, ''];
                                            updateQuestion({ options: newOptions });
                                        }}
                                        className="text-sm text-[#24282E] hover:text-[#4535D6] transition-colors text-left"
                                    >
                                         <span className='text-[#84818a] font-extrabold'>Add Option </span>
                                         <span className='text-[#24282E] font-extrabold'>or </span>
                                         <span className="text-[#5542F6] font-extrabold">Add 'Other'</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            // This is just for visual consistency, doesn't need to do anything
                                        }}
                                        className="ml-auto w-6 h-6 flex items-center justify-center  rounded transition-colors shrink-0 opacity-0 pointer-events-none"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                )}
                {isExpanded && (
                    <div className="px-4 mt-2">
                        <div className="w-full h-px bg-[#E4E7EC]"></div>
                    </div>
                )}

                {/* Bottom Row - Copy, Delete, Separator, Required Toggle - Only visible when expanded */}
                {isExpanded && (
                    <div className="flex items-center gap-2 px-4 pt-6  border-[#E4E7EC] rounded-b-md">
                        {/* Copy Icon */}
                        <button
                            onClick={onDuplicate}
                            className="flex items-center justify-center text-[#84818A] hover:text-[#5542F6] transition-colors"
                            title="Duplicate Question"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM15 5L21 11V21C21 22.1 20.1 23 19 23H7.99C6.89 23 6 22.1 6 21L6.01 7C6.01 5.9 6.9 5 8 5H15ZM14 12H19.5L14 6.5V12Z" fill="#84818A" />
                            </svg>

                        </button>

                        {/* Delete Icon */}
                        <button
                            onClick={onDelete}
                            className=" flex items-center justify-center text-[#84818A] hover:text-[#FC3400] transition-colors"
                            title="Delete Question"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM6 18.9999C6 20.0999 6.9 20.9999 8 20.9999H16C17.1 20.9999 18 20.0999 18 18.9999V6.9999H6V18.9999ZM8.0001 9H16.0001V19H8.0001V9Z" fill="#84818A" />
                            </svg>

                        </button>


                        {/* Required Toggle */}
                        <button
                            onClick={() => updateQuestion({ required: !localQuestion.required })}
                            className={`relative w-11 h-6 rounded-full transition-colors ${localQuestion.required ? 'bg-[#5542F6]' : 'bg-[#E4E7EC]'
                                }`}
                        >
                            <span
                                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${localQuestion.required ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                            />
                        </button>

                        {/* Required Label */}
                        <span className="text-sm text-[#24282E] font-medium">Required</span>
                    </div>
                )}
            </div>
        </div>
    );
}

