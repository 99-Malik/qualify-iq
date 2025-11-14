import { Suspense } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import EmailDetails from '@/components/WarmupEmails/EmailDetails';

function EmailDetailsContent() {
    return (
        <AppLayout activeKey="warmup" hideSidebar={true}>
            <EmailDetails />
        </AppLayout>
    );
}

export default function EmailDetailsPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading...</div>}>
            <EmailDetailsContent />
        </Suspense>
    );
}

