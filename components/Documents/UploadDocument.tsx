'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SignDocument from './SignDocument';
import { DocumentType, getDocumentTypeConfig } from './types';

interface UploadDocumentProps {
    documentType: DocumentType;
    onBack?: () => void;
}

export default function UploadDocument({ documentType, onBack }: UploadDocumentProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<{
        name: string;
        size: string;
        type: string;
        url?: string;
    } | null>(null);
    const [showSignDocument, setShowSignDocument] = useState(false);

    const documentConfig = getDocumentTypeConfig(documentType);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.push('/forms-setup');
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
            const fileUrl = URL.createObjectURL(file);
            setUploadedFile({
                name: file.name,
                size: `${sizeInMB} mb`,
                type: file.type,
                url: fileUrl,
            });
        }
    };

    const handleSaveDocument = () => {
        // TODO: Implement save functionality
        console.log('Saving document:', uploadedFile, documentType);
        // Show success message or navigate
    };

    const handleSignDocument = () => {
        if (uploadedFile) {
            setShowSignDocument(true);
        }
    };

    if (showSignDocument) {
        return (
            <SignDocument
                documentUrl={uploadedFile?.url}
                documentName={uploadedFile?.name}
                documentType={documentType}
                onBack={() => setShowSignDocument(false)}
                onConfirmAndSave={() => {
                    // TODO: Implement save functionality
                    console.log('Document confirmed and saved', documentType);
                    setShowSignDocument(false);
                    // Optionally show success message or navigate
                }}
            />
        );
    }

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={handleBack}>
                        Forms Setup
                    </span>
                </nav>
            </div>

            {/* Page Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-[#24282E] mb-8">Forms Setup</h1>

            {/* Upload Document Section */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor" />
                    </svg>
                    <span className="text-md font-bold">{documentConfig.uploadTitle}</span>
                </button>

                <button
                    onClick={handleImportClick}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#5542F6] text-white rounded-sm font-medium text-sm hover:bg-[#4535D6] transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6673 6H10.0007V2H6.00065V6H3.33398L8.00065 10.6667L12.6673 6ZM3.33398 12V13.3333H12.6673V12H3.33398Z" fill="#FBFAFC" />
                    </svg>
                    <span>Import File</span>
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>


            {uploadedFile ? (
                <div className="bg-white border border-[#E4E7EC] rounded-lg p-6 mb-6">
                    <div className="bg-[#FBFAFC] border-none rounded-lg p-6 mb-6">
                        <div className="flex items-center justify-between gap-4">
                            {/* Left: PDF Icon and File Info */}
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                {/* PDF Icon */}
                                <div className="relative shrink-0 flex flex-col items-center justify-center">
                                    <svg width="50" height="62" viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-medium text-[#24282E] mb-1 truncate">
                                        {uploadedFile.name}
                                    </p>
                                    <p className="text-sm text-[#727A90]">{uploadedFile.size}</p>
                                </div>
                            </div>

                            {/* Right: Sign Document Button */}
                            <button
                                onClick={handleSignDocument}
                                className="px-4 py-2 border-2 border-[#5542F6] text-[#5542F6] rounded-sm font-medium text-sm hover:bg-[#F7F8FA] transition-colors shrink-0"
                            >
                                Sign Document
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <button
                            onClick={handleSaveDocument}
                            disabled={!uploadedFile}
                            className="px-6 py-2.5 bg-[#5542F6] text-white rounded-sm font-medium text-sm hover:bg-[#4535D6] transition-colors disabled:bg-[#E4E7EC] disabled:text-[#84818A] disabled:cursor-not-allowed"
                        >
                            Save Document
                        </button>
                    </div>
                </div>

            ) : (
                <div
                    className="bg-[#FBFAFC] border border-[#E4E7EC] rounded-lg p-12 mb-6 cursor-pointer hover:border-[#5542F6] transition-colors"
                    onClick={handleImportClick}
                >
                    <div className="text-center">
                        <svg
                            className="mx-auto mb-4 cursor-pointer"
                            width="64"
                            height="64"
                            viewBox="0 0 64 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="64" height="64" rx="8" fill="#E4E7EC" />
                            <path d="M32 22V42M22 32H42" stroke="#84818A" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <p className="text-sm text-[#727A90]">
                            <span className="text-[#5542F6]">No document</span> uploaded yet
                        </p>
                        <p className="text-xs text-[#727A90] mt-1">Click "Import File" or the plus icon to upload a document</p>
                    </div>
                </div>
            )}


        </div>
    );
}

