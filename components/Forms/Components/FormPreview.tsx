'use client';

import { useState } from 'react';
import { Question } from './QuestionCard';
import PreviewDropdown from './PreviewDropdown';
import ThemeSettingsModal from './ThemeSettingsModal';

interface FormPreviewProps {
    questions: Question[];
    showSubmitButton?: boolean;
    hideHeader?: boolean;
    isPreviewOnly?: boolean; // When true, form is non-interactive (like Canva preview)
    maxVisibleQuestions?: number; // Maximum questions to show in preview (for card view)
}

export default function FormPreview({ questions, showSubmitButton = false, hideHeader = false, isPreviewOnly = false, maxVisibleQuestions }: FormPreviewProps) {
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const renderField = (question: Question, index: number) => {
        const exampleValues: Record<string, string> = {
            'text': 'Henry Stephan',
            'email': 'abc123@gmail.com',
            'phone-number': '+101-15384343',
            'dropdown': '$5000-10,000',
            'long-description': 'My project /....'
        };

        // Helper function to render HTML title
        const renderTitle = (title: string | undefined, fallback: string) => {
            const htmlContent = title || fallback;
            // Check if content contains HTML tags
            const hasHtml = /<[^>]+>/.test(htmlContent);
            if (hasHtml) {
                return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
            }
            return <span>{htmlContent}</span>;
        };

        switch (question.type) {
            case 'text':
                return (
                    <div key={question.id}>
                        <label className="block text-sm font-medium text-[#24282E] mb-3">
                            {renderTitle(question.title, `Question ${index + 1}`)}
                            {question.required && <span className="text-[#FC3400] ml-1">*</span>}
                        </label>
                        <input
                            type="text"
                            value={exampleValues.text}
                            readOnly
                            disabled={isPreviewOnly}
                            className="w-full px-4 py-4 border-2 border-[#EBEAED] rounded-sm bg-white text-[#727A90] text-sm placeholder:text-[#727A90]"
                        />
                    </div>
                );

            case 'email':
                return (
                    <div key={question.id}>
                        <label className="block text-sm font-medium text-[#24282E] mb-3">
                            {renderTitle(question.title, `Question ${index + 1}`)}
                            {question.required && <span className="text-[#FC3400] ml-1">*</span>}
                        </label>
                        <input
                            type="email"
                            value={exampleValues.email}
                            readOnly
                            disabled={isPreviewOnly}
                            className="w-full px-4 py-4 border-2 border-[#EBEAED] rounded-sm bg-white text-[#727A90] text-sm placeholder:text-[#727A90]"
                        />
                    </div>
                );

            case 'phone-number':
                return (
                    <div key={question.id}>
                        <label className="block text-sm font-medium text-[#24282E] mb-3">
                            {renderTitle(question.title, `Question ${index + 1}`)}
                            {question.required && <span className="text-[#FC3400] ml-1">*</span>}
                        </label>
                        <input
                            type="tel"
                            value={exampleValues['phone-number']}
                            readOnly
                            disabled={isPreviewOnly}
                            className="w-full px-4 py-4 border-2 border-[#EBEAED] rounded-sm bg-white text-[#727A90] text-sm placeholder:text-[#727A90]"
                        />
                    </div>
                );

            case 'dropdown':
                return (
                    <div key={question.id}>
                        <label className="block text-sm font-medium text-[#24282E] mb-3">
                            {renderTitle(question.title, `Question ${index + 1}`)}
                            {question.required && <span className="text-[#FC3400] ml-1">*</span>}
                        </label>
                        <PreviewDropdown
                            value={question.options.length > 0 && question.options[0] ? question.options[0] : exampleValues.dropdown}
                            options={question.options.length > 0 ? question.options : [exampleValues.dropdown]}
                            disabled={isPreviewOnly}
                        />
                    </div>
                );

            case 'multiple-choice':
                return (
                    <div key={question.id}>
                        <label className="block text-sm font-medium text-[#24282E] mb-3">
                            {renderTitle(question.title, `Question ${index + 1}`)}
                            {question.required && <span className="text-[#FC3400] ml-1">*</span>}
                        </label>
                        <div className="space-y-3">
                            {question.options.length > 0 ? (
                                question.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full border-[3px] border-[#84818A] shrink-0"></div>
                                        <span className="text-sm text-[#24282E]">{option || `Option ${optIndex + 1}`}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full border-[3px] border-[#84818A] shrink-0"></div>
                                    <span className="text-sm text-[#24282E]">Option 1</span>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'long-description':
                return (
                    <div key={question.id}>
                        <label className="block text-sm font-medium text-[#24282E] mb-3">
                            {renderTitle(question.title, `Question ${index + 1}`)}
                            {question.required && <span className="text-[#FC3400] ml-1">*</span>}
                        </label>
                        <textarea
                            value={exampleValues['long-description']}
                            readOnly
                            disabled={isPreviewOnly}
                            rows={4}
                            className="w-full px-4 py-4 border-2 border-[#EBEAED] rounded-sm bg-white text-[#727A90] text-sm resize-none placeholder:text-[#727A90]"
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="rounded-lg h-full flex flex-col">
            {/* Header */}
            {!hideHeader && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center bg-white justify-between gap-3 sm:gap-0 p-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#24282E]">Form Preview</h3>
                    <button 
                        onClick={() => setIsThemeModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E4E7EC] rounded-lg text-xs sm:text-sm font-medium text-[#24282E] hover:bg-[#F7F8FA] transition-colors w-full sm:w-auto justify-center sm:justify-start"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                            <path d="M8 2C4.68667 2 2 4.68667 2 8C2 11.3133 4.68667 14 8 14C8.55333 14 9 13.5533 9 13C9 12.74 8.9 12.5067 8.74 12.3267C8.58667 12.1533 8.48667 11.92 8.48667 11.6667C8.48667 11.1133 8.93333 10.6667 9.48667 10.6667H10.6667C12.5067 10.6667 14 9.17333 14 7.33333C14 4.38667 11.3133 2 8 2ZM4.33333 8C3.78 8 3.33333 7.55333 3.33333 7C3.33333 6.44667 3.78 6 4.33333 6C4.88667 6 5.33333 6.44667 5.33333 7C5.33333 7.55333 4.88667 8 4.33333 8ZM6.33333 5.33333C5.78 5.33333 5.33333 4.88667 5.33333 4.33333C5.33333 3.78 5.78 3.33333 6.33333 3.33333C6.88667 3.33333 7.33333 3.78 7.33333 4.33333C7.33333 4.88667 6.88667 5.33333 6.33333 5.33333ZM9.66667 5.33333C9.11333 5.33333 8.66667 4.88667 8.66667 4.33333C8.66667 3.78 9.11333 3.33333 9.66667 3.33333C10.22 3.33333 10.6667 3.78 10.6667 4.33333C10.6667 4.88667 10.22 5.33333 9.66667 5.33333ZM11.6667 8C11.1133 8 10.6667 7.55333 10.6667 7C10.6667 6.44667 11.1133 6 11.6667 6C12.22 6 12.6667 6.44667 12.6667 7C12.6667 7.55333 12.22 8 11.6667 8Z" fill="#2E2C34"/>
                        </svg>
                        <span className="whitespace-nowrap">Theme Settings</span>
                    </button>
                </div>
            )}

            {/* Preview Form */}
            <div className={`${hideHeader ? '' : 'bg-[#F5F3FF] p-4 sm:p-6 lg:p-8'} flex-1 overflow-y-auto`}>
                <div className={`${hideHeader ? '' : 'bg-[#FDFDFD] border-none rounded-md'} p-4 sm:p-6`}>
                    {questions.length === 0 ? (
                        <p className="text-sm text-[#727A90] text-center py-8">Add questions to see preview</p>
                    ) : (
                        <div className="space-y-6">
                            {(maxVisibleQuestions && questions.length > maxVisibleQuestions 
                                ? questions.slice(0, maxVisibleQuestions)
                                : questions
                            ).map((question, index) => renderField(question, index))}
                            
                            {/* Note: The "+X more questions" indicator is now shown in FormCard component with better positioning */}
                            
                            {showSubmitButton && !(maxVisibleQuestions && questions.length > maxVisibleQuestions) && (
                                <button 
                                    disabled={isPreviewOnly}
                                    className="w-full bg-black text-white rounded-sm py-3 px-4 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Theme Settings Modal */}
            {!hideHeader && (
                <ThemeSettingsModal 
                    isOpen={isThemeModalOpen} 
                    onClose={() => setIsThemeModalOpen(false)} 
                />
            )}
        </div>
    );
}

