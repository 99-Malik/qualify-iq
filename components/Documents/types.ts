// Document type definitions and display names
export type DocumentType = 'nda' | 'fdd' | 'franchise-agreement';

export interface DocumentTypeConfig {
    id: DocumentType;
    displayName: string;
    uploadTitle: string;
}

export const DOCUMENT_TYPES: Record<DocumentType, DocumentTypeConfig> = {
    'nda': {
        id: 'nda',
        displayName: 'NDA',
        uploadTitle: 'Upload NDA'
    },
    'fdd': {
        id: 'fdd',
        displayName: 'Financial Disclosure Intake (FDD)',
        uploadTitle: 'Upload FDD'
    },
    'franchise-agreement': {
        id: 'franchise-agreement',
        displayName: 'Franchise Operating Agreement',
        uploadTitle: 'Upload Franchise Operating Agreement'
    }
};

export function getDocumentTypeConfig(type: DocumentType): DocumentTypeConfig {
    return DOCUMENT_TYPES[type];
}

