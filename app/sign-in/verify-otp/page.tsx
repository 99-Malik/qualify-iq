import React, { Suspense } from 'react';
import OTPVerification from '@/components/SignIn/OTPVerification';

export default function OTPVerificationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
            <OTPVerification />
        </Suspense>
    );
}