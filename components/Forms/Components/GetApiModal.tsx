'use client';

import { useState, useEffect } from 'react';
import FormPreview from './FormPreview';
import GetApiPreviewModal from './GetApiPreviewModal';
import { Question } from './QuestionCard';

interface GetApiModalProps {
    isOpen: boolean;
    onClose: () => void;
    formId: string;
    formTitle: string;
    questions: Question[];
}

export default function GetApiModal({ isOpen, onClose, formId, formTitle, questions }: GetApiModalProps) {
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    
    // Generate API base URL (you can adjust as needed)
    const apiBaseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : 'https://qualifyiq.app';
    
    const apiEndpoint = `${apiBaseUrl}/qualifyform`;

    const handleApiLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsPreviewModalOpen(true);
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
                        <h2 className="text-2xl font-bold text-[#24282E] mb-1">Get API</h2>
                        <p className="text-md pt-2 text-[#84818A]">Here is the inquiry form preview</p>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center ml-4"
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
                    {/* API Endpoints Section */}
                    <div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-[#24282E]">GET</span>
                                    <a 
                                        href={apiEndpoint}
                                        onClick={handleApiLinkClick}
                                        className="text-sm text-[#727A90] underline hover:text-[#5542F6] transition-colors cursor-pointer"
                                    >
                                        /qualifyform
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div>
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

            {/* Get API Preview Modal */}
            <GetApiPreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                formId={formId}
            />
        </div>
    );
}
