'use client';

import AppLayout from '../../components/Layout/AppLayout';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect, Suspense } from 'react';
import { ChevronDown } from 'lucide-react';
import CreateFormsModal from '../../components/Forms/Components/CreateFormsModal';
import CreateShortForm from '../../components/Forms/FormTypes/CreateShortForm';
import CreateLongForm from '../../components/Forms/FormTypes/CreateLongForm';
import FormCard from '../../components/Forms/Components/FormCard';
import UploadDocument from '../../components/Documents/UploadDocument';
import { DocumentType } from '../../components/Documents/types';
import { SavedForm, loadForm } from '../../components/Forms/utils/formStorage';

function FormsSetupContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editFormId = searchParams.get('edit');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFormType, setSelectedFormType] = useState<string | null>(editFormId ? 'short-inquiry' : null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [forms, setForms] = useState<SavedForm[]>([]);
    const [editFormData, setEditFormData] = useState<SavedForm | null>(null);
    const [isLoadingEditForm, setIsLoadingEditForm] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Load forms from localStorage
    const loadForms = () => {
        if (typeof window !== 'undefined') {
            const savedForms = localStorage.getItem('forms');
            if (savedForms) {
                try {
                    const parsed = JSON.parse(savedForms);
                    setForms(parsed);
                } catch (e) {
                    console.error('Error parsing forms from localStorage:', e);
                }
            } else {
                setForms([]);
            }
        }
    };

    // Delete form handler
    const handleDeleteForm = (formId: string) => {
        if (typeof window !== 'undefined') {
            const savedForms = localStorage.getItem('forms');
            if (savedForms) {
                try {
                    const forms = JSON.parse(savedForms);
                    const updatedForms = forms.filter((form: SavedForm) => form.id !== formId);
                    localStorage.setItem('forms', JSON.stringify(updatedForms));
                    setForms(updatedForms);
                    // Dispatch custom event to notify other components
                    window.dispatchEvent(new Event('formSaved'));
                } catch (e) {
                    console.error('Error deleting form from localStorage:', e);
                }
            }
        }
    };

    useEffect(() => {
        loadForms();
        
        // Reload when window gets focus (when navigating back)
        const handleFocus = () => {
            loadForms();
        };
        
        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                loadForms();
            }
        });

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []); // Reload forms on mount

    // Listen for storage changes (when form is saved from another tab/window)
    useEffect(() => {
        const handleStorageChange = () => {
            loadForms();
        };

        window.addEventListener('storage', handleStorageChange);
        // Also listen for custom event (when saved in same window)
        window.addEventListener('formSaved', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('formSaved', handleStorageChange);
        };
    }, []);

    // Load form data for edit mode
    useEffect(() => {
        if (editFormId && typeof window !== 'undefined') {
            setIsLoadingEditForm(true);
            try {
                const foundForm = loadForm(editFormId);
                if (foundForm) {
                    setEditFormData(foundForm);
                    // Determine form type based on form data
                    if (foundForm.type === 'Long Form') {
                        setSelectedFormType('long-inquiry');
                    } else {
                        setSelectedFormType('short-inquiry');
                    }
                } else {
                    console.error('Form not found for edit:', editFormId);
                }
            } catch (e) {
                console.error('Error loading form for edit:', e);
            }
            setIsLoadingEditForm(false);
        }
    }, [editFormId]);

    // Show loading state if editing and still loading
    if (editFormId && isLoadingEditForm && !editFormData) {
        return (
            <AppLayout activeKey="forms-setup" hideSidebar={true}>
                <div className="flex items-center justify-center py-16">
                    <p className="text-lg text-[#727A90]">Loading form...</p>
                </div>
            </AppLayout>
        );
    }

    // Show CreateShortForm for short-inquiry forms
    if (selectedFormType === 'short-inquiry') {
        return (
            <AppLayout activeKey="forms-setup" hideSidebar={true}>
                <CreateShortForm 
                    formId={editFormId || undefined}
                    initialFormData={editFormData || undefined}
                    onBack={() => {
                        setSelectedFormType(null);
                        setEditFormData(null);
                        if (editFormId) {
                            router.push('/forms-setup');
                        }
                    }}
                    onFormSaved={() => {
                        setSelectedFormType(null);
                        setEditFormData(null);
                        loadForms();
                        if (editFormId) {
                            router.push('/forms-setup');
                        }
                    }}
                />
            </AppLayout>
        );
    }

    // Show CreateLongForm for long-inquiry forms
    if (selectedFormType === 'long-inquiry') {
        return (
            <AppLayout activeKey="forms-setup" hideSidebar={true}>
                <CreateLongForm 
                    formId={editFormId || undefined}
                    initialFormData={editFormData || undefined}
                    onBack={() => {
                        setSelectedFormType(null);
                        setEditFormData(null);
                        if (editFormId) {
                            router.push('/forms-setup');
                        }
                    }}
                    onFormSaved={() => {
                        setSelectedFormType(null);
                        setEditFormData(null);
                        loadForms();
                        if (editFormId) {
                            router.push('/forms-setup');
                        }
                    }}
                />
            </AppLayout>
        );
    }

    // Handle document-based form types (NDA, FDD, Franchise Agreement)
    if (selectedFormType === 'nda' || selectedFormType === 'fdd' || selectedFormType === 'franchise-agreement') {
        return (
            <AppLayout activeKey="forms-setup" hideSidebar={true}>
                <UploadDocument 
                    documentType={selectedFormType as DocumentType}
                    onBack={() => setSelectedFormType(null)} 
                />
            </AppLayout>
        );
    }

    // Placeholder for other form types - they will have their own wizard components
    if (selectedFormType) {
        return (
            <AppLayout activeKey="forms-setup" hideSidebar={true}>
                <div className="mb-2">
                    <nav className="text-sm">
                        <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>Home</span>
                        <span className="text-[#727A90] mx-1">/</span>
                        <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => setSelectedFormType(null)}>Forms Setup</span>
                        <span className="text-[#727A90] mx-1">/</span>
                        <span className="text-[#24282E]">Create Form</span>
                    </nav>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#24282E] mb-8">Forms Setup</h1>
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="text-center">
                        <p className="text-lg text-[#727A90] font-medium">Wizard for {selectedFormType} coming soon</p>
                        <button 
                            onClick={() => setSelectedFormType(null)}
                            className="mt-4 px-6 py-2.5 bg-[#5542F6] text-white rounded-lg text-sm font-medium hover:bg-[#4535D6] transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
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
                    <span className="text-[#24282E] ">Forms Setup</span>
                </nav>
            </div>

            {/* Page Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-[#24282E] mb-4">Forms Setup</h1>

            {/* Separator */}
            <div className="w-full h-px bg-[#E4E7EC] mb-6"></div>

            {/* Content Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                {/* Left: All Forms text */}
                <h2 className="text-xl font-bold text-[#24282E]">All Forms</h2>

                {/* Right: Dropdown and Button */}
                <div className="flex items-center gap-3">
                    {/* Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center justify-center gap-2 bg-white border border-[#E4E7EC] rounded-[4px] h-[42px] px-6 py-[11px] text-sm font-medium text-[#24282E] hover:bg-[#F7F8FA] transition-colors"
                        >
                            <span>All Forms</span>
                            <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6L8 10L12 6H4Z" fill="#2E2C34" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-[#E4E7EC] rounded-md shadow-lg z-10 w-full">
                                <button
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="w-full text-left px-4 py-2 text-sm text-[#24282E] hover:bg-[#F7F8FA]"
                                >
                                    All Forms
                                </button>
                                <button
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="w-full text-left px-4 py-2 text-sm text-[#24282E] hover:bg-[#F7F8FA]"
                                >
                                    Active Forms
                                </button>
                                <button
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="w-full text-left px-4 py-2 text-sm text-[#24282E] hover:bg-[#F7F8FA]"
                                >
                                    Archived Forms
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Create Form Button */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-white rounded-[4px] h-[42px] px-6 py-[11px] text-sm font-medium hover:bg-[#4535D6] transition-colors"
                    >
                        Create Form
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {forms.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="text-center">
                        <p className="text-lg text-[#727A90] font-medium">No form created till now</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6 auto-rows-fr">
                    {forms.map((form) => (
                        <FormCard
                            key={form.id}
                            id={form.id}
                            title={form.title}
                            description={form.description}
                            type={form.type}
                            questions={form.questions}
                            createdAt={form.createdAt}
                            onUse={() => {
                                // Navigate to forms usage page with form ID
                                router.push(`/forms-setup/forms-usage?id=${form.id}`);
                            }}
                            onDelete={() => handleDeleteForm(form.id)}
                        />
                    ))}
                </div>
            )}

            {/* Floating Ask AI Button */}
            <button 
                onClick={() => router.push('/ai-assistance')}
                className="fixed bottom-24 right-12 bg-primary text-white rounded-md px-6 py-4 shadow-lg hover:bg-[#4535D6] transition-colors flex items-center gap-1 z-50"
            >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.16602 2.3335V15.1668H11.666V25.6668L19.8327 11.6668H15.166L19.8327 2.3335H8.16602Z" fill="white" />
                </svg>

                <span className="font-medium text-md">Ask AI</span>
            </button>

            {/* Create Forms Modal */}
            <CreateFormsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={(formType) => {
                    setSelectedFormType(formType);
                    setIsModalOpen(false);
                }}
            />

        </AppLayout>
    );
}

export default function FormsSetupPage() {
    return (
        <Suspense fallback={
            <AppLayout activeKey="forms-setup">
                <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-lg text-[#727A90]">Loading...</p>
                </div>
            </AppLayout>
        }>
            <FormsSetupContent />
        </Suspense>
    );
}


