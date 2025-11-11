'use client';

import React, { Suspense, useState, useEffect } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { useRouter, useSearchParams } from 'next/navigation';
import FormPreview from '@/components/Forms/Components/FormPreview';
import GoogleMeetsSvg from '@/components/Svgs/GoogleMeetsSvg';
import { SavedForm } from '@/components/Forms/utils/formStorage';
import { SavedDocument, loadAllDocuments } from '@/components/Documents/utils/documentStorage';
import { getDocumentTypeConfig, DocumentType } from '@/components/Documents/types';
import ChangeModal from '@/components/CapturedLeads/Modals/ChangeModal';
import ViewNotesModal from '@/components/CapturedLeads/Modals/ViewNotes';

function LeadDetailsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const leadId = searchParams.get('id') || 'CLIENT-0024';
    const [forms, setForms] = useState<SavedForm[]>([]);
    const [documents, setDocuments] = useState<SavedDocument[]>([]);
    const [changeModalOpen, setChangeModalOpen] = useState(false);
    const [changeModalItem, setChangeModalItem] = useState<{
        id: string;
        type: 'Short Form' | 'Long Form' | 'document';
    } | null>(null);
    const [viewNotesOpen, setViewNotesOpen] = useState(false);

    // Mock data - in real app, this would come from API
    const leadData = {
        id: leadId,
        name: 'Lead Name Goes here',
        representative: 'Representative Name',
        company: 'Company Name',
        budget: '$2500.00',
        timeAgo: '20 hrs ago',
    };

    const meetings = [
        { id: 1, name: 'Meeting Name', date: 'Tomorrow at 08:00 am', status: 'Upcoming', statusColor: '#ffdfc0' },
        { id: 2, name: 'Meeting Name', date: '26 Sep 2025, 08:00 am', status: 'Generating...', statusColor: '#727A90' },
        { id: 3, name: 'Meeting Name', date: '26 Sep 2025, 08:00 am', hasViewNotes: true },
        { id: 4, name: 'Meeting Name', date: '26 Sep 2025, 08:00 am', hasViewNotes: true },
        { id: 5, name: 'Meeting Name', date: '26 Sep 2025, 08:00 am', hasViewMeeting: true },
    ];

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
                    setForms([]);
                }
            } else {
                setForms([]);
            }
        }
    };

    // Load documents from localStorage
    const loadDocuments = () => {
        if (typeof window !== 'undefined') {
            try {
                const allDocs = loadAllDocuments();
                setDocuments(allDocs);
            } catch (e) {
                console.error('Error loading documents from localStorage:', e);
                setDocuments([]);
            }
        }
    };

    useEffect(() => {
        loadForms();
        loadDocuments();

        // Listen for storage changes
        const handleStorageChange = () => {
            loadForms();
            loadDocuments();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('formSaved', handleStorageChange);
        window.addEventListener('documentSaved', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('formSaved', handleStorageChange);
            window.removeEventListener('documentSaved', handleStorageChange);
        };
    }, []);

    // Get type color based on form/document type
    const getTypeColor = (type: string): string => {
        if (type === 'Short Form') return '#5542F6';
        if (type === 'Long Form') return '#FFA043';
        // For documents (NDA, FDD, Franchise Agreement)
        return '#FC3400';
    };

    // Get display name for document types
    const getDisplayType = (type: string, isDocument: boolean): string => {
        if (isDocument) {
            try {
                const config = getDocumentTypeConfig(type as DocumentType);
                return config.displayName;
            } catch {
                return type;
            }
        }
        return type;
    };

    // Combine forms and documents for display
    const allItems = [
        ...forms.map(form => ({
            id: form.id,
            title: form.title,
            type: form.type,
            displayType: form.type,
            typeColor: getTypeColor(form.type),
            questions: form.questions,
            isDocument: false,
        })),
        ...documents.map(doc => ({
            id: doc.id,
            title: doc.name,
            type: 'document' as const, // Use 'document' as type for badge styling
            displayType: getDisplayType(doc.type, true),
            typeColor: getTypeColor(doc.type),
            questions: [] as any[],
            isDocument: true,
            documentUrl: doc.documentUrl,
        })),
    ];

    const handleChangeClick = (item: typeof allItems[0]) => {
        setChangeModalItem({
            id: item.id,
            type: item.isDocument ? 'document' : (item.type as 'Short Form' | 'Long Form'),
        });
        setChangeModalOpen(true);
    };

    const handleSaveChange = (selectedId: string) => {
        // Update the item in allItems - in a real app, this would update the backend
        // For now, we'll just close the modal
        // You can add logic here to update the lead's form/document assignment
        console.log('Changing item to:', selectedId);
        setChangeModalOpen(false);
        setChangeModalItem(null);
    };

    const handleEditClick = (item: typeof allItems[0]) => {
        if (item.isDocument) {
            // Navigate to forms-setup page with edit-document parameter
            router.push(`/forms-setup?edit-document=${item.id}`);
        } else {
            // Navigate to forms-setup page with edit parameter
            router.push(`/forms-setup?edit=${item.id}`);
        }
    };

    return (
        <AppLayout activeKey="captured" hideSidebar={true}>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/captured-leads')}>
                        Captured Leads
                    </span>
                </nav>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-6">Captured Leads</h1>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-6 mt-4"></div>

            {/* Back Arrow and Lead Details Heading */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => router.push('/captured-leads')}
                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold text-[#24282E]">Lead Details</h2>
            </div>

            {/* Lead Details Card */}
            <div className="bg-white  rounded-lg p-6 mb-8 relative">
                <div className="flex items-start gap-4">
                    {/* Circular Light Green Icon with Lightning Bolt */}
                    <div className="flex items-center justify-center shrink-0">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="24" fill="#14B13B" fillOpacity="0.1" />
                            <path d="M23.0001 33H22.0001L23.0001 26H19.5001C18.9201 26 18.9301 25.68 19.1201 25.34C19.3101 25 19.1701 25.26 19.1901 25.22C20.4801 22.94 22.4201 19.54 25.0001 15H26.0001L25.0001 22H28.5001C28.9901 22 29.0601 22.33 28.9701 22.51L28.9001 22.66C24.9601 29.55 23.0001 33 23.0001 33Z" fill="#14B13B" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#24282E] mb-1">{leadData.name}</h3>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-[#24282E]">
                                {leadData.representative} • {leadData.company}
                            </p>
                            {/* Timestamp */}
                            <span className="text-md text-[#727A90] shrink-0">{leadData.timeAgo}</span>
                        </div>
                        <p className="text-sm font-medium" style={{ color: '#5542f6' }}>
                            Budget: {leadData.budget}
                        </p>
                    </div>
                </div>
            </div>

            {/* Meetings Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#24282E] mb-4">Meetings</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 scroll-hidden">
                    {meetings.map((meeting) => (
                        <div
                            key={meeting.id}
                            className="bg-white border border-[#E4E7EC] rounded-lg p-4 flex items-center gap-4 shrink-0 min-w-[300px]"
                        >
                            {/* Calendar Icon */}
                            <div className="shrink-0">
                               <GoogleMeetsSvg/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-[#24282E] mb-1">{meeting.name}</h3>
                                <p className="text-sm text-[#504F54]">({meeting.date})</p>
                            </div>
                            <div className="shrink-0">
                                {meeting.status ? (
                                    <span
                                        className={`px-3 py-1.5 rounded-sm text-sm font-semibold whitespace-nowrap ${meeting.status === 'Generating...' ? 'border border-[#E4E7EC]' : ''}`}
                                        style={{ 
                                            backgroundColor: meeting.status === 'Upcoming' ? '#ffdfc0' : '#E0E0E0',
                                            color: '#2E2C34'
                                        }}
                                    >
                                        {meeting.status}
                                    </span>
                                ) : meeting.hasViewMeeting ? (
                                    <button 
                                        onClick={() => {
                                            router.push(`/captured-leads/lead-details/view-meeting?id=${leadId}&meetingId=${meeting.id}`);
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-[#2E2C34] bg-white border border-[#E4E7EC] rounded-sm hover:bg-[#F7F8FA] transition-colors whitespace-nowrap"
                                    >
                                        View Meeting
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => setViewNotesOpen(true)}
                                        className="px-4 py-2 text-sm font-medium text-[#2E2C34] bg-white border border-[#E4E7EC] rounded-sm hover:bg-[#F7F8FA] transition-colors whitespace-nowrap"
                                    >
                                        View Notes
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Forms Section */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-2xl font-bold text-[#24282E]">Forms</h2>
                    <span className="px-3 py-1.5 rounded-sm text-sm font-semibold text-[#2E2C34] bg-[#ffdfc0] bg-opacity-20">
                        Remaining Time : 00:00:20:21
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allItems.length === 0 ? (
                        <div className="col-span-full text-center py-8">
                            <p className="text-sm text-[#727A90]">No forms or documents available</p>
                        </div>
                    ) : (
                        allItems.map((item) => (
                            <div key={item.id} className="bg-white border border-[#E4E7EC] rounded-lg p-6 flex flex-col h-full">
                                {/* Layout as in image: Left side with title and badge, Right side with preview */}
                                <div className="flex gap-4 flex-1">
                                    {/* Left side: Title and Badge */}
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <h3 
                                            className="text-xl font-bold text-[#24282E] mb-3 truncate" 
                                            title={item.title}
                                        >
                                            {item.title}
                                        </h3>
                                        <span className={`w-fit px-3 py-2 rounded-sm text-xs font-medium mb-auto text-center ${
                                            item.type === 'Short Form' 
                                                ? 'bg-[#c8c2fc] text-black text-extrabold' 
                                                : item.type === 'Long Form'
                                                ? 'bg-[#FFDFC0] text-black text-extrabold'
                                                : 'bg-[#FFBEBE] text-black font-semibold'
                                        }`}>
                                            {item.displayType}
                                        </span>
                                        {/* Change button aligned at bottom */}
                                        <button 
                                            onClick={() => handleChangeClick(item)}
                                            className="mt-auto w-fit px-4 py-2 text-sm font-medium text-[#24282E] border border-[#E4E7EC] rounded-sm hover:bg-[#F7F8FA] transition-colors"
                                        >
                                            Change
                                        </button>
                                    </div>
                                    {/* Right side: Form Preview */}
                                    <div className="flex-1 relative">
                                        {!item.isDocument && item.questions.length > 0 ? (
                                            <div className="bg-white border border-[#E4E7EC] rounded-lg p-4 relative overflow-hidden h-full">
                                                {/* Floating Edit Button */}
                                                <button 
                                                    onClick={() => handleEditClick(item)}
                                                    className="absolute top-3 right-3 z-30 bg-white border border-[#E4E7EC] rounded-sm px-3 py-1.5 text-sm font-medium text-[#24282E]  hover:bg-[#F7F8FA] transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                {/* Overlay to prevent interactions - like Canva preview */}
                                                <div 
                                                    className="absolute inset-0 z-10 cursor-pointer"
                                                    style={{ pointerEvents: 'auto' }}
                                                />
                                                {/* Form Preview with disabled interactions - Limited height for cards */}
                                                <div className="pointer-events-none select-none relative" style={{ userSelect: 'none', maxHeight: '400px', overflow: 'hidden' }}>
                                                    <FormPreview
                                                        questions={item.questions}
                                                        showSubmitButton={false}
                                                        hideHeader={true}
                                                        isPreviewOnly={true}
                                                        maxVisibleQuestions={5}
                                                    />
                                                    {/* Show question count indicator and gradient fade for long forms */}
                                                    {item.questions.length > 5 && (
                                                        <>
                                                            {/* Question count indicator - styled as a small badge/tag */}
                                                            <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
                                                                <span className="inline-block px-2 py-1 bg-primary border border-[#E4E7EC] rounded text-[13px] text-white font-medium">
                                                                    +{item.questions.length - 5} more question{item.questions.length - 5 > 1 ? 's' : ''}
                                                                </span>
                                                            </div>
                                                            {/* Gradient fade at bottom for long forms - industry standard */}
                                                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/98 to-transparent pointer-events-none z-10" />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ) : item.isDocument ? (
                                            <div className="bg-white border border-[#E4E7EC] rounded-lg p-4 relative overflow-hidden h-full min-h-[200px] flex items-center justify-center">
                                                {/* Floating Edit Button */}
                                                <button 
                                                    onClick={() => handleEditClick(item)}
                                                    className="absolute top-3 right-3 z-30 bg-white border border-[#E4E7EC] rounded-sm px-3 py-1.5 text-sm font-medium text-[#24282E] shadow-sm hover:bg-[#F7F8FA] transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <div className="text-center">
                                                    <svg width="50" height="62" viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
                                                        <path d="M0 2.5C0 1.11929 1.11929 0 2.5 0H35.9889C36.6461 0 37.2769 0.258794 37.7447 0.720375L49.2558 12.0776C49.732 12.5473 50 13.1883 50 13.8572V59C50 60.3807 48.8807 61.5 47.5 61.5H2.5C1.11929 61.5 0 60.3807 0 59V2.5Z" fill="url(#paint0_linear_553_27677)" />
                                                        <path d="M0 59V2.5C6.81751e-07 1.14087 1.08457 0.0350186 2.43545 0.00078125L2.5 0H35.9889L36.0504 0.00078125C36.6853 0.0163882 37.2915 0.273245 37.7447 0.72041L49.2559 12.0775C49.732 12.5473 50 13.1884 50 13.8572V59L49.9992 59.0646C49.9655 60.394 48.894 61.4655 47.5646 61.4992L47.5 61.5V61.4C48.8255 61.4 49.9 60.3255 49.9 59V13.8572C49.9 13.2151 49.6427 12.5997 49.1856 12.1487L37.6745 0.791602C37.2254 0.348484 36.6198 0.1 35.9889 0.1H2.5C1.17452 0.1 0.100001 1.17452 0.1 2.5V59C0.1 60.3255 1.17452 61.4 2.5 61.4V61.5L2.43545 61.4992C1.10602 61.4655 0.034475 60.394 0.00078125 59.0646L0 59ZM47.5 61.4V61.5H2.5V61.4H47.5Z" fill="#E4E4E4" />
                                                        <path d="M0 42H50V59C50 60.3807 48.8807 61.5 47.5 61.5H2.5C1.11929 61.5 0 60.3807 0 59V42Z" fill="#FF2116" />
                                                        <path d="M21.6615 10.7889C21.8066 8.1656 25.0479 7.84624 25.8945 10.7889C26.5717 13.143 25.4826 16.9252 24.7892 19.6258C25.4826 21.2137 27.7478 24.1563 29.0977 25.4566C33.6053 24.7722 36.1451 24.8485 37.8154 25.6391C40.0806 26.7112 39.6001 29.3489 37.4035 29.5626C35.5273 29.7451 32.7586 29.5625 28.8232 26.3005C27.8011 26.4374 24.7549 27.026 21.1123 28.2851C19.7166 30.5206 17.7717 33.5782 16.1242 34.9004C13.4243 37.0675 11.3879 36.3604 10.8159 35.1742C10.0379 33.0755 13.1955 31.1137 18.9386 28.2851C19.8462 26.4906 21.9406 22.0029 23.0572 18.4079C22.569 17.2445 21.4784 14.0965 21.6615 10.7889ZM18.1607 29.5169C10.3354 32.8835 10.7015 35.1514 12.1659 35.3795C13.6303 35.6076 15.4379 33.7598 18.1607 29.5169ZM37.312 27.5096C37.2205 25.3653 33.9256 25.3653 29.624 26.0952C34.635 29.6538 37.312 29.0151 37.312 27.5096ZM24.4072 20.4836C23.1991 24.0422 22.0276 26.5439 21.5928 27.3499C24.8511 26.3462 27.4351 25.8063 28.3198 25.6619C26.5076 23.618 24.9563 21.3581 24.4072 20.4836ZM23.469 17.2673C25.3681 11.2223 24.7275 9.30616 23.286 9.51143C21.7759 9.76236 21.9818 14.0509 23.469 17.2673Z" fill="#FF2116" />
                                                        <path d="M32.2593 46.7578V56H30.5137V46.7578H32.2593ZM35.9854 50.7505V52.1279H31.8022V50.7505H35.9854ZM36.4741 46.7578V48.1353H31.8022V46.7578H36.4741Z" fill="white" />
                                                        <path d="M24.8081 56H22.8149L22.8276 54.6289H24.8081C25.3455 54.6289 25.7962 54.5104 26.1602 54.2734C26.5241 54.0322 26.7992 53.6873 26.9854 53.2388C27.1715 52.786 27.2646 52.2443 27.2646 51.6138V51.1377C27.2646 50.651 27.2118 50.2215 27.106 49.8491C27.0002 49.4767 26.8436 49.1636 26.6362 48.9097C26.4331 48.6558 26.1813 48.4632 25.8809 48.332C25.5804 48.2008 25.2355 48.1353 24.8462 48.1353H22.7769V46.7578H24.8462C25.464 46.7578 26.0269 46.8615 26.5347 47.0688C27.0467 47.2762 27.4889 47.5745 27.8613 47.9639C28.238 48.349 28.5257 48.8102 28.7246 49.3477C28.9277 49.8851 29.0293 50.486 29.0293 51.1504V51.6138C29.0293 52.2739 28.9277 52.8748 28.7246 53.4165C28.5257 53.9539 28.238 54.4152 27.8613 54.8003C27.4889 55.1854 27.0446 55.4816 26.5283 55.689C26.012 55.8963 25.4386 56 24.8081 56ZM23.7925 46.7578V56H22.0469V46.7578H23.7925Z" fill="white" />
                                                        <path d="M17.2598 52.6294H14.8794V51.2583H17.2598C17.6491 51.2583 17.9644 51.1948 18.2056 51.0679C18.451 50.9367 18.6309 50.759 18.7451 50.5347C18.8594 50.3062 18.9165 50.0459 18.9165 49.7539C18.9165 49.4704 18.8594 49.2059 18.7451 48.9604C18.6309 48.715 18.451 48.5161 18.2056 48.3638C17.9644 48.2114 17.6491 48.1353 17.2598 48.1353H15.4507V56H13.7051V46.7578H17.2598C17.9792 46.7578 18.5928 46.8869 19.1006 47.145C19.6126 47.3989 20.002 47.7523 20.2686 48.2051C20.5394 48.6536 20.6748 49.1657 20.6748 49.7412C20.6748 50.3379 20.5394 50.8521 20.2686 51.2837C20.002 51.7153 19.6126 52.0475 19.1006 52.2803C18.5928 52.513 17.9792 52.6294 17.2598 52.6294Z" fill="white" />
                                                        <defs>
                                                            <linearGradient id="paint0_linear_553_27677" x1="25" y1="-8.05" x2="25" y2="51.95" gradientUnits="userSpaceOnUse">
                                                                <stop stopColor="#F0F0F0" />
                                                                <stop offset="1" stopColor="#F8F8F8" />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                    <p className="text-sm text-[#727A90] mt-2">{item.title}</p>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Change Modal */}
            {changeModalItem && (
                <ChangeModal
                    isOpen={changeModalOpen}
                    onClose={() => {
                        setChangeModalOpen(false);
                        setChangeModalItem(null);
                    }}
                    onSave={handleSaveChange}
                    currentItemId={changeModalItem.id}
                    itemType={changeModalItem.type}
                    forms={forms}
                    documents={documents}
                />
            )}

            {/* View Notes Modal */}
            <ViewNotesModal
                isOpen={viewNotesOpen}
                onClose={() => setViewNotesOpen(false)}
            />
        </AppLayout>
    );
}

export default function LeadDetailsPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading...</div>}>
            <LeadDetailsContent />
        </Suspense>
    );
}

