import React from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import FloatingAskAIButton from '@/components/Buttons/FloatingAskAIButton'
import CalendarHome from '@/components/Calendar/Home'

export default function CalendarPage() {
    return (
        <AppLayout activeKey="calendar">
            <CalendarHome />
            <FloatingAskAIButton />
        </AppLayout>
    )
}