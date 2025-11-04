'use client';

import React from 'react';
import type { SavedSignature } from '../SigningProperties';

interface SignaturePropertiesProps {
    savedSignatures: SavedSignature[];
    onImportSign?: () => void;
    onDrawNewSign?: () => void;
    onSignatureSelect?: (signatureId: number) => void;
}

export default function SignatureProperties({
    savedSignatures,
    onImportSign,
    onDrawNewSign,
    onSignatureSelect
}: SignaturePropertiesProps) {
    return (
        <div className="w-56 lg:w-64 2xl:w-96 shrink-0 px-4 py-6 bg-white border border-[#E4E7EC] rounded-lg">
            {/* Properties Button */}
            <button className="w-full px-4 py-3 bg-white border-3 border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors mb-3">
                <span className="text-lg font-extrabold text-[#24282E]">Properties</span>
            </button>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
                <button
                    onClick={onImportSign}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white border-3 border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors"
                >
                    {/* Download/Import Icon - Purple */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8346 7.5H12.5013V2.5H7.5013V7.5H4.16797L10.0013 13.3333L15.8346 7.5ZM4.16797 15V16.6667H15.8346V15H4.16797Z" fill="#5542F6" />
                    </svg>
                    <span className="text-md font-semibold text-[#24282E]">Import Sign</span>
                </button>
                <button
                    onClick={onDrawNewSign}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white border-3 border-[#E4E7EC] rounded-lg hover:bg-[#F7F8FA] transition-colors"
                >
                    {/* Pencil Icon - Purple */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 14.3751V17.5001H5.625L14.8417 8.28346L11.7167 5.15846L2.5 14.3751ZM17.2583 5.8668C17.5833 5.5418 17.5833 5.0168 17.2583 4.6918L15.3083 2.7418C14.9833 2.4168 14.4583 2.4168 14.1333 2.7418L12.6083 4.2668L15.7333 7.3918L17.2583 5.8668V5.8668Z" fill="#5542F6" />
                    </svg>
                    <span className="text-[#24282E] text-md font-semibold">Draw New Sign</span>
                </button>
            </div>

            {/* Saved Signatures - Vertical List with Scalloped Borders */}
            {savedSignatures.length > 0 && (
                <div className="space-y-3">
                    {savedSignatures.map((sig) => (
                        <div
                            key={sig.id}
                            onClick={() => onSignatureSelect?.(sig.id)}
                            className="bg-[#F5F5F5] rounded-lg p-3 hover:bg-[#EBEBEB] transition-colors cursor-pointer"
                        >
                            {/* White inner area with scalloped border */}
                            <div className="relative bg-white p-4 rounded-lg" style={{
                                border: '2px solid #E4E7EC',
                                clipPath: 'polygon(0% 8%, 4% 0%, 8% 8%, 12% 0%, 16% 8%, 20% 0%, 24% 8%, 28% 0%, 32% 8%, 36% 0%, 40% 8%, 44% 0%, 48% 8%, 52% 0%, 56% 8%, 60% 0%, 64% 8%, 68% 0%, 72% 8%, 76% 0%, 80% 8%, 84% 0%, 88% 8%, 92% 0%, 96% 8%, 100% 0%, 100% 8%, 96% 16%, 100% 24%, 96% 32%, 100% 40%, 96% 48%, 100% 56%, 96% 64%, 100% 72%, 96% 80%, 100% 88%, 96% 96%, 100% 100%, 96% 92%, 92% 100%, 88% 92%, 84% 100%, 80% 92%, 76% 100%, 72% 92%, 68% 100%, 64% 92%, 60% 100%, 56% 92%, 52% 100%, 48% 92%, 44% 100%, 40% 92%, 36% 100%, 32% 92%, 28% 100%, 24% 92%, 20% 100%, 16% 92%, 12% 100%, 8% 92%, 4% 100%, 0% 100%, 0% 92%, 4% 84%, 0% 76%, 4% 68%, 0% 60%, 4% 52%, 0% 44%, 4% 36%, 0% 28%, 4% 20%, 0% 12%)'
                            }}>
                                {/* Signature text/content */}
                                <div className="flex items-center justify-center min-h-[60px]">
                                    {sig.signatureText ? (
                                        <span className="text-lg font-bold text-[#24282E]" style={{ fontFamily: 'cursive' }}>
                                            {sig.signatureText}
                                        </span>
                                    ) : (
                                        <svg width="100" height="40" viewBox="0 0 100 40" className="opacity-80">
                                            <path
                                                d="M10 20 Q25 10, 40 20 T70 20 Q85 15, 90 20"
                                                stroke="#24282E"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                style={{ fontFamily: 'cursive' }}
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

