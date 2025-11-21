import React from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import ConnectCalendar from '@/components/Calendar/ConnectCalendar'

export default function ConnectCalendarPage() {
    return (
        <AppLayout activeKey="calendar" hideSidebar={true}>
            <ConnectCalendar />
        </AppLayout>
    )
}

