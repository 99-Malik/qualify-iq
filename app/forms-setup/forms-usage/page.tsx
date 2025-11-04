'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import AppLayout from '../../../components/Layout/AppLayout';
import FormPreview from '../../../components/Forms/Components/FormPreview';
import EmbedFormModal from '../../../components/Forms/Components/EmbedFormModal';
import GetApiModal from '../../../components/Forms/Components/GetApiModal';
import { SavedForm, loadForm } from '../../../components/Forms/utils/formStorage';

function FormsUsageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const formId = searchParams.get('id');
    const [form, setForm] = useState<SavedForm | null>(null);
    const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
    const [isGetApiModalOpen, setIsGetApiModalOpen] = useState(false);

    useEffect(() => {
        if (formId && typeof window !== 'undefined') {
            try {
                const foundForm = loadForm(formId);
                if (foundForm) {
                    setForm(foundForm);
                }
            } catch (e) {
                console.error('Error loading form:', e);
            }
        }
    }, [formId]);

    if (!form) {
        return (
            <AppLayout activeKey="forms-setup">
                <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-lg text-[#727A90]">Form not found</p>
                    <button
                        onClick={() => router.push('/forms-setup')}
                        className="mt-4 px-6 py-2 bg-[#5542F6] text-white rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors"
                    >
                        Back to Forms
                    </button>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout activeKey="forms-setup">
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>Home</span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/forms-setup')}>Forms Setup</span>
                </nav>
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-8">Forms Setup</h1>

            <div className='p-4'>
                <div className='w-full h-px bg-[#EBEAED] mb-6'></div>
            </div>
            <div className="bg-white border border-[#E4E7EC] rounded-lg p-6">

                {/* Page Title */}

                {/* Form Information and Action Buttons */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
                    {/* Left: Form Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold text-[#24282E]">{form.title}</h2>
                            <span className={`px-3 py-2 rounded-sm text-xs font-medium ${form.type === 'Short Form'
                                ? 'bg-[#c8c2fc] text-black text-extrabold'
                                : form.type === 'Long Form'
                                    ? 'bg-[#FFDFC0] text-black text-extrabold'
                                    : 'bg-[#E9E8FB] text-[#5542F6]'
                                }`}>
                                {form.type}
                            </span>
                        </div>
                        <p className="text-sm text-[#727A90]">{form.description}</p>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-wrap gap-3 lg:shrink-0">
                        {/* Get API Button */}
                        <button 
                            onClick={() => setIsGetApiModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#E4E7EC] rounded-sm text-sm font-semibold text-[#24282E] hover:bg-[#F7F8FA] transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.33366 7.99984L8.00033 9.33317L6.66699 7.99984L8.00033 6.6665L9.33366 7.99984ZM8.00033 3.99984L9.41366 5.41317L11.0803 3.7465L8.00033 0.666504L4.92033 3.7465L6.58699 5.41317L8.00033 3.99984ZM4.00033 7.99984L5.41366 6.5865L3.74699 4.91984L0.666992 7.99984L3.74699 11.0798L5.41366 9.41317L4.00033 7.99984ZM12.0003 7.99984L10.587 9.41317L12.2537 11.0798L15.3337 7.99984L12.2537 4.91984L10.587 6.5865L12.0003 7.99984ZM8.00033 11.9998L6.58699 10.5865L4.92033 12.2532L8.00033 15.3332L11.0803 12.2532L9.41366 10.5865L8.00033 11.9998Z" fill="#2E2C34" />
                            </svg>

                            <span>Get API</span>
                        </button>

                        {/* Embed the Form Button */}
                        <button 
                            onClick={() => setIsEmbedModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#E4E7EC] rounded-sm text-sm font-semibold text-[#24282E] hover:bg-[#F7F8FA] transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.26634 11.0667L3.19967 8L6.26634 4.93333L5.33301 4L1.33301 8L5.33301 12L6.26634 11.0667ZM9.73301 11.0667L12.7997 8L9.73301 4.93333L10.6663 4L14.6663 8L10.6663 12L9.73301 11.0667Z" fill="#2E2C34" />
                            </svg>

                            <span>Embed the Form</span>
                        </button>

                        {/* Hyperlink to Website Button */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#E4E7EC] rounded-sm text-sm font-semibold text-[#24282E] hover:bg-[#F7F8FA] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.59967 7.99984C2.59967 6.85984 3.52634 5.93317 4.66634 5.93317H7.33301V4.6665H4.66634C2.82634 4.6665 1.33301 6.15984 1.33301 7.99984C1.33301 9.83984 2.82634 11.3332 4.66634 11.3332H7.33301V10.0665H4.66634C3.52634 10.0665 2.59967 9.13984 2.59967 7.99984ZM5.33301 8.6665H10.6663V7.33317H5.33301V8.6665ZM11.333 4.6665H8.66634V5.93317H11.333C12.473 5.93317 13.3997 6.85984 13.3997 7.99984C13.3997 9.13984 12.473 10.0665 11.333 10.0665H8.66634V11.3332H11.333C13.173 11.3332 14.6663 9.83984 14.6663 7.99984C14.6663 6.15984 13.173 4.6665 11.333 4.6665Z" fill="#2E2C34" />
                            </svg>

                            <span>Hyperlink to Website</span>
                        </button>
                    </div>
                </div>

                {/* Form Preview - Non-interactive Preview Mode */}
                <div className="bg-white border border-[#E4E7EC] rounded-lg p-4 mb-6 relative overflow-hidden">
                    {/* Overlay to prevent interactions - like Canva preview */}
                    <div
                        className="absolute inset-0 z-10 cursor-pointer"
                        style={{ pointerEvents: 'auto' }}
                    />
                    {/* Form Preview with disabled interactions */}
                    <div className="pointer-events-none select-none relative" style={{ userSelect: 'none' }}>
                        <FormPreview
                            questions={form.questions}
                            showSubmitButton={false}
                            hideHeader={true}
                            isPreviewOnly={true}
                            maxVisibleQuestions={form.questions.length}
                        />
                    </div>
                </div>

                {/* Edit Form Button */}
                <div className="flex justify-start">
                    <button
                        onClick={() => router.push(`/forms-setup?edit=${form.id}`)}
                        className="px-6 py-2.5 bg-[#FBFAFC] text-black border-2 border-[#E4E7EC]  rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors"
                    >
                        Edit Form
                    </button>
                </div>
            </div>

            {/* Embed Form Modal */}
            <EmbedFormModal
                isOpen={isEmbedModalOpen}
                onClose={() => setIsEmbedModalOpen(false)}
                formId={form.id}
                formTitle={form.title}
                questions={form.questions}
            />

            {/* Get API Modal */}
            <GetApiModal
                isOpen={isGetApiModalOpen}
                onClose={() => setIsGetApiModalOpen(false)}
                formId={form.id}
                formTitle={form.title}
                questions={form.questions}
            />
        </AppLayout>
    );
}

export default function FormsUsagePage() {
    return (
        <Suspense fallback={
            <AppLayout activeKey="forms-setup">
                <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-lg text-[#727A90]">Loading...</p>
                </div>
            </AppLayout>
        }>
            <FormsUsageContent />
        </Suspense>
    );
}

