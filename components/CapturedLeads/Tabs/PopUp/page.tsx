'use client';

import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    position: { top: number; left: number; alignRight?: boolean };
    leadId?: string;
    onJourneyMap?: () => void;
}

export default function PopUp({ isOpen, onClose, position, leadId, onJourneyMap }: PopUpProps) {
    const router = useRouter();
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleScroll = () => {
            onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleScroll);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleScroll);
        };
    }, [isOpen, onClose]);

    if (!isOpen || typeof window === 'undefined') return null;

    const popupContent = (
        <div
            ref={popupRef}
            className="fixed bg-white rounded-lg border border-[#E4E7EC] shadow-lg z-50 w-[140px]"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                maxWidth: 'calc(100vw - 16px)',
            }}
        >
            <button
                onClick={() => {
                    onClose();
                    if (leadId) {
                        router.push(`/captured-leads/lead-details?id=${leadId}`);
                    }
                }}
                className="w-full text-left px-4 py-3 text-sm text-[#24282E] hover:bg-[#F7F8FA] transition-colors border-b-[0.1875rem] border-[#E4E7EC]"
            >
                View Details
            </button>
            <button
                onClick={() => {
                    onClose();
                    if (onJourneyMap) {
                        onJourneyMap();
                    }
                }}
                className="w-full text-left px-4 py-3 text-sm text-[#24282E] hover:bg-[#F7F8FA] transition-colors"
            >
                Journey Map
            </button>
        </div>
    );

    return createPortal(popupContent, document.body);
}

