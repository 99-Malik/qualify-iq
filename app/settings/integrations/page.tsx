import React from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import Integrations from '@/components/Settings/Integrations'

function IntegrationsPage() {
  return (
    <AppLayout activeKey="settings">
        <Integrations />
    </AppLayout>
  )
}

export default IntegrationsPage

