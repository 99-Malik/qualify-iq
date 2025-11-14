'use client';

import AppLayout from '@/components/Layout/AppLayout'
import FloatingAskAIButton from '@/components/Buttons/FloatingAskAIButton'
import EmailWarmups from '@/components/WarmupEmails/EmailWarmups'

export default function WarmupEmails() {
    return (
        <AppLayout activeKey="warmup">
            <EmailWarmups />
            <FloatingAskAIButton />
        </AppLayout>
    )
}