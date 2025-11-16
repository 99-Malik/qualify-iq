'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/components/OutboundLeads/Modal/ApplyFilterModal/components/Dropdown';
import PaymentMethod from './PaymentMethod';

interface OrderDomainProps {
    onBack?: () => void;
}

interface DomainOrder {
    provider: string;
    persona: string;
    email: string;
    domain: string;
    price: string;
}

export default function OrderDomain({ onBack }: OrderDomainProps) {
    const router = useRouter();
    const [forwardingDomain, setForwardingDomain] = useState('www.qualify.com');
    const [senderName, setSenderName] = useState('name');
    const [lastName, setLastName] = useState('name');
    const [email, setEmail] = useState('abc123@gmail.com');
    const [selectedDomain, setSelectedDomain] = useState('all-domains');
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);

    const domainOptions = [
        { value: 'all-domains', label: 'All Domains' },
        { value: 'qualifyiq.com', label: 'qualifyiq.com' },
        { value: 'qualifyiq.ai', label: 'qualifyiq.ai' },
        { value: 'qualifyiq.org', label: 'qualifyiq.org' }
    ];

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.push('/domain-setup');
        }
    };

    const handlePlaceOrder = () => {
        setShowPaymentMethod(true);
    };

    const handleBackFromPayment = () => {
        setShowPaymentMethod(false);
    };

    const domains: DomainOrder[] = [
        { provider: 'Google', persona: 'Afshin Shirazi', email: 'afshinshirzi@qualifyiq.com', domain: 'www.qualifyiq.com', price: '$15' },
        { provider: 'Google', persona: 'Afshin Shirazi', email: 'afshinshirzi@qualifyiq.ai', domain: 'www.qualifyiq.com', price: '$15' },
        { provider: 'Google', persona: 'Afshin Shirazi', email: 'afshinshirzi@qualifyiq.org', domain: 'www.qualifyiq.com', price: '$15' },
        { provider: 'Google', persona: 'Afshin Shirazi', email: 'afshinshirzi@qualifyiq.com', domain: 'www.qualifyiq.com', price: '$15' }
    ];

    // Total amount - using $2,500.00 as shown in the Figma design
    const totalAmountFormatted = '$2,500.00';

    // Show Payment Method if Place Order was clicked
    if (showPaymentMethod) {
        return <PaymentMethod onBack={handleBackFromPayment} totalAmount={totalAmountFormatted} />;
    }

    return (
        <div>
            {/* Header Section - Full Width */}
            <div className="mb-8">
                {/* Breadcrumb */}
                <div className="mb-2">
                    <nav className="text-sm">
                        <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                            Home
                        </span>
                        <span className="text-[#727A90] mx-1">/</span>
                        <span className="text-[#24282E] font-bold">Domain Setup</span>
                    </nav>
                </div>

                {/* Header with Title and Next Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E]">Domain Setup</h1>

                    <button className="flex items-center gap-2 px-8 py-2 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium">
                        Next
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <button
                    onClick={handleBack}
                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold text-[#24282E]">Order Domain</h2>
            </div>
            {/* Main Content and Checkout - Side by Side on 2xl */}
            <div className="flex flex-col 2xl:flex-row gap-6">
                {/* Left Column - Forwarding Domain and Table */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Forwarding Domain Section */}
                    <div>
                        <div className="bg-white rounded-lg p-4">
                            {/* Forwarding Domain Card */}
                            <div className=" bg-[#fbfafc] border border-[#E4E7EC] rounded-lg p-4 mb-4">
                                <label className="block text-sm font-medium text-[#24282E] mb-2">Forwarding Domain</label>
                                <input
                                    type="text"
                                    value={forwardingDomain}
                                    onChange={(e) => setForwardingDomain(e.target.value)}
                                    className="w-full px-4 bg-white py-2 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:border-[#5542F6]"
                                />
                            </div>

                            {/* Sender Information Card */}
                            <div className="bg-[#fbfafc] border border-[#E4E7EC] rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#24282E] mb-2">Sender Name</label>
                                        <input
                                            type="text"
                                            value={senderName}
                                            onChange={(e) => setSenderName(e.target.value)}
                                            className="w-full px-4 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:border-[#5542F6]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#24282E] mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full px-4 py-2 border bg-white border-[#E4E7EC] rounded-sm text-sm text-[#24282E] focus:outline-none focus:border-[#5542F6]"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-[#24282E] mb-2">Email:</label>
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 bg-white px-4 py-2 border-t border-b border-l border-[#E4E7EC] border-r-0 rounded-l-sm rounded-r-none text-sm text-[#24282E] focus:outline-none focus:border-t-[#5542F6] focus:border-b-[#5542F6] focus:border-l-[#5542F6]"
                                            style={{ height: '40px' }}
                                        />
                                        <div className="border-t border-b border-r-2 border-l-2 bg-[#fbfafc] border-[#E4E7EC] px-3 flex items-center justify-center" style={{ height: '40px' }}>
                                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.23686 10.5013C4.48553 10.5013 3.79019 10.3729 3.15086 10.1163C2.51619 9.85958 1.96319 9.50025 1.49186 9.03825C1.02053 8.57625 0.654193 8.03258 0.392859 7.40725C0.131526 6.78192 0.000859454 6.10292 0.000859454 5.37025C0.000859454 4.53958 0.131526 3.79525 0.392859 3.13725C0.658859 2.47458 1.02753 1.90992 1.49886 1.44325C1.97486 0.976583 2.53019 0.619583 3.16486 0.372249C3.80419 0.124916 4.49719 0.00124943 5.24386 0.00124943C6.13053 0.00124943 6.90519 0.14125 7.56786 0.42125C8.23053 0.696583 8.77886 1.07458 9.21286 1.55525C9.65153 2.03125 9.97353 2.57025 10.1789 3.17225C10.3889 3.77425 10.4799 4.40192 10.4519 5.05525C10.4192 5.94658 10.2209 6.62558 9.85686 7.09225C9.49286 7.55892 8.95853 7.79225 8.25386 7.79225C7.84319 7.79225 7.47453 7.69658 7.14786 7.50525C6.82119 7.31392 6.59953 7.03858 6.48286 6.67925L6.85386 6.70725C6.67653 7.05258 6.42453 7.29992 6.09786 7.44925C5.77119 7.59392 5.43286 7.66625 5.08286 7.66625C4.63486 7.66625 4.24053 7.57058 3.89986 7.37925C3.56386 7.18325 3.29786 6.91258 3.10186 6.56725C2.91053 6.21725 2.81486 5.81358 2.81486 5.35625C2.81486 4.88025 2.91519 4.46958 3.11586 4.12425C3.31653 3.77892 3.58953 3.51292 3.93486 3.32625C4.28019 3.13492 4.66986 3.03925 5.10386 3.03925C5.40719 3.03925 5.72219 3.10225 6.04886 3.22825C6.37553 3.35425 6.62753 3.54558 6.80486 3.80225L6.52486 4.13825V3.23525H7.36486L7.35086 5.62925C7.35086 5.97925 7.42553 6.25458 7.57486 6.45525C7.72886 6.65592 7.96686 6.75625 8.28886 6.75625C8.53619 6.75625 8.73453 6.68625 8.88386 6.54625C9.03786 6.40625 9.15219 6.21492 9.22686 5.97225C9.30153 5.72492 9.34353 5.43792 9.35286 5.11125C9.37619 4.39258 9.27819 3.77658 9.05886 3.26325C8.83953 2.74992 8.53386 2.32758 8.14186 1.99625C7.75453 1.66492 7.31586 1.42225 6.82586 1.26825C6.34053 1.10958 5.83653 1.03025 5.31386 1.03025C4.63719 1.03025 4.03519 1.13992 3.50786 1.35925C2.98519 1.57858 2.54186 1.88658 2.17786 2.28325C1.81853 2.67525 1.54553 3.13258 1.35886 3.65525C1.17686 4.17792 1.09053 4.74258 1.09986 5.34925C1.11386 5.96058 1.22586 6.52058 1.43586 7.02925C1.64586 7.53325 1.93753 7.96725 2.31086 8.33125C2.68886 8.69525 3.12986 8.97525 3.63386 9.17125C4.14253 9.37192 4.69553 9.47225 5.29286 9.47225C5.65686 9.47225 6.01853 9.42792 6.37786 9.33925C6.74186 9.25058 7.06853 9.12925 7.35786 8.97525L7.72186 9.91325C7.33919 10.1093 6.93786 10.2563 6.51786 10.3543C6.09786 10.4523 5.67086 10.5013 5.23686 10.5013ZM5.15286 6.62325C5.50286 6.62325 5.78986 6.52292 6.01386 6.32225C6.24253 6.12158 6.35686 5.79725 6.35686 5.34925C6.35686 4.92458 6.25186 4.60492 6.04186 4.39025C5.83186 4.17558 5.54486 4.06825 5.18086 4.06825C4.76086 4.06825 4.44119 4.18258 4.22186 4.41125C4.00719 4.63525 3.89986 4.94792 3.89986 5.34925C3.89986 5.75525 4.01186 6.07025 4.23586 6.29425C4.45986 6.51358 4.76553 6.62325 5.15286 6.62325Z" fill="#2E2C34" />
                                            </svg>
                                        </div>
                                        <div className="w-40">
                                            <Dropdown
                                                value={selectedDomain}
                                                onChange={setSelectedDomain}
                                                options={domainOptions}
                                                className=""
                                                buttonClassName="rounded-l-none rounded-r-sm border-l-0 border-t border-b border-r border-[#E4E7EC] h-[40px] hover:border-[#E4E7EC]"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button className="px-8 py-2 bg-[#5542F6]  text-white rounded-sm hover:bg-[#4535D6] transition-colors text-xs font-medium">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Domain List Table */}
                    <div className="bg-white border border-[#E4E7EC] rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b border-[#E4E7EC] bg-[#fbfafc]">
                                        <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#2E2C34] font-medium text-xs">Provider</span>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.81039 6.75H13.1894C13.3377 6.75003 13.4827 6.79404 13.606 6.87645C13.7293 6.95886 13.8254 7.07598 13.8821 7.21301C13.9389 7.35003 13.9538 7.50081 13.9248 7.64627C13.8959 7.79174 13.8245 7.92536 13.7196 8.03025L9.53014 12.2197C9.38949 12.3603 9.19876 12.4393 8.99989 12.4393C8.80101 12.4393 8.61028 12.3603 8.46964 12.2197L4.28014 8.03025C4.17528 7.92536 4.10388 7.79174 4.07495 7.64627C4.04602 7.50081 4.06088 7.35003 4.11763 7.21301C4.17438 7.07598 4.27049 6.95886 4.39379 6.87645C4.5171 6.79404 4.66207 6.75003 4.81039 6.75Z" fill="#8E95A6" />
                                                </svg>

                                            </div>
                                        </th>
                                        <th className="py-4 px-4  text-[#727A90] font-normal">
                                            <span className="text-[#2E2C34]  font-medium text-xs">Persona</span>
                                        </th>
                                        <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                            <span className="text-[#2E2C34] text-xs font-medium">Email</span>
                                        </th>
                                        <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                            <span className="text-[#2E2C34] text-xs font-medium">Domain</span>
                                        </th>
                                        <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                            <span className="text-[#2E2C34] text-xs font-medium">Price</span>
                                        </th>
                                        <th className="py-4 px-4 text-xs text-[#727A90] font-normal">
                                            <span className="text-[#2E2C34] text-xs font-medium">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {domains.map((domain, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-[#E4E7EC] bg-white hover:bg-[#F7F8FA] transition-colors"
                                        >
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                    </svg>
                                                    <span className="text-xs font-bold text-[#24282E]">{domain.provider}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-xs font-bold text-[#24282E]">{domain.persona}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-xs text-[#24282E]">{domain.email}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-xs font-bold text-[#24282E]">{domain.domain}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-xs font-bold text-[#24282E]">{domain.price}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <button className="text-[#EA4335] hover:text-[#C5221F] transition-colors">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM6 18.9999C6 20.0999 6.9 20.9999 8 20.9999H16C17.1 20.9999 18 20.0999 18 18.9999V6.9999H6V18.9999ZM8.0001 9H16.0001V19H8.0001V9Z" fill="#FC3400" />
                                                    </svg>

                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column - Checkout */}
                <div className="w-full 2xl:w-80 shrink-0">
                    <h3 className="text-lg font-semibold text-[#24282E] mb-4">Checkout</h3>

                    {/* Price Summary Table */}
                    <div className="mb-6 bg-white border border-[#E4E7EC] rounded-md ">
                        {/* Header */}
                        <div className="border-b border-[#E4E7EC] bg-[#fbfafc] px-3 py-2 flex justify-between items-center rounded-t-md">
                            <div className="text-xs text-[#727A90] font-normal">Type</div>
                            <div className="text-xs text-[#727A90] font-normal pr-12">Price</div>
                        </div>
                        {/* Rows */}
                        <div className="border-b border-[#E4E7EC] px-3 py-4 flex justify-between items-center">
                            <div className="text-xs text-[#24282E] font-bold">Subtotal Monthly Price</div>
                            <div className="text-right text-[#24282E] font-bold pr-12 text-xs">$15</div>
                        </div>
                        <div className="border-b border-[#E4E7EC] px-3 py-4 flex justify-between items-center">
                            <div className="text-xs text-[#24282E] font-bold">Domain Annual Price</div>
                            <div className="text-right text-[#24282E] font-bold pr-12 text-xs">$15</div>
                        </div>
                        <div className="px-3 py-4 flex justify-between items-center">
                            <div className="text-xs text-[#24282E] font-bold">Total Price</div>
                            <div className="text-right text-[#24282E] font-bold pr-12 text-xs">$15</div>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button 
                        onClick={handlePlaceOrder}
                        className="w-full px-6 py-3 bg-[#5542F6] text-white rounded-sm hover:bg-[#4535D6] transition-colors text-sm font-medium"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}

