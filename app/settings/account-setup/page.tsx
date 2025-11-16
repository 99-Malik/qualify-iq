import React from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import AccountSetup from '@/components/Settings/AccountSetup'

function AccountSetupPage() {
  return (
    <AppLayout activeKey="settings">
        <AccountSetup />
    </AppLayout>
  )
}

export default AccountSetupPage

