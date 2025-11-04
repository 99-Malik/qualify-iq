'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuestionCard, { Question } from '../Components/QuestionCard';
import FormPreview from '../Components/FormPreview';
import FormWizardHeader from '../Components/FormWizardHeader';
import FormCreatedSuccessModal from '../Components/FormCreatedSuccessModal';
import { saveForm } from '../utils/formStorage';

interface CreateLongFormProps {
    formId?: string; // For edit mode
    initialFormData?: {
        title: string;
        questions: Question[];
    };
    onBack?: () => void;
    onFormSaved?: () => void;
}

export default function CreateLongForm({ formId, initialFormData, onBack, onFormSaved }: CreateLongFormProps) {
    const router = useRouter();
    const isEditMode = !!formId;
    const [formTitleValue, setFormTitleValue] = useState(initialFormData?.title || '');
    const [questions, setQuestions] = useState<Question[]>(initialFormData?.questions || []);
    const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
    const [draggedQuestionId, setDraggedQuestionId] = useState<string | null>(null);
    const [dragOverQuestionId, setDragOverQuestionId] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Update form data when initialFormData changes (for edit mode)
    useEffect(() => {
        if (initialFormData) {
            setFormTitleValue(initialFormData.title || '');
            setQuestions(initialFormData.questions || []);
        }
    }, [initialFormData]);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.push('/forms-setup');
        }
    };

    const handleSaveForm = () => {
        if (questions.length === 0) {
            alert('Please add at least one question to the form');
            return;
        }

        try {
            saveForm({
                formId: formId,
                title: formTitleValue || 'Untitled Form',
                questions: questions,
                type: 'Long Form',
                isEditMode: isEditMode,
            });

            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error saving form:', error);
            alert('Failed to save form. Please try again.');
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        if (onFormSaved) {
            onFormSaved();
        }
    };

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>Home</span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={handleBack}>Forms Setup</span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Create Form</span>
                </nav>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-8">Forms Setup</h1>

            {/* Section Header */}
            <FormWizardHeader 
                currentStep="create" 
                onBack={handleBack}
                showBackButton={true}
            />

            {/* Form Title Input and Action Buttons */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-8 bg-white p-4 rounded-lg">
                {/* Form Title Input */}
                <div className="flex-1 w-full lg:w-auto">
                    <input
                        type="text"
                        value={formTitleValue}
                        onChange={(e) => setFormTitleValue(e.target.value)}
                        placeholder="Form Title"
                        className="md:w-full lg:w-[70%] h-12 px-4 rounded-none bg-[#fbfafc] text-[#24282E] text-base placeholder:text-[#727A90] focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6] shadow-sm"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {/* Undo Button */}
                    <button className="w-10 h-10 flex items-center justify-center bg-[#F7F8FA] border border-[#E4E7EC] rounded-md hover:bg-[#F0F0F0] transition-colors shrink-0">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5738 7.40786C9.12008 7.40786 6.89786 8.32453 5.1849 9.81527L1.85156 6.48193V14.8153H10.1849L6.83304 11.4634C8.12008 10.3893 9.75897 9.72267 11.5738 9.72267C14.8516 9.72267 17.6386 11.8616 18.6108 14.8153L20.8053 14.093C19.5182 10.2134 15.8793 7.40786 11.5738 7.40786Z" fill="#504F54" />
                        </svg>
                    </button>

                    {/* Redo Button */}
                    <button className="w-10 h-10 flex items-center justify-center bg-[#F7F8FA] border border-[#E4E7EC] rounded-md hover:bg-[#F0F0F0] transition-colors shrink-0">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0369 9.81527C15.3239 8.32453 13.1017 7.40786 10.648 7.40786C6.34245 7.40786 2.70356 10.2134 1.42578 14.093L3.61097 14.8153C4.58319 11.8616 7.36097 9.72267 10.648 9.72267C12.4536 9.72267 14.1017 10.3893 15.3887 11.4634L12.0369 14.8153H20.3702V6.48193L17.0369 9.81527Z" fill="#B6B4BA" />
                        </svg>
                    </button>

                    {/* Theme Settings Button */}
                    <button className="flex items-center gap-1.5 px-3 py-3 bg-white border border-[#E4E7EC] rounded-sm text-xs font-medium text-[#24282E] hover:bg-[#F7F8FA] transition-colors shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2C4.68667 2 2 4.68667 2 8C2 11.3133 4.68667 14 8 14C8.55333 14 9 13.5533 9 13C9 12.74 8.9 12.5067 8.74 12.3267C8.58667 12.1533 8.48667 11.92 8.48667 11.6667C8.48667 11.1133 8.93333 10.6667 9.48667 10.6667H10.6667C12.5067 10.6667 14 9.17333 14 7.33333C14 4.38667 11.3133 2 8 2ZM4.33333 8C3.78 8 3.33333 7.55333 3.33333 7C3.33333 6.44667 3.78 6 4.33333 6C4.88667 6 5.33333 6.44667 5.33333 7C5.33333 7.55333 4.88667 8 4.33333 8ZM6.33333 5.33333C5.78 5.33333 5.33333 4.88667 5.33333 4.33333C5.33333 3.78 5.78 3.33333 6.33333 3.33333C6.88667 3.33333 7.33333 3.78 7.33333 4.33333C7.33333 4.88667 6.88667 5.33333 6.33333 5.33333ZM9.66667 5.33333C9.11333 5.33333 8.66667 4.88667 8.66667 4.33333C8.66667 3.78 9.11333 3.33333 9.66667 3.33333C10.22 3.33333 10.6667 3.78 10.6667 4.33333C10.6667 4.88667 10.22 5.33333 9.66667 5.33333ZM11.6667 8C11.1133 8 10.6667 7.55333 10.6667 7C10.6667 6.44667 11.1133 6 11.6667 6C12.22 6 12.6667 6.44667 12.6667 7C12.6667 7.55333 12.22 8 11.6667 8Z" fill="#2E2C34" />
                        </svg>
                        <span className="whitespace-nowrap">Theme Settings</span>
                    </button>

                    {/* Save Changes Button */}
                    <button className="px-3 py-3 bg-white border border-[#E4E7EC] rounded-sm text-xs font-medium text-[#24282E] hover:bg-[#F7F8FA] transition-colors shrink-0 whitespace-nowrap">
                        Save Changes
                    </button>

                    {/* Create Form Button */}
                    <button
                        onClick={handleSaveForm}
                        className="px-4 py-3 bg-[#5542F6] text-white rounded-sm text-xs font-medium hover:bg-[#4535D6] transition-colors shrink-0 whitespace-nowrap"
                    >
                        Create Form
                    </button>
                </div>
            </div>

            {/* Form Builder Area - Two Column Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Form Builder */}
                <div className="flex-1 bg-[#FBFBFC] rounded-lg p-6">
                    <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto scroll-hidden">
                        {questions.map((question, index) => {
                            const handleDragStart = () => {
                                setDraggedQuestionId(question.id);
                            };

                            const handleDragEnd = () => {
                                setDraggedQuestionId(null);
                                setDragOverQuestionId(null);
                            };

                            const handleDragOver = (e: React.DragEvent) => {
                                e.preventDefault();
                                if (draggedQuestionId && draggedQuestionId !== question.id) {
                                    setDragOverQuestionId(question.id);
                                }
                            };

                            const handleDrop = (e: React.DragEvent) => {
                                e.preventDefault();
                                if (!draggedQuestionId || draggedQuestionId === question.id) {
                                    return;
                                }

                                const draggedIndex = questions.findIndex(q => q.id === draggedQuestionId);
                                const dropIndex = questions.findIndex(q => q.id === question.id);

                                if (draggedIndex === -1 || dropIndex === -1) {
                                    return;
                                }

                                const newQuestions = [...questions];
                                const [removed] = newQuestions.splice(draggedIndex, 1);
                                newQuestions.splice(dropIndex, 0, removed);

                                setQuestions(newQuestions);
                                setDraggedQuestionId(null);
                                setDragOverQuestionId(null);
                            };

                            return (
                                <QuestionCard
                                    key={question.id}
                                    question={question}
                                    index={index}
                                    isExpanded={expandedQuestionId === question.id}
                                    onToggleExpand={() => {
                                        setExpandedQuestionId(expandedQuestionId === question.id ? null : question.id);
                                    }}
                                    onUpdate={(updatedQuestion) => {
                                        const newQuestions = questions.map(q =>
                                            q.id === question.id ? updatedQuestion : q
                                        );
                                        setQuestions(newQuestions);
                                    }}
                                    onDelete={() => {
                                        setQuestions(questions.filter(q => q.id !== question.id));
                                        if (expandedQuestionId === question.id) {
                                            setExpandedQuestionId(null);
                                        }
                                    }}
                                    onDuplicate={() => {
                                        const newQuestion: Question = {
                                            ...question,
                                            id: `question-${Date.now()}-${Math.random()}`,
                                            title: `${question.title} (Copy)`
                                        };
                                        const currentIndex = questions.findIndex(q => q.id === question.id);
                                        const newQuestions = [...questions];
                                        newQuestions.splice(currentIndex + 1, 0, newQuestion);
                                        setQuestions(newQuestions);
                                    }}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    isDragging={draggedQuestionId === question.id}
                                    isDragOver={dragOverQuestionId === question.id}
                                />
                            );
                        })}
                    </div>

                    {/* Add Question Button */}
                    <button
                        onClick={() => {
                            const newQuestion: Question = {
                                id: `question-${Date.now()}-${Math.random()}`,
                                type: 'text',
                                title: '',
                                options: [],
                                required: false
                            };
                            setQuestions([...questions, newQuestion]);
                            setExpandedQuestionId(newQuestion.id);
                        }}
                        className="md:w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white border-3 border-[#E0E0E0] rounded-md text-sm font-medium hover:bg-[#F5F3FF] transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_553_29740" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_553_29740)">
                                <path d="M11.25 12.75V16C11.25 16.2125 11.3219 16.3906 11.4658 16.5343C11.6096 16.6781 11.7878 16.75 12.0003 16.75C12.2129 16.75 12.391 16.6781 12.5345 16.5343C12.6782 16.3906 12.75 16.2125 12.75 16V12.75H16C16.2125 12.75 16.3906 12.6781 16.5343 12.5343C16.6781 12.3904 16.75 12.2122 16.75 11.9998C16.75 11.7871 16.6781 11.609 16.5343 11.4655C16.3906 11.3218 16.2125 11.25 16 11.25H12.75V8C12.75 7.7875 12.6781 7.60942 12.5343 7.46575C12.3904 7.32192 12.2122 7.25 11.9998 7.25C11.7871 7.25 11.609 7.32192 11.4655 7.46575C11.3218 7.60942 11.25 7.7875 11.25 8V11.25H8C7.7875 11.25 7.60942 11.3219 7.46575 11.4658C7.32192 11.6096 7.25 11.7878 7.25 12.0003C7.25 12.2129 7.32192 12.391 7.46575 12.5345C7.60942 12.6782 7.7875 12.75 8 12.75H11.25ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="black" />
                            </g>
                        </svg>
                        <span>Add Question</span>
                    </button>

                    {/* Generate Form Button - Only for Long Forms */}
                    <button
                        onClick={handleSaveForm}
                        className=" mt-3 flex items-center justify-center gap-2 px-6 py-3 bg-[#5542F6] text-white rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors"
                    >
                        
                        <span>Generate Form</span>
                    </button>
                </div>

                {/* Right: Form Preview */}
                <div className="lg:w-[60%]">
                    <FormPreview questions={questions} />
                </div>
            </div>

            {/* Success Modal */}
            <FormCreatedSuccessModal
                isOpen={showSuccessModal}
                onClose={handleModalClose}
                isEditMode={isEditMode}
            />
        </div>
    );
}

