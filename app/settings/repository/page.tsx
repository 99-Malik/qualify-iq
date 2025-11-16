import React from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import RepositorySettings from '@/components/Settings/RepositorySettings'

function RepositorySettingsPage() {
  return (
    <AppLayout activeKey="settings">
        <RepositorySettings />
    </AppLayout>
  )
}

export default RepositorySettingsPage

