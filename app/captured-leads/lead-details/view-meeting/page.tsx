'use client';

import React, { Suspense, useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { useRouter } from 'next/navigation';

function ViewMeetingContent() {
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('01:02:23');
    const [totalDuration] = useState('01:42:44');

    return (
        <AppLayout activeKey="captured" hideSidebar={true}>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#2E2C34] font-semibold mx-1">/</span>
                    <span className="text-[#2E2C34] font-semibold hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/captured-leads')}>
                        Captured Leads
                    </span>
                </nav>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-6">Captured Leads</h1>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-6 mt-4"></div>

            {/* Back Arrow and View Meeting Heading */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => router.back()}
                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                    </svg>

                </button>
                <h2 className="text-xl font-semibold text-[#24282E]">View Meeting</h2>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Video Player */}
                <div className="space-y-4">
                    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                        {/* Video Placeholder - Earth Image */}
                        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Play Controls Overlay */}
                                <div className="flex items-center gap-8 z-10">
                                    {/* Skip Backward */}
                                    <button className="text-white hover:text-gray-300 transition-colors">
                                        <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_0_1)">
                                                <circle cx="34" cy="34" r="30" fill="black" fillOpacity="0.5" shapeRendering="crispEdges" />
                                            </g>
                                            <path d="M28.8438 25.3828C29.0613 25.3828 29.27 25.4692 29.4238 25.6231C29.5776 25.7769 29.6641 25.9856 29.6641 26.2031V37.6875C29.6641 37.9051 29.5776 38.1137 29.4238 38.2675C29.27 38.4214 29.0613 38.5078 28.8438 38.5078H28.0234C27.8059 38.5078 27.5972 38.4214 27.4434 38.2675C27.2895 38.1137 27.2031 37.9051 27.2031 37.6875V26.2031C27.2031 25.9856 27.2895 25.7769 27.4434 25.6231C27.5972 25.4692 27.8059 25.3828 28.0234 25.3828H28.8438ZM23.1016 25.3828C23.3191 25.3828 23.5278 25.4692 23.6816 25.6231C23.8354 25.7769 23.9219 25.9856 23.9219 26.2031V37.6875C23.9219 38.1403 23.5544 38.5078 23.1016 38.5078H22.2812C22.0637 38.5078 21.855 38.4214 21.7012 38.2675C21.5474 38.1137 21.4609 37.9051 21.4609 37.6875V26.2031C21.4609 25.9856 21.5474 25.7769 21.7012 25.6231C21.855 25.4692 22.0637 25.3828 22.2812 25.3828H23.1016ZM39.7211 25.7219C41.0883 24.942 42.7891 25.9297 42.7891 27.5047V36.3881C42.7891 37.9631 41.0883 38.9508 39.7211 38.1688L31.9467 33.727C30.5686 32.9395 30.5686 30.9533 31.9467 30.1658L39.7211 25.7219Z" fill="white" />
                                            <defs>
                                                <filter id="filter0_d_0_1" x="0" y="0" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite in2="hardAlpha" operator="out" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                                </filter>
                                            </defs>
                                        </svg>

                                    </button>
                                    {/* Play Button */}
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_735_77993)">
                                                <circle cx="44" cy="44" r="40" fill="black" fillOpacity="0.5" shapeRendering="crispEdges" />
                                            </g>
                                            <path d="M59.682 39.5885C60.4825 40.0142 61.1521 40.6497 61.619 41.4268C62.0859 42.204 62.3326 43.0935 62.3326 44.0002C62.3326 44.9068 62.0859 45.7964 61.619 46.5735C61.1521 47.3507 60.4825 47.9862 59.682 48.4119L38.3287 60.0235C34.8903 61.8935 30.667 59.4602 30.667 55.6135V32.3885C30.667 28.5385 34.8903 26.1069 38.3287 27.9752L59.682 39.5885Z" fill="white" />
                                            <defs>
                                                <filter id="filter0_d_735_77993" x="0" y="0" width="88" height="88" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite in2="hardAlpha" operator="out" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_735_77993" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_735_77993" result="shape" />
                                                </filter>
                                            </defs>
                                        </svg>

                                    </button>
                                    {/* Skip Forward */}
                                    <button className="text-white hover:text-gray-300 transition-colors">
                                        <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_0_1)">
                                                <circle cx="34" cy="34" r="30" fill="black" fillOpacity="0.5" shapeRendering="crispEdges" />
                                            </g>
                                            <path d="M40.3213 26.1514C40.0726 26.1514 39.8342 26.2501 39.6584 26.426C39.4826 26.6018 39.3838 26.8402 39.3838 27.0889V40.2139C39.3838 40.4625 39.4826 40.701 39.6584 40.8768C39.8342 41.0526 40.0726 41.1514 40.3213 41.1514H41.2588C41.5074 41.1514 41.7459 41.0526 41.9217 40.8768C42.0975 40.701 42.1963 40.4625 42.1963 40.2139V27.0889C42.1963 26.8402 42.0975 26.6018 41.9217 26.426C41.7459 26.2501 41.5074 26.1514 41.2588 26.1514H40.3213ZM46.8838 26.1514C46.6351 26.1514 46.3967 26.2501 46.2209 26.426C46.0451 26.6018 45.9463 26.8402 45.9463 27.0889V40.2139C45.9463 40.7314 46.3663 41.1514 46.8838 41.1514H47.8213C48.0699 41.1514 48.3084 41.0526 48.4842 40.8768C48.66 40.701 48.7588 40.4625 48.7588 40.2139V27.0889C48.7588 26.8402 48.66 26.6018 48.4842 26.426C48.3084 26.2501 48.0699 26.1514 47.8213 26.1514H46.8838ZM27.89 26.5389C26.3275 25.6476 24.3838 26.7764 24.3838 28.5764V38.7289C24.3838 40.5289 26.3275 41.6576 27.89 40.7639L36.775 35.6876C38.35 34.7876 38.35 32.5176 36.775 31.6176L27.89 26.5389Z" fill="white" />
                                            <defs>
                                                <filter id="filter0_d_0_1" x="0" y="0" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite in2="hardAlpha" operator="out" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                                </filter>
                                            </defs>
                                        </svg>

                                    </button>
                                </div>
                            </div>
                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                <div className="flex items-center justify-between text-white text-sm mb-2">
                                    <span>{currentTime}</span>
                                    <span>{totalDuration}</span>
                                </div>
                                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: '60%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Video Title */}
                    <h3 className="text-lg font-semibold text-[#24282E]">Google Meet Video recording name here...</h3>
                    {/* Video Metadata */}
                    <p className="text-sm text-[#727A90]">26 Sep 2025 : 4:15 pm : 00:00:05</p>
                </div>

                {/* Right Column - Summary, Details, Next Steps */}
                <div className="space-y-6">
                    <div className="bg-[#fbfafc] border border-[#E4E7EC] rounded-lg p-6 space-y-6 max-h-[500px] overflow-y-auto">
                        {/* Summary Section */}
                        <div>
                            <h3 className="text-base font-bold text-[#24282E] mb-3">Summary</h3>
                            <p className="text-sm text-[#2E2C34] leading-relaxed">
                                ✨ Welcome to a New Era of Lead Generation! ✨ At Qualify IQ, we understand that generating leads efficiently is crucial for your business growth. This month, we're excited to introduce our innovative tools designed to simplify your lead generation process! 💡📈 Experience seamless integration with our user-friendly platform that allows you to capture and nurture leads like never before. From automated follow-ups to insightful analytics, we've got everything you need to elevate your sales strategy. 📊📈
                            </p>
                        </div>

                        {/* Details Section */}
                        <div>
                            <h3 className="text-base font-bold text-[#24282E] mb-3">Details</h3>
                            <ul className="space-y-2">
                                <li className="text-sm text-[#2E2C34] flex items-start">
                                    <span className="mr-2 shrink-0 mt-1.5">
                                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="3.5" r="3.5" fill="black" />
                                        </svg>
                                    </span>
                                    <span>Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce</span>
                                </li>
                                <li className="text-sm text-[#2E2C34] flex items-start">
                                    <span className="mr-2 shrink-0 mt-1.5">
                                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="3.5" r="3.5" fill="black" />
                                        </svg>
                                    </span>
                                    <span>Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce</span>
                                </li>
                            </ul>
                        </div>

                        {/* Suggested Next Steps Section */}
                        <div>
                            <h3 className="text-base font-bold text-[#24282E] mb-3">Suggested Next Steps</h3>
                            <ul className="space-y-2">
                                <li className="text-sm text-[#2E2C34] flex items-start">
                                    <span className="mr-2 shrink-0 mt-1.5">
                                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="3.5" r="3.5" fill="black" />
                                        </svg>
                                    </span>
                                    <span>Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce</span>
                                </li>
                                <li className="text-sm text-[#2E2C34] flex items-start">
                                    <span className="mr-2 shrink-0 mt-1.5">
                                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="3.5" r="3.5" fill="black" />
                                        </svg>
                                    </span>
                                    <span>Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce</span>
                                </li>
                            </ul>
                        </div>

                        {/* Second Suggested Next Steps Section */}
                        <div>
                            <h3 className="text-base font-bold text-[#24282E] mb-3">Suggested Next Steps</h3>
                            <ul className="space-y-2">
                                <li className="text-sm text-[#2E2C34] flex items-start">
                                    <span className="mr-2 shrink-0 mt-1.5">
                                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="3.5" r="3.5" fill="black" />
                                        </svg>
                                    </span>
                                    <span>Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default function ViewMeetingPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading...</div>}>
            <ViewMeetingContent />
        </Suspense>
    );
}

