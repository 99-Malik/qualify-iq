import React from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import Notifications from '@/components/Notifications/Notifications'

function NotificationsPage() {
  return (
    <AppLayout activeKey="" hideSidebar={true}>
        <Notifications />
    </AppLayout>
  )
}

export default NotificationsPage

