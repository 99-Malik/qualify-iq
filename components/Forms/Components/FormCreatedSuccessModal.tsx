'use client';

import { useEffect } from 'react';

interface FormCreatedSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    autoNavigateDelay?: number;
    isEditMode?: boolean;
}

export default function FormCreatedSuccessModal({ isOpen, onClose, autoNavigateDelay = 2000, isEditMode = false }: FormCreatedSuccessModalProps) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                if (onClose) {
                    onClose();
                }
            }, autoNavigateDelay);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, autoNavigateDelay]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-xl w-full my-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-8 text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center">
                            <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.3946 4.56592C14.7929 4.56592 4.56543 14.7934 4.56543 27.3951C4.56543 39.9968 14.7929 50.2243 27.3946 50.2243C39.9963 50.2243 50.2238 39.9968 50.2238 27.3951C50.2238 14.7934 39.9963 4.56592 27.3946 4.56592ZM22.8288 38.8097L11.4142 27.3951L14.6331 24.1762L22.8288 32.349L40.1561 15.0217L43.375 18.2634L22.8288 38.8097Z" fill="#14B13B" />
                            </svg>


                        </div>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-2xl font-bold text-[#24282E] mb-4">
                        {isEditMode ? 'Form Updated Successfully!' : 'Form Created Successfully!'}
                    </h2>

                    {/* Description Text */}
                    <p className="text-base text-[#727A90] mb-6 leading-relaxed">
                        Unlock your leads with QualifIQ! Join us and transform your sales strategy today.
                    </p>

                    {/* Close Button */}
                    
                </div>
            </div>
        </div>
    );
}

