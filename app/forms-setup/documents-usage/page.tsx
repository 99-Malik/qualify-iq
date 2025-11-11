'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import AppLayout from '../../../components/Layout/AppLayout';
import PDFViewer from '../../../components/Documents/PDFViewer';
import SignatureField from '../../../components/Documents/SignatureField';
import { SavedDocument, loadDocument } from '../../../components/Documents/utils/documentStorage';
import { getDocumentTypeConfig } from '../../../components/Documents/types';

function DocumentsUsageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const documentId = searchParams.get('id');
    const [document, setDocument] = useState<SavedDocument | null>(null);

    useEffect(() => {
        if (documentId && typeof window !== 'undefined') {
            try {
                const foundDocument = loadDocument(documentId);
                if (foundDocument) {
                    setDocument(foundDocument);
                } else {
                    // Document not found or has invalid blob URL
                    console.warn('Document not found or has invalid blob URL:', documentId);
                }
            } catch (e) {
                console.error('Error loading document:', e);
            }
        }
    }, [documentId]);

    if (!document) {
        return (
            <AppLayout activeKey="forms-setup">
                <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-lg text-[#727A90]">Document not found</p>
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

    const documentConfig = getDocumentTypeConfig(document.type);

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
                {/* Document Information and Action Buttons */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
                    {/* Left: Document Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 min-w-0">
                            <h2 
                                className="text-xl font-bold text-[#24282E] truncate" 
                                title={document.name}
                            >
                                {document.name}
                            </h2>
                            <span className="px-3 py-2 rounded-sm text-xs font-semibold bg-[#FFBEBE] text-black">
                                {documentConfig.displayName}
                            </span>
                        </div>
                        <p className="text-sm text-[#727A90]">Document preview with all signatures and annotations</p>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-wrap gap-3 lg:shrink-0">
                        {/* Download Button */}
                        <button 
                            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#E4E7EC] rounded-sm text-sm font-semibold text-[#24282E] hover:bg-[#F7F8FA] transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 11.3333L4 7.33333H6V2.66667H10V7.33333H12L8 11.3333ZM2.66667 13.3333H13.3333V14.6667H2.66667V13.3333Z" fill="#2E2C34" />
                            </svg>
                            <span>Download</span>
                        </button>

                        {/* Share Button */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#E4E7EC] rounded-sm text-sm font-semibold text-[#24282E] hover:bg-[#F7F8FA] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 10.6667C11.4747 10.6667 11 10.8733 10.6447 11.2047L6.66667 8.47133C6.71067 8.31867 6.73333 8.15867 6.73333 8C6.73333 7.84133 6.71067 7.68133 6.66667 7.52867L10.6333 4.79533C11 5.12667 11.4747 5.33333 12 5.33333C13.1067 5.33333 14 4.44 14 3.33333C14 2.22667 13.1067 1.33333 12 1.33333C10.8933 1.33333 10 2.22667 10 3.33333C10 3.49267 10.0227 3.65267 10.0667 3.80533L6.1 6.53867C5.73333 6.20733 5.25867 6 4.73333 6C3.62667 6 2.73333 6.89333 2.73333 8C2.73333 9.10667 3.62667 10 4.73333 10C5.25867 10 5.73333 9.79333 6.1 9.462L10.0667 12.1953C10.0227 12.348 10 12.508 10 12.6667C10 13.7733 10.8933 14.6667 12 14.6667C13.1067 14.6667 14 13.7733 14 12.6667C14 11.56 13.1067 10.6667 12 10.6667Z" fill="#2E2C34" />
                            </svg>
                            <span>Share</span>
                        </button>
                    </div>
                </div>

                {/* Document Preview - Scrollable PDF with all pages */}
                <div className="bg-white border border-[#E4E7EC] rounded-lg p-6 mb-6 relative overflow-hidden">
                    <div className="w-full h-full min-h-[600px] max-h-[800px] overflow-y-auto custom-scroll">
                        {document.documentUrl ? (
                            <div className="relative w-full">
                                <PDFViewer
                                    url={document.documentUrl}
                                    scale={1.5}
                                    showAllPages={true}
                                    onLoadComplete={(pages) => {
                                        console.log(`PDF loaded with ${pages} pages`);
                                    }}
                                />
                                
                                {/* Signature Fields Overlay - Display all saved signature fields */}
                                {document.signatureFields.map((field) => (
                                    <SignatureField
                                        key={field.id}
                                        id={field.id}
                                        initialX={field.x}
                                        initialY={field.y}
                                        initialWidth={field.width}
                                        initialHeight={field.height}
                                        text={field.text}
                                        imageUrl={field.imageUrl}
                                        type={field.type}
                                        fontFamily={field.fontFamily}
                                        fontWeight={field.fontWeight}
                                        fontSize={field.fontSize}
                                        isPreviewMode={true}
                                        onDelete={() => {
                                            // Disabled in preview mode
                                        }}
                                        onUpdate={() => {
                                            // Disabled in preview mode
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-[#727A90]">Document not available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Edit Document Button */}
                <div className="flex justify-start">
                    <button
                        onClick={() => router.push(`/forms-setup?edit-document=${document.id}`)}
                        className="px-6 py-2.5 bg-[#FBFAFC] text-black border-2 border-[#E4E7EC] rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors"
                    >
                        Edit Document
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}

export default function DocumentsUsagePage() {
    return (
        <Suspense fallback={
            <AppLayout activeKey="forms-setup">
                <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-lg text-[#727A90]">Loading...</p>
                </div>
            </AppLayout>
        }>
            <DocumentsUsageContent />
        </Suspense>
    );
}

