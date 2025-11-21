'use client';

import React, { Suspense } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import SetAvailabilityHours from '@/components/Calendar/SetAvailabilityHours';

export default function SetAvailabilityHoursPage() {
    return (
        <AppLayout activeKey="calendar" hideSidebar={true}>
            <SetAvailabilityHours />
        </AppLayout>
    );
}

