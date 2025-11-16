'use client';

import AppLayout from '@/components/Layout/AppLayout';
import DomainSetup from '@/components/DomainSetUp/DomainSetup';

export default function DomainSetupPage() {
    return (
        <AppLayout activeKey="domain">
            <DomainSetup />
        </AppLayout>
    );
}
