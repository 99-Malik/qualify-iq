'use client';

import React from 'react';

export default function IncomingCallNotification() {
    return (
        <div className="bg-white  rounded-lg p-4 mb-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FFF5F2] flex items-center justify-center shrink-0">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#FC3400" fillOpacity="0.1" />
                    <path d="M18.62 22.7883C20.06 25.6183 22.38 27.9283 25.21 29.3783L27.41 27.1783C27.68 26.9083 28.08 26.8183 28.43 26.9383C29.55 27.3083 30.76 27.5083 32 27.5083C32.55 27.5083 33 27.9583 33 28.5083V31.9983C33 32.5483 32.55 32.9983 32 32.9983C22.61 32.9983 15 25.3883 15 15.9983C15 15.4483 15.45 14.9983 16 14.9983H19.5C20.05 14.9983 20.5 15.4483 20.5 15.9983C20.5 17.2483 20.7 18.4483 21.07 19.5683C21.18 19.9183 21.1 20.3083 20.82 20.5883L18.62 22.7883ZM32.16 15.6883L31.45 14.9883L25 21.2883V16.9983H24V22.9983H30V21.9983H25.85L32.16 15.6883Z" fill="#FC3400" />
                </svg>
            </div>
            <div className="flex-1">
                <h3 className="text-base font-semibold text-[#24282E] mb-1">Incoming Call</h3>
                <p className="text-sm text-[#727A90]">A call is coming from the Lead named 'John'</p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-xs text-[#A0AEC0]">2s ago</span>
                <button className="px-4 py-2 bg-[#14B13B] text-white rounded-sm text-xs font-medium hover:bg-[#12A035] transition-colors">
                    Answer Call
                </button>
            </div>
        </div>
    );
}

