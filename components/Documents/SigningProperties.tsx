'use client';

import React from 'react';
import SignatureProperties from './PropertiesComponents/SignatureProperties';
import InitialProperties from './PropertiesComponents/InitialProperties';
import StampProperties from './PropertiesComponents/StampProperties';
import DefaultProperties from './PropertiesComponents/DefaultProperties';
import type { SavedStamp } from './PropertiesComponents/StampProperties';

export interface SavedSignature {
    id: number;
    data: string;
    signatureText?: string; // Actual signature text/content
}

interface SigningPropertiesProps {
    selectedElement?: string;
    savedSignatures?: SavedSignature[];
    savedStamps?: SavedStamp[];
    onImportSign?: () => void;
    onDrawNewSign?: () => void;
    onUploadStamp?: () => void;
    onSignatureSelect?: (signatureId: number) => void;
    onStampSelect?: (stampId: number) => void;
    onInitialTextChange?: (text: string, fontFamily: string, fontWeight: string, fontSize: number) => void;
    onInitialTextSync?: (callback: (text: string) => void) => void; // Callback to register sync function
    onTextFieldChange?: (fieldType: string, text: string, fontFamily: string, fontWeight: string, fontSize: number) => void;
    onTextFieldSync?: (fieldType: string, callback: (text: string) => void) => void;
}

export default function SigningProperties({
    selectedElement,
    savedSignatures = [],
    savedStamps = [],
    onImportSign,
    onDrawNewSign,
    onUploadStamp,
    onSignatureSelect,
    onStampSelect,
    onInitialTextChange,
    onInitialTextSync,
    onTextFieldChange,
    onTextFieldSync
}: SigningPropertiesProps) {
    // Show signature-specific UI when Signature is selected
    const isSignatureSelected = selectedElement === 'signature';
    const isInitialSelected = selectedElement === 'initial';
    const isStampSelected = selectedElement === 'stamp';
    
    // Text-based fields that use the same properties UI
    const textBasedFields = ['date-signed', 'email', 'name', 'company', 'title'];
    const isTextBasedField = selectedElement && textBasedFields.includes(selectedElement);
    
    // Get label for text-based fields
    const getFieldLabel = (fieldId?: string): string => {
        const labelMap: { [key: string]: string } = {
            'date-signed': 'Date Signed',
            'email': 'Email',
            'name': 'Name',
            'company': 'Company',
            'title': 'Title',
            'initial': 'Text'
        };
        return labelMap[fieldId || ''] || 'Text';
    };

    if (isInitialSelected) {
        return (
            <InitialProperties 
                key={selectedElement} // Reset component when tab changes
                label={getFieldLabel(selectedElement)}
                onTextChange={onInitialTextChange}
                onTextSync={onInitialTextSync}
            />
        );
    }
    
    if (isTextBasedField) {
        return (
            <InitialProperties 
                key={selectedElement} // Reset component when tab changes
                label={getFieldLabel(selectedElement)}
                onTextChange={(text, fontFamily, fontWeight, fontSize) => {
                    if (onTextFieldChange && selectedElement) {
                        onTextFieldChange(selectedElement, text, fontFamily, fontWeight, fontSize);
                    }
                }}
                onTextSync={(callback) => {
                    if (onTextFieldSync && selectedElement) {
                        onTextFieldSync(selectedElement, callback);
                    }
                }}
            />
        );
    }

    if (isStampSelected) {
        return (
            <StampProperties
                savedStamps={savedStamps}
                onUploadStamp={onUploadStamp}
                onStampSelect={onStampSelect}
            />
        );
    }

    if (isSignatureSelected) {
        return (
            <SignatureProperties
                savedSignatures={savedSignatures}
                onImportSign={onImportSign}
                onDrawNewSign={onDrawNewSign}
                onSignatureSelect={onSignatureSelect}
            />
        );
    }

    // Default properties view for other elements
    return (
        <DefaultProperties
            savedSignatures={savedSignatures}
            onImportSign={onImportSign}
            onDrawNewSign={onDrawNewSign}
            onSignatureSelect={onSignatureSelect}
        />
    );
}

