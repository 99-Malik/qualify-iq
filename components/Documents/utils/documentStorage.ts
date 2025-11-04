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
    documentUrl: string;
    signatureFields: SignatureFieldData[];
    createdAt: string;
}

/**
 * Save a document in localStorage
 */
export const saveDocument = (documentData: {
    documentId?: string;
    name: string;
    type: DocumentType;
    documentUrl: string;
    signatureFields: SignatureFieldData[];
    isEditMode?: boolean;
}): SavedDocument => {
    if (typeof window === 'undefined') {
        throw new Error('localStorage is not available');
    }

    const existingDocuments: SavedDocument[] = JSON.parse(localStorage.getItem('documents') || '[]');

    if (documentData.isEditMode && documentData.documentId) {
        // Update existing document
        const docIndex = existingDocuments.findIndex((d) => d.id === documentData.documentId);
        if (docIndex !== -1) {
            const existingDoc = existingDocuments[docIndex];
            existingDocuments[docIndex] = {
                ...existingDoc,
                name: documentData.name || existingDoc.name,
                signatureFields: documentData.signatureFields,
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
        documentUrl: documentData.documentUrl,
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
 */
export const loadDocument = (documentId: string): SavedDocument | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    const documents: SavedDocument[] = JSON.parse(localStorage.getItem('documents') || '[]');
    return documents.find((d) => d.id === documentId) || null;
};

/**
 * Load all documents from localStorage
 */
export const loadAllDocuments = (): SavedDocument[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    return JSON.parse(localStorage.getItem('documents') || '[]');
};

