import { DocumentType } from '../types';

export interface SignatureFieldData {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    pageNumber: number;
    text?: string;
    imageUrl?: string;
    type?: 'text' | 'image';
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: number;
}

export interface SavedDocument {
    id: string;
    name: string;
    type: DocumentType;
    documentUrl: string; // Can be blob URL, base64 data URL, or regular URL
    documentData?: string; // Base64 encoded PDF data for persistence
    signatureFields: SignatureFieldData[];
    createdAt: string;
}

/**
 * Convert a blob URL or File to base64 string
 * Returns a data URL in the format: data:application/pdf;base64,<base64data>
 */
export const blobToBase64 = async (blobUrl: string): Promise<string> => {
    try {
        const response = await fetch(blobUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch blob: ${response.statusText}`);
        }
        const blob = await response.blob();
        
        // Verify it's a PDF
        if (blob.type && !blob.type.includes('pdf')) {
            console.warn('Blob type is not PDF:', blob.type);
        }
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                // Ensure it's in the correct format
                if (!base64String.startsWith('data:')) {
                    reject(new Error('Invalid data URL format from FileReader'));
                    return;
                }
                // Verify it's a PDF data URL
                if (!base64String.includes('application/pdf') && !base64String.includes('application/octet-stream')) {
                    // If it doesn't have the PDF MIME type, add it
                    const base64Data = base64String.split(',')[1];
                    if (base64Data) {
                        resolve(`data:application/pdf;base64,${base64Data}`);
                    } else {
                        resolve(base64String);
                    }
                } else {
                    resolve(base64String);
                }
            };
            reader.onerror = (error) => {
                console.error('FileReader error:', error);
                reject(new Error('Failed to read blob as data URL'));
            };
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error converting blob to base64:', error);
        throw error;
    }
};

/**
 * Convert base64 string to blob URL
 */
export const base64ToBlobUrl = (base64String: string): string => {
    try {
        // If it's already a data URL, use it directly
        if (base64String.startsWith('data:')) {
            return base64String;
        }
        // Otherwise, assume it's base64 without prefix
        return `data:application/pdf;base64,${base64String}`;
    } catch (error) {
        console.error('Error converting base64 to blob URL:', error);
        throw error;
    }
};

/**
 * Save a document in localStorage
 * Converts blob URLs to base64 for persistence
 */
export const saveDocument = async (documentData: {
    documentId?: string;
    name: string;
    type: DocumentType;
    documentUrl: string;
    signatureFields: SignatureFieldData[];
    isEditMode?: boolean;
}): Promise<SavedDocument> => {
    if (typeof window === 'undefined') {
        throw new Error('localStorage is not available');
    }

    const existingDocuments: SavedDocument[] = JSON.parse(localStorage.getItem('documents') || '[]');

    // Convert blob URL to base64 if needed (for persistence)
    let documentDataBase64: string | undefined = undefined;
    let finalDocumentUrl = documentData.documentUrl;

    if (documentData.documentUrl.startsWith('blob:')) {
        try {
            // Convert blob URL to base64
            documentDataBase64 = await blobToBase64(documentData.documentUrl);
            // Use base64 data URL for the documentUrl
            finalDocumentUrl = documentDataBase64;
        } catch (error) {
            console.error('Failed to convert blob to base64, using original URL:', error);
            // If conversion fails, keep the original URL (will fail on reload, but at least won't crash)
        }
    } else if (documentData.documentUrl.startsWith('data:')) {
        // Already a data URL (base64), use it directly
        documentDataBase64 = documentData.documentUrl;
        finalDocumentUrl = documentData.documentUrl;
    }

    if (documentData.isEditMode && documentData.documentId) {
        // Update existing document
        const docIndex = existingDocuments.findIndex((d) => d.id === documentData.documentId);
        if (docIndex !== -1) {
            const existingDoc = existingDocuments[docIndex];
            existingDocuments[docIndex] = {
                ...existingDoc,
                name: documentData.name || existingDoc.name,
                signatureFields: documentData.signatureFields,
                documentUrl: finalDocumentUrl,
                documentData: documentDataBase64 || existingDoc.documentData,
                // Keep original createdAt
            };
            localStorage.setItem('documents', JSON.stringify(existingDocuments));
            window.dispatchEvent(new Event('documentSaved'));
            return existingDocuments[docIndex];
        }
    }

    // Create new document
    const newDocument: SavedDocument = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: documentData.name || 'Untitled Document',
        type: documentData.type,
        documentUrl: finalDocumentUrl,
        documentData: documentDataBase64,
        signatureFields: documentData.signatureFields,
        createdAt: new Date().toISOString(),
    };

    existingDocuments.push(newDocument);
    localStorage.setItem('documents', JSON.stringify(existingDocuments));
    window.dispatchEvent(new Event('documentSaved'));
    return newDocument;
};

/**
 * Load a document by ID from localStorage
 * Returns document with base64 data URL if available (for blob URL persistence)
 * Returns null if document has invalid blob URL (no base64 data)
 */
export const loadDocument = (documentId: string): SavedDocument | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    const documents: SavedDocument[] = JSON.parse(localStorage.getItem('documents') || '[]');
    const document = documents.find((d) => d.id === documentId);
    
    if (!document) return null;
    
    // If documentUrl is a blob URL but we have base64 data, use the base64 data instead
    // This handles cases where blob URLs become invalid after page reload
    if (document.documentUrl.startsWith('blob:') && document.documentData) {
        return {
            ...document,
            documentUrl: document.documentData, // Use base64 data URL instead of invalid blob URL
        };
    }
    
    // If it's a blob URL without base64 data, it's invalid - return null
    if (document.documentUrl.startsWith('blob:') && !document.documentData) {
        console.warn(`Document ${documentId} has invalid blob URL without base64 data. Please re-upload the document.`);
        return null;
    }
    
    return document;
};

/**
 * Check if a document URL is valid (not an invalid blob URL)
 */
export const isDocumentUrlValid = (doc: SavedDocument): boolean => {
    // If it's a blob URL without base64 data, it's invalid (will fail after page reload)
    if (doc.documentUrl.startsWith('blob:') && !doc.documentData) {
        return false;
    }
    // Data URLs and regular URLs are valid
    return true;
};

/**
 * Load all documents from localStorage
 * Returns documents with base64 data URLs if available (for blob URL persistence)
 * Filters out documents with invalid blob URLs (no base64 data)
 */
export const loadAllDocuments = (): SavedDocument[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    const documents: SavedDocument[] = JSON.parse(localStorage.getItem('documents') || '[]');
    
    // Replace invalid blob URLs with base64 data URLs if available, and filter out invalid ones
    return documents
        .map(doc => {
            if (doc.documentUrl.startsWith('blob:') && doc.documentData) {
                return {
                    ...doc,
                    documentUrl: doc.documentData, // Use base64 data URL instead of invalid blob URL
                };
            }
            return doc;
        })
        .filter(doc => isDocumentUrlValid(doc)); // Filter out documents with invalid blob URLs
};

