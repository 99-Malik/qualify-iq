'use client';

import AppLayout from '../../components/Layout/AppLayout';
import KeyMetricsCards from '../../components/Dashboard/KeyMetricsCards';
import ApprovedVsRejectedChart from '../../components/Dashboard/ApprovedVsRejectedChart';
import ConversionRateCard from '../../components/Dashboard/ConversionRateCard';
import WarmupEmailSummaryCard from '../../components/Dashboard/WarmupEmailSummaryCard';
import RecentLeadsTable from '../../components/Dashboard/RecentLeadsTable';

export default function DashboardPage() {
    return (
        <AppLayout activeKey="dashboard">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mt-2 sm:mt-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-4xl font-semibold text-[#24282E] mt-1 sm:mt-2">Welcome back, Max</h1>
                    <div className="text-xs sm:text-sm text-[#727A90] mt-2 px-1">Here's what's happening with your business today</div>
                </div>
                <button className="inline-flex items-center justify-between bg-white rounded-md px-2.5 sm:px-4 py-1.5 sm:py-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#F1F2F6] hover:bg-[#F7F8FA] transition-colors self-start sm:self-auto">
                    <span className="text-xs sm:text-base font-medium text-[#8C8A92] whitespace-nowrap">
                        Show stats: <span className="text-[#24282E] font-semibold">Yearly</span>
                    </span>
                    <svg className="shrink-0 ml-1.5 sm:ml-2" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9H6Z" fill="#84818A" />
                    </svg>
                </button>
            </div>

            {/* Key Metrics Cards */}
            <KeyMetricsCards />
            <ApprovedVsRejectedChart />
            {/* Charts Row */}
            <div className="flex flex-col items-center w-full lg:flex-row gap-6 mt-6">
                <div className="w-full h-full lg:w-[40%]">
                    < ConversionRateCard/>
                </div>
                <div className="w-full h-full">
                <WarmupEmailSummaryCard />                </div>
            </div>

            {/* Warmup Email Summary */}
           

            {/* Recent Leads Table */}
            <RecentLeadsTable />
        </AppLayout>
    );
}


