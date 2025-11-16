'use client';

import { useState, useEffect } from 'react';
import FormPreview from './FormPreview';
import { Question } from './QuestionCard';

interface EmbedFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    formId: string;
    formTitle: string;
    questions: Question[];
}

export default function EmbedFormModal({ isOpen, onClose, formId, formTitle, questions }: EmbedFormModalProps) {
    const [copied, setCopied] = useState(false);

    // Generate embed URL (you can adjust the domain as needed)
    const embedUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/embed/short-inquiry?form=${formId}`
        : `https://qualifyiq.app/embed/short-inquiry?form=${formId}`;

    const embedCode = `<iframe src="${embedUrl}"\nwidth="100%" height="700" frameborder="0"></iframe>`;

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(embedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
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
            <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Modal Content */}
                <div className="relative bg-white rounded-lg shadow-xl flex flex-col max-h-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-start justify-between px-6 pt-6 pb-4 shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-[#24282E] mb-1">Embed the Form</h2>
                        <p className="text-md pt-2 text-[#84818A]">Here is the inquiry form preview</p>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className=" flex items-center justify-center ml-4"
                    >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.0007 2.33301C7.54898 2.33301 2.33398 7.54801 2.33398 13.9997C2.33398 20.4513 7.54898 25.6663 14.0007 25.6663C20.4523 25.6663 25.6673 20.4513 25.6673 13.9997C25.6673 7.54801 20.4523 2.33301 14.0007 2.33301ZM19.834 18.188L18.189 19.833L14.0007 15.6447L9.81232 19.833L8.16732 18.188L12.3557 13.9997L8.16732 9.81134L9.81232 8.16634L14.0007 12.3547L18.189 8.16634L19.834 9.81134L15.6457 13.9997L19.834 18.188Z" fill="#504F54" />
                        </svg>

                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1 scroll-hidden">
                        {/* Content */}
                        <div className="p-6 space-y-6">
                    {/* Embed Code Section */}
                    <div>
                        <label className="block text-md font-semibold text-[#504F54] mb-2">Embed Code</label>
                        <div className="bg-[#F7F8FA] border border-[#E4E7EC] rounded-lg p-4 mb-3">
                            <pre className="text-sm text-[#24282E] font-mono whitespace-pre-wrap wrap-break-word">
                                {embedCode}
                            </pre>
                        </div>
                        <button
                            onClick={handleCopyCode}
                            className="flex items-center gap-2 px-4 py-3 bg-[#F7F8FA] border-2 border-[#E4E7EC] rounded-md text-sm font-medium text-[#24282E] hover:bg-[#EBEBEB] transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6663 0.666504H2.66634C1.93301 0.666504 1.33301 1.2665 1.33301 1.99984V11.3332H2.66634V1.99984H10.6663V0.666504ZM12.6663 3.33317H5.33301C4.59967 3.33317 3.99967 3.93317 3.99967 4.6665V13.9998C3.99967 14.7332 4.59967 15.3332 5.33301 15.3332H12.6663C13.3997 15.3332 13.9997 14.7332 13.9997 13.9998V4.6665C13.9997 3.93317 13.3997 3.33317 12.6663 3.33317ZM12.6663 13.9998H5.33301V4.6665H12.6663V13.9998Z" fill="#2E2C34" />
                            </svg>

                            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                        </button>
                    </div>

                    {/* Preview Section */}
                    <div>
                        <label className="block text-sm font-semibold text-[#24282E] mb-3">Preview</label>
                        <div className="bg-[#FBFAFC] border-2 border-[#EBEAED] rounded-lg p-12">
                            <div className="bg-white border border-[#E4E7EC] rounded-lg p-6">
                                <FormPreview
                                    questions={questions}
                                    showSubmitButton={true}
                                    hideHeader={true}
                                    isPreviewOnly={false}
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
