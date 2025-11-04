'use client';

interface FormWizardHeaderProps {
    currentStep: 'create' | 'criteria';
    onBack?: () => void;
    showBackButton?: boolean;
}

export default function FormWizardHeader({ currentStep, onBack, showBackButton = true }: FormWizardHeaderProps) {
    const isCreateStep = currentStep === 'create';
    const isCriteriaStep = currentStep === 'criteria';

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between md:gap-2 lg:gap-4 mb-6">
            {/* Left: Back Arrow + Title */}
            {showBackButton && onBack && (
                <div className="flex items-center gap-1">
                    <button
                        onClick={onBack}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F7F8FA] transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                        </svg>
                    </button>
                    <h2 className="text-md lg:text-lg font-bold text-[#24282E]">Create Short Form</h2>
                </div>
            )}

            {/* Right: Progress Indicator */}
            <div className="flex flex-col">
                {/* Circles and Line Row */}
                <div className="flex items-center relative mb-2">
                    {/* Step 1 Circle - Always completed (purple) */}
                    <div className="w-7 h-7 rounded-full bg-[#5542F6] flex items-center justify-center relative z-10">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M11.6667 3.5L5.25002 9.91667L2.33335 7" 
                                stroke="white" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                            />
                        </svg>
                    </div>

                    {/* Connector Line - Always purple */}
                    <div className="w-16 h-0.5 bg-[#5542F6] mx-4"></div>

                    {/* Step 2 Circle - Purple when on criteria step, grey when on create step */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center relative z-10 ${
                        isCriteriaStep
                            ? 'bg-[#5542F6]'
                            : 'border-2 border-[#84818A] bg-white'
                    }`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M11.6667 3.5L5.25002 9.91667L2.33335 7" 
                                stroke={isCriteriaStep ? "white" : "#84818A"} 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                            />
                        </svg>
                    </div>
                </div>

                {/* Text Labels Row */}
                <div className="flex items-start">
                    <div className="flex flex-col items-center">
                        <span className={`text-sm font-medium md:ml-[-30px] lg:ml-[-20px] ${
                            isCreateStep ? 'text-[#5542F6]' : 'text-[#5542F6]'
                        }`}>
                            Create Form
                        </span>
                    </div>
                    <div className="w-4"></div>
                    <div className="flex flex-col items-center">
                        <span className={`text-sm font-medium md:ml-[36px] lg:ml-[18px] ${
                            isCriteriaStep ? 'text-[#5542F6]' : 'text-[#84818A]'
                        }`}>
                            Success Criteria
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

