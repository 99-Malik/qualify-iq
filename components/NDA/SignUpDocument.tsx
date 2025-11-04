'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import PDFViewer from './PDFViewer';

interface SignUpDocumentProps {
    documentUrl?: string;
    documentName?: string;
    onBack?: () => void;
    onConfirmAndSave?: () => void;
}

interface SigningElement {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const signingElements: SigningElement[] = [
    {
        id: 'signature',
        label: 'Signature',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 17.5L5 15L7.5 17.5M15 2.5L12.5 5L15 7.5M7.5 2.5L10 5L7.5 7.5M12.5 15L10 12.5L12.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    },
    {
        id: 'initial',
        label: 'Initial',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5H15M5 10H15M5 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        id: 'stamp',
        label: 'Stamp',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        id: 'date-signed',
        label: 'Date Signed',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="14" height="13" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 2V6M14 2V6M3 8H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        id: 'name',
        label: 'Name',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 16C5 13 7 11 10 11C13 11 15 13 15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        id: 'email',
        label: 'Email Address',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5L10 10L17 5M3 5L3 15L17 15L17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    },
    {
        id: 'company',
        label: 'Company',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17H17M5 17V10H8V17M12 17V8H15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 7H6M4 4H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        )
    },
    {
        id: 'title',
        label: 'Title',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5H15M5 10H15M5 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        )
    }
];

export default function SignUpDocument({ documentUrl, documentName, onBack, onConfirmAndSave }: SignUpDocumentProps) {
    const router = useRouter();
    const [selectedElement, setSelectedElement] = useState<string>('signature');
    const [savedSignatures] = useState([
        { id: 1, data: 'sig1' },
        { id: 2, data: 'sig2' },
        { id: 3, data: 'sig3' },
        { id: 4, data: 'sig4' }
    ]);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.push('/forms-setup');
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor" />
                    </svg>
                    <span className="text-lg font-medium">Sign the Document</span>
                </button>

                <button
                    onClick={onConfirmAndSave}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#5542F6] text-white rounded-sm font-medium text-sm hover:bg-[#4535D6] transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Confirm & Save</span>
                </button>
            </div>

            {/* Breadcrumb */}
            <div className="mb-4">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={handleBack}>
                        Form Setup
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Sign the Document</span>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Left Sidebar - Signing Elements */}
                <div className="md:w-20 lg:w-56 shrink-0 bg-white border border-[#E4E7EC] rounded-lg p-4 overflow-y-auto">
                    <h3 className="text-sm font-bold text-[#24282E] mb-4">Signing Elements</h3>
                    <div className="space-y-2">
                        {signingElements.map((element) => (
                            <button
                                key={element.id}
                                onClick={() => setSelectedElement(element.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                    selectedElement === element.id
                                        ? 'bg-[#5542F6] text-white'
                                        : 'bg-white text-[#24282E] border border-[#E4E7EC] hover:bg-[#F7F8FA]'
                                }`}
                            >
                                <div className={`${selectedElement === element.id ? 'text-white' : 'text-[#84818A]'}`}>
                                    {element.icon}
                                </div>
                                <span className="text-sm font-medium">{element.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Center - Document View */}
                <div className="flex-1 border border-[#E4E7EC] rounded-lg p-6 overflow-y-auto">
                    <div className="flex items-start justify-center h-full min-h-[600px]">
                        {/* PDF Document Display - Canvas-based rendering (Canva style) */}
                        {documentUrl ? (
                            <div className="relative w-full max-w-full">
                                    <PDFViewer
                                        url={documentUrl}
                                        scale={1.5}
                                        onLoadComplete={(pages) => {
                                            console.log(`PDF loaded with ${pages} pages`);
                                        }}
                                    />
                                
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-sm text-[#727A90]">No document available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar - Properties */}
                <div className="md:w-20 lg:w-56 shrink-0 bg-white border border-[#E4E7EC] rounded-lg p-4 overflow-y-auto">
                    <h3 className="text-sm font-bold text-[#24282E] mb-4">Properties</h3>
                    
                    <div className="space-y-3 mb-6">
                        <button className="w-full flex items-center gap-2 px-3 py-2.5 bg-white border border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 2V14M2 8H14" stroke="#84818A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-sm text-[#24282E]">Import Sign</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2.5 bg-white border border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 2L2 8L8 14M14 2L8 8L14 14" stroke="#84818A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-sm text-[#24282E]">Draw New Sign</span>
                        </button>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-xs font-medium text-[#727A90] mb-3 uppercase">Saved Signatures</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {savedSignatures.map((sig) => (
                                <div
                                    key={sig.id}
                                    className="aspect-square bg-white border border-[#E4E7EC] rounded-lg p-2 hover:border-[#5542F6] transition-colors cursor-pointer flex items-center justify-center"
                                >
                                    <svg width="60" height="30" viewBox="0 0 60 30" className="opacity-60">
                                        <path 
                                            d="M5 15 Q15 5, 25 15 T45 15" 
                                            stroke="#84818A" 
                                            strokeWidth="1.5" 
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

