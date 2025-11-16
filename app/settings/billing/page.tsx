import React from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import Billing from '@/components/Settings/Billing'

function BillingPage() {
  return (
    <AppLayout activeKey="settings">
        <Billing />
    </AppLayout>
  )
}

export default BillingPage

