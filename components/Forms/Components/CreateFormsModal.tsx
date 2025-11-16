'use client';

import { useState, useEffect } from 'react';

interface CreateFormsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate?: (formType: string) => void;
}

interface FormOption {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

// General Form Icon Component
const FormIcon = () => (
    <svg width="40" height="40" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="4" fill="#EEEDFF"/>
        <path d="M34 33H22V31H34V33ZM34 29H22V27H34V29ZM34 25H22V23H34V25ZM19 38L20.5 36.5L22 38L23.5 36.5L25 38L26.5 36.5L28 38L29.5 36.5L31 38L32.5 36.5L34 38L35.5 36.5L37 38V18L35.5 19.5L34 18L32.5 19.5L31 18L29.5 19.5L28 18L26.5 19.5L25 18L23.5 19.5L22 18L20.5 19.5L19 18V38Z" fill="#5542F6"/>
    </svg>
);

const formOptions: FormOption[] = [
    {
        id: 'short-inquiry',
        title: 'Short Inquiry Form',
        description: 'Quick capture for top-of-funnel leads',
        icon: <FormIcon />
    },
    {
        id: 'long-inquiry',
        title: 'Long Inquiry Form',
        description: 'Detailed intake for qualified prospects',
        icon: <FormIcon />
    },
    {
        id: 'nda',
        title: 'NDA',
        description: 'Financial disclosure / due diligence intake',
        icon: <FormIcon />
    },
    {
        id: 'fdd',
        title: 'Financial Disclosure Intake (FDD)',
        description: 'Financial disclosure / due diligence intake',
        icon: <FormIcon />
    },
    {
        id: 'franchise-agreement',
        title: 'Franchise Operating Agreement',
        description: 'Financial disclosure / due diligence intake',
        icon: <FormIcon />
    }
];

export default function CreateFormsModal({ isOpen, onClose, onCreate }: CreateFormsModalProps) {
    const [selectedForm, setSelectedForm] = useState<string>('short-inquiry');

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

    const handleCreate = () => {
        if (onCreate) {
            onCreate(selectedForm);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Modal Content */}
                <div className="relative bg-white rounded-lg shadow-xl flex flex-col max-h-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-start justify-between p-6 pb-4 shrink-0">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-[#2E2C34] mb-1">
                            Select Form to Generate
                        </h2>
                        <p className="text-sm text-[#727A90]">
                            Here is the inquiry form preview
                        </p>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="ml-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F8FA] transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15M5 5L15 15" stroke="#84818A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1 scroll-hidden">
                        {/* Form Options List */}
                        <div className="px-6 pb-6 space-y-3">
                    {formOptions.map((form) => {
                        const isSelected = selectedForm === form.id;
                        return (
                            <button
                                key={form.id}
                                onClick={() => setSelectedForm(form.id)}
                                className={`w-full flex items-start gap-3 p-4 rounded-lg transition-all ${
                                    isSelected
                                        ? 'bg-white border-2 border-[#5542F6]'
                                        : 'bg-[#FBFAFC] border-2 border-transparent'
                                }`}
                            >
                                {/* Icon */}
                                <div className="flex items-center justify-center shrink-0">
                                    {form.icon}
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 text-left">
                                    <h3 className="font-bold text-[#2E2C34] text-sm mb-1">
                                        {form.title}
                                    </h3>
                                    <p className="text-xs text-[#727A90]">
                                        {form.description}
                                    </p>
                                </div>
                            </button>
                        );
                        })}
                        </div>

                        {/* Footer with Create Button */}
                        <div className="flex justify-end px-6 pb-6">
                            <button
                                onClick={handleCreate}
                                className="bg-[#5542F6] text-white px-6 py-2.5 rounded-sm font-medium text-sm hover:bg-[#4535D6] transition-colors"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

