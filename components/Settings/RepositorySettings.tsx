'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/components/OutboundLeads/Modal/ApplyFilterModal/components/Dropdown';
import Image from 'next/image';

export default function RepositorySettings() {
    const router = useRouter();

    const [primaryFont, setPrimaryFont] = useState('manrope');
    const [secondaryFont, setSecondaryFont] = useState('inter');
    const [newColor, setNewColor] = useState('#1B');

    const fontOptions = [
        { value: 'manrope', label: 'Manrope' },
        { value: 'inter', label: 'Inter' },
        { value: 'roboto', label: 'Roboto' },
        { value: 'opensans', label: 'Open Sans' }
    ];

    const brandColors = [
        { hex: '#1B62E8', name: 'Blue' },
        { hex: '#E82E1B', name: 'Red' },
        { hex: '#E8D21B', name: 'Yellow' },
        { hex: '#1B1B1B', name: 'Black' }
    ];

    const allColorTiles = [
        ...brandColors.map(color => ({ ...color, isAdd: false })),
        { hex: newColor, name: 'Add', isAdd: true }
    ];

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-2">
                <nav className="text-sm">
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/')}>
                        Home
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#727A90] hover:text-[#24282E] cursor-pointer" onClick={() => router.push('/settings')}>
                        Settings
                    </span>
                    <span className="text-[#727A90] mx-1">/</span>
                    <span className="text-[#24282E]">Repository Settings</span>
                </nav>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-[#24282E] mb-6">Settings</h1>

            {/* Separator */}
            <div className="w-full h-px bg-[#EBEAED] mb-6"></div>

            {/* Back Arrow and Repository Settings */}
            <div className="flex items-center gap-2 mb-8">
                <button
                    onClick={() => router.push('/settings')}
                    className="text-[#24282E] hover:text-[#5542F6] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                    </svg>

                </button>
                <h2 className="text-xl font-semibold text-[#24282E]">Repository Settings</h2>
            </div>
            <h3 className="text-lg font-bold text-[#24282E] mb-4">Choose Repository</h3>

            {/* Repository Settings Section */}
            <div className="bg-white border border-[#E4E7EC] rounded-lg p-6 mb-6">
                {/* Choose Repository Subsection */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#E4E7EC] shrink-0">
                            <Image
                                src="/images/choose-repo.png"
                                alt="Repository Logo"
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-[#edecfe] text-primary rounded-sm hover:bg-[#4535D6] transition-colors text-xs font-medium">
                                Upload New Logo
                            </button>
                            <button className="px-4 py-2 bg-white border-2 border-[#EBEAED] text-[#FC3400] rounded-sm hover:bg-[#FEF5F5] transition-colors text-xs font-medium">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Fonts Subsection */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-[#24282E] mb-4">Fonts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        {/* Primary Font */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="relative group">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-help">
                                        <path d="M10.0013 1.66797C5.4013 1.66797 1.66797 5.4013 1.66797 10.0013C1.66797 14.6013 5.4013 18.3346 10.0013 18.3346C14.6013 18.3346 18.3346 14.6013 18.3346 10.0013C18.3346 5.4013 14.6013 1.66797 10.0013 1.66797ZM10.8346 14.168H9.16797V9.16797H10.8346V14.168ZM10.8346 7.5013H9.16797V5.83464H10.8346V7.5013Z" fill="#84818A" />
                                    </svg>
                                    <div className="absolute left-0 top-6 hidden group-hover:block z-10 min-w-[200px] max-w-[250px]">
                                        <div className="bg-white rounded-md p-3 shadow-sm relative">
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-r border-b border-[#E4E7EC]"></div>
                                            <div className="font-bold text-sm text-[#24282E] mb-1">Font Info</div>
                                            <div className="text-xs text-[#727A90]">It will use for headings</div>
                                        </div>
                                    </div>
                                </div>
                                <label className="block text-sm font-medium text-[#727A90]">
                                    Select Primary Font
                                </label>
                            </div>
                            <Dropdown
                                value={primaryFont}
                                onChange={setPrimaryFont}
                                options={fontOptions}
                                className="w-full"
                                buttonClassName="w-full h-[46px] px-4 border border-[#E4E7EC] rounded-sm bg-white text-sm text-[#24282E] focus:outline-none"
                            />
                        </div>

                        {/* Secondary Font */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="relative group">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-help">
                                        <path d="M10.0013 1.66797C5.4013 1.66797 1.66797 5.4013 1.66797 10.0013C1.66797 14.6013 5.4013 18.3346 10.0013 18.3346C14.6013 18.3346 18.3346 14.6013 18.3346 10.0013C18.3346 5.4013 14.6013 1.66797 10.0013 1.66797ZM10.8346 14.168H9.16797V9.16797H10.8346V14.168ZM10.8346 7.5013H9.16797V5.83464H10.8346V7.5013Z" fill="#84818A" />
                                    </svg>
                                    <div className="absolute left-0 top-6 hidden group-hover:block z-10 min-w-[200px] max-w-[250px]">
                                        <div className="bg-white rounded-md p-3 shadow-sm relative">
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-r border-b border-[#E4E7EC]"></div>
                                            <div className="font-bold text-sm text-[#24282E] mb-1">Font Info</div>
                                            <div className="text-xs text-[#727A90]">It will use for subheadings and body text</div>
                                        </div>
                                    </div>
                                </div>
                                <label className="block text-sm font-medium text-[#727A90]">
                                    Select Secondary Font
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Dropdown
                                    value={secondaryFont}
                                    onChange={setSecondaryFont}
                                    options={fontOptions}
                                    className="flex-1"
                                    buttonClassName="w-full h-[46px] px-4 border border-[#E4E7EC] rounded-sm bg-white text-sm text-[#24282E] focus:outline-none"
                                />
                                <button className="px-4 py-3 bg-[#edecfe] text-primary rounded-sm hover:bg-[#4535D6] transition-colors text-xs font-medium whitespace-nowrap">
                                    Upload Font
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand Colors Subsection */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-lg font-bold text-[#24282E]">Brand Colors</h3>
                        <div className="relative group">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-help">
                                <path d="M10.0013 1.66797C5.4013 1.66797 1.66797 5.4013 1.66797 10.0013C1.66797 14.6013 5.4013 18.3346 10.0013 18.3346C14.6013 18.3346 18.3346 14.6013 18.3346 10.0013C18.3346 5.4013 14.6013 1.66797 10.0013 1.66797ZM10.8346 14.168H9.16797V9.16797H10.8346V14.168ZM10.8346 7.5013H9.16797V5.83464H10.8346V7.5013Z" fill="#84818A" />
                            </svg>
                            <div className="absolute left-0 top-6 hidden group-hover:block z-10 min-w-[300px] max-w-[350px]">
                                <div className="bg-white rounded-md p-3 shadow-sm relative">
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-r border-b border-[#E4E7EC]"></div>
                                    <div className="text-xs text-[#727A90]">These are the brand colors that are taken from the above logo, you can change it as well</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        {allColorTiles.map((tile, index) => (
                            <div key={index} className="flex flex-col border border-[#E4E7EC] rounded-md bg-white overflow-hidden w-25">
                                <div className="p-2">
                                    {tile.isAdd ? (
                                        <div className="h-8 rounded-md bg-white flex items-center justify-center mb-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 5V19M5 12H19" stroke="#84818A" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className="h-8 rounded-md cursor-pointer mb-2"
                                            style={{ backgroundColor: tile.hex }}
                                        ></div>
                                    )}
                                </div>
                                <div className="w-full h-px bg-[#E4E7EC]"></div>
                                <div className="p-2">
                                    {tile.isAdd ? (
                                        <div className="bg-white flex items-center justify-center">
                                            <input
                                                type="text"
                                                value={newColor}
                                                onChange={(e) => setNewColor(e.target.value)}
                                                placeholder="#1B"
                                                className="w-full px-0 py-0 border-0 bg-transparent text-xs text-[#24282E] focus:outline-none text-center"
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-white flex items-center justify-center min-h-[40px]">
                                            <span className="text-xs text-[#24282E] font-normal">{tile.hex}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div>
                <h3 className="text-lg font-bold text-[#24282E] mb-4">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {/* Mewo Logo */}
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-[#E4E7EC] bg-white">
                        <Image
                            src="/images/settings-avatar.jpg"
                            alt="Gallery Item"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Profile Picture */}
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-[#E4E7EC] bg-white">
                        <Image
                            src="/images/settings-avatar.jpg"
                            alt="Gallery Item"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Empty Placeholders */}
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="relative w-full aspect-square rounded-lg overflow-hidden border border-[#E4E7EC] bg-white flex items-center justify-center">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 8L8 16V32L24 40L40 32V16L24 8Z" stroke="#84818A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M24 8V40" stroke="#84818A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 16L24 24L40 16" stroke="#84818A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 32L24 24L40 32" stroke="#84818A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

