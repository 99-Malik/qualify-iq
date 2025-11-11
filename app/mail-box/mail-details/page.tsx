import { Suspense } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import MailDetails from '@/components/MailBox/MailDetails';

function MailDetailsContent() {
    return (
        <AppLayout activeKey="mailbox" hideSidebar={true}>
            <MailDetails />
        </AppLayout>
    );
}

export default function MailDetailsPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading...</div>}>
            <MailDetailsContent />
        </Suspense>
    );
}

