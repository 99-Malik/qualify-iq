'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PDFViewer from './PDFViewer';
import SigningElements from './SigningElements';
import SigningProperties from './SigningProperties';
import SignatureField from './SignatureField';
import SignatureDrawModal from './SignatureDrawModal';
import { DocumentType, getDocumentTypeConfig } from './types';
import { signingElementsData } from './signingElementsData';
import type { SavedSignature } from './SigningProperties';
import type { SavedStamp } from './PropertiesComponents/StampProperties';
import { saveDocument, SignatureFieldData as SavedSignatureFieldData, SavedDocument } from './utils/documentStorage';

interface SignatureFieldData {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    pageNumber: number; // Page number where this signature is placed
    text?: string;
    imageUrl?: string; // URL for imported image/PDF
    type?: 'text' | 'image'; // Type of field
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: number;
}

interface SignDocumentProps {
    documentUrl?: string;
    documentName?: string;
    documentType: DocumentType;
    onBack?: () => void;
    onConfirmAndSave?: () => void;
    editDocumentData?: SavedDocument;
}


export default function SignDocument({ documentUrl, documentName, documentType, onBack, onConfirmAndSave, editDocumentData }: SignDocumentProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedElement, setSelectedElement] = useState<string>('signature');
    const previousElementRef = useRef<string>('signature');
    const [signatureFields, setSignatureFields] = useState<SignatureFieldData[]>(editDocumentData?.signatureFields || []);
    const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Track current page for new signatures
    const [numPages, setNumPages] = useState(0); // Total number of pages
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadType, setUploadType] = useState<'signature' | 'stamp' | null>(null);
    const initialFieldIdRef = useRef<string | null>(null); // Track the initial text field ID
    const initialTextSyncCallbackRef = useRef<((text: string) => void) | null>(null); // Callback to sync text back to InitialProperties
    const textFieldRefs = useRef<{ [key: string]: string | null }>({}); // Track text field IDs for each field type
    const textFieldSyncCallbacks = useRef<{ [key: string]: ((text: string) => void) | null }>({}); // Callbacks for each field type
    const [savedSignatures] = useState<SavedSignature[]>([
        { id: 1, data: 'sig1', signatureText: 'Mubarak' },
        { id: 2, data: 'sig2', signatureText: 'Mubarak' },
        { id: 3, data: 'sig3', signatureText: 'Mubarak' },
        { id: 4, data: 'sig4', signatureText: 'Mubarak' }
    ]);
    const [savedStamps] = useState<SavedStamp[]>([]);

    const handleImportSign = () => {
        // Set upload type and trigger file input
        setUploadType('signature');
        setUploadError(null);
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate: Only accept image files
        if (!file.type.startsWith('image/')) {
            const fileTypeName = uploadType === 'signature' ? 'signature' : 'stamp';
            setUploadError(`Invalid file type. Please upload an image file (PNG, JPG, GIF, etc.) for ${fileTypeName}.`);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            // Clear error after 5 seconds
            setTimeout(() => setUploadError(null), 5000);
            return;
        }

        setUploadError(null);
        let imageUrl: string;
        
        // Handle image files only
        imageUrl = URL.createObjectURL(file);

        // Add a new imported field on the current page
        const newField: SignatureFieldData = {
            id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            x: 200,
            y: 200,
            width: 300,
            height: 150,
            pageNumber: currentPage, // Use current visible page
            imageUrl: imageUrl,
            type: 'image'
        };
        setSignatureFields([...signatureFields, newField]);
        
        // Reset file input and upload type
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setUploadType(null);
    };

    const handleDrawNewSign = () => {
        // Open the signature drawing modal
        setIsDrawModalOpen(true);
    };

    const handleSaveDrawnSignature = (signatureDataUrl: string) => {
        // Add a new signature field with the drawn signature image on current page
        const newField: SignatureFieldData = {
            id: `signature-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            x: 200, // Center position relative to container
            y: 200,
            width: 300,
            height: 150,
            pageNumber: currentPage, // Use current visible page
            imageUrl: signatureDataUrl,
            type: 'image'
        };
        setSignatureFields([...signatureFields, newField]);
    };

    const handleSignatureSelect = (signatureId: number) => {
        // Find the selected signature and add it as a new field
        const selectedSig = savedSignatures.find(sig => sig.id === signatureId);
        if (selectedSig) {
            const newField: SignatureFieldData = {
                id: `signature-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                x: 200,
                y: 200,
                width: 300,
                height: 100,
                pageNumber: currentPage, // Use current visible page
                text: selectedSig.signatureText || '',
                type: 'text'
            };
            setSignatureFields([...signatureFields, newField]);
        }
    };

    const handleUploadStamp = () => {
        // Set upload type and trigger file input for stamp upload
        setUploadType('stamp');
        setUploadError(null);
        fileInputRef.current?.click();
    };

    const handleStampSelect = (stampId: number) => {
        // Find the selected stamp and add it as a new field
        const selectedStamp = savedStamps.find(stamp => stamp.id === stampId);
        if (selectedStamp) {
            const newField: SignatureFieldData = {
                id: `stamp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                x: 200,
                y: 200,
                width: 200,
                height: 150,
                pageNumber: currentPage, // Use current visible page
                imageUrl: selectedStamp.imageUrl,
                type: 'image'
            };
            setSignatureFields([...signatureFields, newField]);
        }
    };

    const handleDeleteSignatureField = (id: string) => {
        // If deleting an initial field, clear the ref
        if (initialFieldIdRef.current === id || id.startsWith('initial-')) {
            initialFieldIdRef.current = null;
        }
        // If deleting other text fields, clear their refs
        const textFieldTypes = ['date-signed', 'email', 'name', 'company', 'title'];
        for (const fieldType of textFieldTypes) {
            if (id.startsWith(`${fieldType}-`) && textFieldRefs.current[fieldType] === id) {
                textFieldRefs.current[fieldType] = null;
                break;
            }
        }
        setSignatureFields(prevFields => prevFields.filter(field => field.id !== id));
    };

    const handleUpdateSignatureField = (id: string, data: { x: number; y: number; width: number; height: number; text?: string; imageUrl?: string }) => {
        setSignatureFields(prevFields => {
            const updatedFields = prevFields.map(field =>
                field.id === id ? { ...field, ...data } : field
            );
            
            // If this is a text field and text was updated, sync it back to properties
            if (data.text !== undefined) {
                const updatedField = updatedFields.find(f => f.id === id);
                if (updatedField) {
                    // Check if it's an initial field
                    if (id.startsWith('initial-') && initialTextSyncCallbackRef.current) {
                        initialTextSyncCallbackRef.current(updatedField.text || '');
                    } else {
                        // Check if it's another text field type
                        const fieldTypes = ['date-signed', 'email', 'name', 'company', 'title'];
                        for (const fieldType of fieldTypes) {
                            if (id.startsWith(`${fieldType}-`) && textFieldSyncCallbacks.current[fieldType]) {
                                textFieldSyncCallbacks.current[fieldType]?.(updatedField.text || '');
                                break;
                            }
                        }
                    }
                }
            }
            
            return updatedFields;
        });
    };

    // Reset fields when switching tabs
    useEffect(() => {
        const textBasedFields = ['initial', 'date-signed', 'email', 'name', 'company', 'title'];
        const previousField = previousElementRef.current;
        
        // If switching away from a text-based field, remove all fields of that type
        if (textBasedFields.includes(previousField) && selectedElement !== previousField) {
            const fieldPrefix = previousField === 'initial' ? 'initial-' : `${previousField}-`;
            setSignatureFields(prevFields => {
                const filtered = prevFields.filter(field => !field.id.startsWith(fieldPrefix));
                return filtered;
            });
            
            if (previousField === 'initial') {
                initialFieldIdRef.current = null;
                initialTextSyncCallbackRef.current = null;
            } else {
                textFieldRefs.current[previousField] = null;
                textFieldSyncCallbacks.current[previousField] = null;
            }
        }
        
        // If switching to a text-based field, clear any existing fields of that type first
        if (textBasedFields.includes(selectedElement) && previousField !== selectedElement) {
            const fieldPrefix = selectedElement === 'initial' ? 'initial-' : `${selectedElement}-`;
            setSignatureFields(prevFields => {
                const filtered = prevFields.filter(field => !field.id.startsWith(fieldPrefix));
                return filtered;
            });
            
            if (selectedElement === 'initial') {
                initialFieldIdRef.current = null;
            } else {
                textFieldRefs.current[selectedElement] = null;
            }
        }
        
        previousElementRef.current = selectedElement;
    }, [selectedElement]);

    const handleInitialTextChange = (text: string, fontFamily: string, fontWeight: string, fontSize: number) => {
        if (!text.trim()) {
            // If text is empty, remove all initial fields
            setSignatureFields(prevFields => {
                const initialFields = prevFields.filter(field => field.id.startsWith('initial-'));
                if (initialFields.length > 0) {
                    initialFieldIdRef.current = null;
                    return prevFields.filter(field => !field.id.startsWith('initial-'));
                }
                return prevFields;
            });
            return;
        }

        // Update existing field or create new one using functional update
        setSignatureFields(prevFields => {
            // First, try to find existing initial field by ref
            if (initialFieldIdRef.current) {
                const existingField = prevFields.find(f => f.id === initialFieldIdRef.current);
                if (existingField) {
                    // Update existing field
                    return prevFields.map(field =>
                        field.id === initialFieldIdRef.current 
                            ? { ...field, text, fontFamily, fontWeight, fontSize, pageNumber: currentPage }
                            : field
                    );
                }
            }

            // If ref doesn't point to existing field, find any existing initial field
            const existingInitialField = prevFields.find(f => f.id.startsWith('initial-'));
            if (existingInitialField) {
                // Update the first existing initial field and set ref
                initialFieldIdRef.current = existingInitialField.id;
                return prevFields.map(field =>
                    field.id === existingInitialField.id
                        ? { ...field, text, fontFamily, fontWeight, fontSize, pageNumber: currentPage }
                        : field
                );
            }

            // No existing initial field, create new one
            const newFieldId = `initial-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            initialFieldIdRef.current = newFieldId;
            
            const newField: SignatureFieldData = {
                id: newFieldId,
                x: 200,
                y: 200,
                width: 300,
                height: 100,
                pageNumber: currentPage,
                text: text,
                type: 'text',
                fontFamily,
                fontWeight,
                fontSize
            };
            return [...prevFields, newField];
        });
    };

    const handleTextFieldChange = (fieldType: string, text: string, fontFamily: string, fontWeight: string, fontSize: number) => {
        if (!text.trim()) {
            // If text is empty, remove all fields of this type
            const fieldPrefix = `${fieldType}-`;
            setSignatureFields(prevFields => {
                const filtered = prevFields.filter(field => !field.id.startsWith(fieldPrefix));
                if (filtered.length < prevFields.length) {
                    textFieldRefs.current[fieldType] = null;
                }
                return filtered;
            });
            return;
        }

        // Update existing field or create new one using functional update
        setSignatureFields(prevFields => {
            const fieldPrefix = `${fieldType}-`;
            
            // First, try to find existing field by ref
            if (textFieldRefs.current[fieldType]) {
                const existingField = prevFields.find(f => f.id === textFieldRefs.current[fieldType]);
                if (existingField) {
                    // Update existing field
                    return prevFields.map(field =>
                        field.id === textFieldRefs.current[fieldType]
                            ? { ...field, text, fontFamily, fontWeight, fontSize, pageNumber: currentPage }
                            : field
                    );
                }
            }

            // If ref doesn't point to existing field, find any existing field of this type
            const existingField = prevFields.find(f => f.id.startsWith(fieldPrefix));
            if (existingField) {
                // Update the first existing field and set ref
                textFieldRefs.current[fieldType] = existingField.id;
                return prevFields.map(field =>
                    field.id === existingField.id
                        ? { ...field, text, fontFamily, fontWeight, fontSize, pageNumber: currentPage }
                        : field
                );
            }

            // No existing field, create new one
            const newFieldId = `${fieldType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            textFieldRefs.current[fieldType] = newFieldId;
            
            const newField: SignatureFieldData = {
                id: newFieldId,
                x: 200,
                y: 200,
                width: 300,
                height: 100,
                pageNumber: currentPage,
                text: text,
                type: 'text',
                fontFamily,
                fontWeight,
                fontSize
            };
            return [...prevFields, newField];
        });
    };

    const documentConfig = getDocumentTypeConfig(documentType);

        const handleBack = () => {
            if (onBack) {
                onBack();
            } else {
                router.push('/forms-setup');
            }
        };

        const handleConfirmAndSave = async () => {
            if (!documentUrl || !documentName) {
                console.error('Document URL or name is missing');
                return;
            }

            try {
                // Save the document with all signature fields (now async to convert blob to base64)
                const savedDoc = await saveDocument({
                    documentId: editDocumentData?.id,
                    name: documentName,
                    type: documentType,
                    documentUrl: documentUrl,
                    signatureFields: signatureFields as SavedSignatureFieldData[],
                    isEditMode: !!editDocumentData,
                });

                // Call the callback if provided
                if (onConfirmAndSave) {
                    onConfirmAndSave();
                } else {
                    // Navigate back to forms-setup page after saving
                    router.push('/forms-setup');
                }
            } catch (error) {
                console.error('Error saving document:', error);
            }
        };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Breadcrumb */}
            <div className="mb-2">
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

            {/* Page Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-[#24282E] mb-4">Forms Setup</h1>

            {/* Separator */}
            <div className="w-full h-px bg-[#E4E7EC] mb-6"></div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Header - Action Bar */}
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
                    onClick={handleConfirmAndSave}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#5542F6] text-white rounded-sm font-medium text-sm hover:bg-[#4535D6] transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Confirm & Save</span>
                </button>
            </div>

            {/* Error Message */}
            {uploadError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                        <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#FC3400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 6.66667V10" stroke="#FC3400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 13.3333H10.0083" stroke="#FC3400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-sm text-[#FC3400] font-medium">{uploadError}</p>
                    <button
                        onClick={() => setUploadError(null)}
                        className="ml-auto shrink-0 text-[#FC3400] hover:text-[#D42900] transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            )}

            {/* Main Content Area */}
            <div className='flex-1 bg-white px-2 py-6 rounded-md min-h-0 overflow-hidden'>
            <div className="flex-1 flex gap-6 overflow-hidden min-h-0" style={{ height: 'calc(100vh - 200px)' }}>
                {/* Left Sidebar - Signing Elements */}
                <SigningElements
                    elements={signingElementsData}
                    selectedElement={selectedElement}
                    onElementSelect={setSelectedElement}
                />

                {/* Center - Document View */}
                <div className="flex-1 border border-[#E4E7EC] rounded-lg p-6 flex flex-col overflow-hidden min-h-0 h-full">
                    <div className="w-full h-full px-2 overflow-y-auto custom-scroll">
                        {/* PDF Document Display - Canvas-based rendering (Canva style) */}
                        {documentUrl ? (
                            <div className="relative w-full">
                                <PDFViewer
                                    url={documentUrl}
                                    scale={1.5}
                                    showAllPages={true}
                                    onLoadComplete={(pages) => {
                                        console.log(`PDF loaded with ${pages} pages`);
                                        setNumPages(pages);
                                    }}
                                    onPageChange={(pageNumber) => {
                                        setCurrentPage(pageNumber);
                                    }}
                                />
                                
                                {/* Signature Fields Overlay */}
                                {signatureFields.map((field) => (
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
                                        onDelete={handleDeleteSignatureField}
                                        onUpdate={handleUpdateSignatureField}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-sm text-[#727A90]">No document available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar - Properties */}
                <SigningProperties
                    selectedElement={selectedElement}
                    savedSignatures={savedSignatures}
                    savedStamps={savedStamps}
                    onImportSign={handleImportSign}
                    onDrawNewSign={handleDrawNewSign}
                    onUploadStamp={handleUploadStamp}
                    onSignatureSelect={handleSignatureSelect}
                    onStampSelect={handleStampSelect}
                    onInitialTextChange={handleInitialTextChange}
                    onInitialTextSync={(callback) => {
                        initialTextSyncCallbackRef.current = callback;
                    }}
                    onTextFieldChange={handleTextFieldChange}
                    onTextFieldSync={(fieldType, callback) => {
                        textFieldSyncCallbacks.current[fieldType] = callback;
                    }}
                />
            </div>
            </div>

            {/* Signature Drawing Modal */}
            <SignatureDrawModal
                isOpen={isDrawModalOpen}
                onClose={() => setIsDrawModalOpen(false)}
                onSave={handleSaveDrawnSignature}
            />
        </div>
    );
}

