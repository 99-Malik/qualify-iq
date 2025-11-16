import React from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import SettingsHome from '@/components/Settings/Home'

function SettingsPage() {
  return (
    <AppLayout activeKey="settings">
        <SettingsHome />
    </AppLayout>
  )
}

export default SettingsPage