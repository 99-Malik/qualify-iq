'use client';

import AppLayout from '@/components/Layout/AppLayout'
import FloatingAskAIButton from '@/components/Buttons/FloatingAskAIButton'
import AllLeads from '@/components/CapturedLeads/Tabs/All-Leads'
import ApprovedLeads from '@/components/CapturedLeads/Tabs/Approved-Leads'
import RejectedLeads from '@/components/CapturedLeads/Tabs/Rejected-Leads'
import PendingFDDLeads from '@/components/CapturedLeads/Tabs/Pending-FDD-Leads'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type TabType = 'all' | 'approved' | 'rejected' | 'pending';

export default function CapturedLeads() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const tabs = [
    { id: 'all' as TabType, label: 'All Leads' },
    { id: 'approved' as TabType, label: 'Approved Leads' },
    { id: 'rejected' as TabType, label: 'Rejected Leads' },
    { id: 'pending' as TabType, label: 'Pending FDD Signature Leads' },
  ];

  return (
    <AppLayout activeKey="captured">
      {/* Breadcrumb */}
      <div className="mb-2">
        <nav className="text-sm">
          <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
            Home
          </span>
          <span className="text-[#727A90] mx-1">/</span>
          <span className="text-[#24282E]">Captured Leads</span>
        </nav>
      </div>

      {/* Header Section with Title and Export Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Captured Leads</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#5542F6] text-white rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6673 6H10.0007V2H6.00065V6H3.33398L8.00065 10.6667L12.6673 6ZM3.33398 12V13.3333H12.6673V12H3.33398Z" fill="#FBFAFC" />
          </svg>

          Export Report
        </button>
      </div>

      {/* Horizontal Separator */}
      <div className="w-full h-px bg-[#EBEAED] mb-8 mt-2"></div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${activeTab === tab.id
                ? 'text-[#24282E]'
                : 'text-[#727A90] hover:text-[#24282E]'
              }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5542F6]"></span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'all' && <AllLeads />}

        {activeTab === 'approved' && <ApprovedLeads />}

        {activeTab === 'rejected' && <RejectedLeads />}

        {activeTab === 'pending' && <PendingFDDLeads />}
      </div>

      {/* Floating Ask AI Button */}
      <FloatingAskAIButton />
    </AppLayout>
  )
}