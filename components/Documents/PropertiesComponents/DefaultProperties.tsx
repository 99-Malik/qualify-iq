'use client';

import React from 'react';
import type { SavedSignature } from '../SigningProperties';

interface DefaultPropertiesProps {
    savedSignatures: SavedSignature[];
    onImportSign?: () => void;
    onDrawNewSign?: () => void;
    onSignatureSelect?: (signatureId: number) => void;
}

export default function DefaultProperties({
    savedSignatures,
    onImportSign,
    onDrawNewSign,
    onSignatureSelect
}: DefaultPropertiesProps) {
    return (
        <div className="w-56 lg:w-64 2xl:w-96 shrink-0 bg-white border border-[#E4E7EC] rounded-lg p-4">
            <h3 className="text-sm font-bold text-[#24282E] mb-4">Properties</h3>

            <div className="space-y-3 mb-6">
                <button
                    onClick={onImportSign}
                    className="w-full flex items-center gap-2 px-3 py-2.5 bg-white border border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2V14M2 8H14" stroke="#84818A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm text-[#24282E]">Import Sign</span>
                </button>
                <button
                    onClick={onDrawNewSign}
                    className="w-full flex items-center gap-2 px-3 py-2.5 bg-white border border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2L2 8L8 14M14 2L8 8L14 14" stroke="#84818A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm text-[#24282E]">Draw New Sign</span>
                </button>
            </div>

            {savedSignatures.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-xs font-medium text-[#727A90] mb-3 uppercase">Saved Signatures</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {savedSignatures.map((sig) => (
                            <div
                                key={sig.id}
                                onClick={() => onSignatureSelect?.(sig.id)}
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
            )}
        </div>
    );
}

