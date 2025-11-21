'use client';

import React, { Suspense } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import ManageGroups from '@/components/Calendar/ManageGroups';

export default function ManageGroupsPage() {
    return (
        <AppLayout activeKey="calendar" hideSidebar={true}>
            <ManageGroups />
        </AppLayout>
    );
}

