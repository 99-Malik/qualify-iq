'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from './QuestionCard';
import PreviewDropdown from './PreviewDropdown';
import FormCreatedSuccessModal from './FormCreatedSuccessModal';
import FormWizardHeader from './FormWizardHeader';
import { saveForm } from '../utils/formStorage';

interface SetSuccessCriteriaProps {
    formId?: string; // For edit mode
    questions: Question[];
    onBack: () => void;
    formTitle: string;
    initialCriteria?: any; // For edit mode - preload existing criteria
    onFormSaved?: () => void;
}

interface QuestionCriteria {
    enabled: boolean;
    selectedOption?: string;
    criteriaValue?: string;
}

export default function SetSuccessCriteria({ formId, questions, onBack, formTitle, initialCriteria, onFormSaved }: SetSuccessCriteriaProps) {
    const router = useRouter();
    const isEditMode = !!formId;
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
        questions.length > 0 ? questions[0].id : null
    );
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [criteriaMap, setCriteriaMap] = useState<Record<string, QuestionCriteria>>(() => {
        // If editing and initialCriteria exists, use it; otherwise initialize empty
        if (isEditMode && initialCriteria) {
            return initialCriteria;
        }
        // Initialize empty criteria for new questions
        const initial: Record<string, QuestionCriteria> = {};
        questions.forEach(q => {
            initial[q.id] = {
                enabled: false,
                selectedOption: q.type === 'dropdown' && q.options.length > 0 ? q.options[0] : undefined,
                criteriaValue: ''
            };
        });
        return initial;
    });

    // Sync criteria map when questions change (e.g., new questions added)
    useEffect(() => {
        setCriteriaMap(prev => {
            const updated = { ...prev };
            questions.forEach(q => {
                if (!updated[q.id]) {
                    // Initialize criteria for new questions
                    updated[q.id] = {
                        enabled: false,
                        selectedOption: q.type === 'dropdown' && q.options.length > 0 ? q.options[0] : undefined,
                        criteriaValue: ''
                    };
                }
            });
            // Remove criteria for deleted questions
            Object.keys(updated).forEach(qId => {
                if (!questions.find(q => q.id === qId)) {
                    delete updated[qId];
                }
            });
            return updated;
        });
    }, [questions]);

    const selectedQuestion = questions.find(q => q.id === selectedQuestionId);
    const selectedCriteria = selectedQuestionId ? criteriaMap[selectedQuestionId] : null;

    const handleToggleCriteria = (questionId: string, enabled: boolean) => {
        setCriteriaMap(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                enabled
            }
        }));
    };

    const handleCriteriaChange = (questionId: string, option: string) => {
        setCriteriaMap(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                selectedOption: option
            }
        }));
    };

    const handleSave = () => {
        try {
            saveForm({
                formId: formId,
                title: formTitle || 'Untitled Form',
                questions: questions,
                type: 'Short Form',
                criteria: criteriaMap,
                isEditMode: isEditMode,
            });

            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error saving form:', error);
            alert('Failed to save form. Please try again.');
        }
    };

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>Home</span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/forms-setup')}>Forms Setup</span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={onBack}>Create Form</span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Set Success Criteria</span>
                </nav>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-8">Forms Setup</h1>

            {/* Section Header with Progress */}
            <FormWizardHeader 
                currentStep="criteria" 
                onBack={onBack}
                showBackButton={true}
            />

            {/* Main Content - Two Column Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Panel - Question List */}
                <div className="lg:w-[40%] bg-[#FBFBFC] rounded-lg px-6">
                    

                    <div className="space-y-3 max-h-[calc(100vh-350px)] overflow-y-auto">
                        {questions.map((question, index) => {
                            const isSelected = question.id === selectedQuestionId;
                            const hasCriteria = criteriaMap[question.id]?.enabled || false;
                            const hasCheckmark = hasCriteria;

                            return (
                                <div
                                    key={question.id}
                                    onClick={() => setSelectedQuestionId(question.id)}
                                    className={`flex items-center rounded-lg cursor-pointer transition-colors relative overflow-hidden ${
                                        isSelected
                                            ? 'bg-[#e9e8fb] border-none'
                                            : 'bg-white border border-[#E4E7EC] hover:bg-[#F7F8FA]'
                                    }`}
                                >
                                    {/* Blue Strip for Selected Question */}
                                    {isSelected && (
                                        <div className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-[#5542F6] rounded-l-lg"></div>
                                    )}
                                    
                                    <div className="flex items-center justify-between px-4 py-6 flex-1 w-full">
                                        <div className="flex items-center gap-3 flex-1">
                                            <span className="text-lg font-extrabold text-[#24282E]">
                                                Question {index + 1}
                                            </span>
                                            {hasCheckmark && (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#14B13B"/>
                                                </svg>
                                            )}
                                        </div>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.5 15L12.5 10L7.5 5" stroke="#84818A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Save Form Button */}
                  
                </div>

                {/* Right Panel - Question Details and Success Criteria */}
                <div className="lg:w-[60%] bg-white rounded-lg p-6 relative overflow-hidden">
                    {/* Blue Strip for Right Panel */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-[#5542F6] rounded-l-lg"></div>
                    
                    {selectedQuestion ? (
                        <div>
                            {/* Question Title and Success Criteria Toggle */}
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-[#24282E]">Question {questions.findIndex(q => q.id === selectedQuestion.id) + 1}</h3>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-[#24282E]">Success Criteria</label>
                                    <button
                                        onClick={() => {
                                            const currentEnabled = criteriaMap[selectedQuestion.id]?.enabled || false;
                                            handleToggleCriteria(selectedQuestion.id, !currentEnabled);
                                        }}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${
                                            criteriaMap[selectedQuestion.id]?.enabled
                                                ? 'bg-[#5542F6]'
                                                : 'bg-[#E4E7EC]'
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                criteriaMap[selectedQuestion.id]?.enabled
                                                    ? 'transform translate-x-6'
                                                    : 'transform translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                            
                            <p className="text-base text-[#24282E] mb-6">{selectedQuestion.title || 'Untitled Question'}</p>

                            {/* Multiple Choice Options Display */}
                            {selectedQuestion.type === 'dropdown' && selectedQuestion.options.length > 0 && (
                                <div className="mb-6">
                                    <div className="space-y-2">
                                        {selectedQuestion.options.map((option, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3 bg-[#FBFBFC] border border-[#E4E7EC] rounded-lg text-sm text-[#24282E]"
                                            >
                                                {option || `Option ${idx + 1}`}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Success Criteria Input */}
                            {criteriaMap[selectedQuestion.id]?.enabled && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-[#24282E] mb-2">Success Criteria</label>
                                    {selectedQuestion.type === 'dropdown' && selectedQuestion.options.length > 0 ? (
                                        <PreviewDropdown
                                            value={criteriaMap[selectedQuestion.id]?.selectedOption || selectedQuestion.options[0]}
                                            options={selectedQuestion.options}
                                            onChange={(value) => handleCriteriaChange(selectedQuestion.id, value)}
                                            placeholder="Select criteria"
                                            paddingY="py-3"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={criteriaMap[selectedQuestion.id]?.criteriaValue || ''}
                                            onChange={(e) => {
                                                setCriteriaMap(prev => ({
                                                    ...prev,
                                                    [selectedQuestion.id]: {
                                                        ...prev[selectedQuestion.id],
                                                        criteriaValue: e.target.value
                                                    }
                                                }));
                                            }}
                                            placeholder="Enter success criteria"
                                            className="w-full px-4 py-3 border-2 border-[#EBEAED] rounded-sm bg-white text-[#24282E] text-sm placeholder:text-[#727A90] focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-[#5542F6]"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-[#727A90] py-12">
                            No question selected
                        </div>
                    )}
                </div>
            </div>
            <div className='px-6'> 
                <button
                    onClick={handleSave}
                    className="mt-6 px-6 py-3 bg-[#5542F6] text-white rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors"
                >
                    Save Form
                </button>
            </div>

            {/* Success Modal */}
            <FormCreatedSuccessModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    // If onFormSaved callback is provided, use it to reset wizard state
                    // Otherwise, navigate to forms-setup
                    if (onFormSaved) {
                        onFormSaved();
                    } else {
                        router.push('/forms-setup');
                    }
                }}
                autoNavigateDelay={2000}
                isEditMode={isEditMode}
            />
        </div>
    );
}

