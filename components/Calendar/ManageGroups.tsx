'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateGroupModal from './Modal/CreateGroupModal';
import GroupMembersModal from './Modal/GroupMembersModal';

interface Group {
    id: string;
    name: string;
    memberCount: number;
    createdBy: string;
}

export default function ManageGroups() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

    // Sample groups data - in real app, these would come from API
    const groups: Group[] = [
        { id: '1', name: 'Test Group Name', memberCount: 7, createdBy: 'you' },
        { id: '2', name: 'Test Group Name', memberCount: 8, createdBy: 'you' },
        { id: '3', name: 'Test Group Name', memberCount: 9, createdBy: 'you' },
        { id: '4', name: 'Test Group Name', memberCount: 6, createdBy: 'you' },
    ];

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full">
            {/* Breadcrumb */}
            <div className="mb-2">
                <span className="text-sm text-[#727A90]">Home / Calendar</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-lg lg:text-xl font-bold text-[#24282E] mb-4">Calendar</h1>

            {/* Divider */}
            <div className="w-full h-px bg-[#EBEAED] mb-4"></div>

            {/* Back Button */}
            <button
                onClick={() => router.push('/calendar')}
                className="flex items-center gap-2 text-[#24282E] font-bold hover:text-[#5542F6] transition-colors mb-6"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#2E2C34" />
                </svg>
                <span>Manage Groups</span>
            </button>

            {/* Search and Create Group Section */}
            <div className="flex items-center gap-4 mb-6">
                {/* Search Bar */}
                <div className="flex-1 relative">
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#727A90]"
                    >
                        <path
                            d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19 19L14.65 14.65"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for groups..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-[30%] pl-10 pr-4 py-2.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                    />
                </div>

                {/* Create Group Button */}
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2.5 bg-[#5542F6] text-white rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors flex items-center gap-2 shrink-0"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3V13M3 8H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>Create Group</span>
                </button>
            </div>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGroups.map((group) => (
                    <div
                        key={group.id}
                        className="bg-white border border-[#E4E7EC] rounded-lg p-6 relative"
                    >
                        {/* Delete Icon - Top Right */}
                        <button
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-[#F7F8FA] rounded transition-colors"
                            title="Delete"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM6 18.9999C6 20.0999 6.9 20.9999 8 20.9999H16C17.1 20.9999 18 20.0999 18 18.9999V6.9999H6V18.9999ZM8.0001 9H16.0001V19H8.0001V9Z" fill="#FC3400" />
                            </svg>

                        </button>

                        {/* Group Title */}
                        <h3 className="text-base font-bold text-[#24282E] mb-1 pr-8">{group.name}</h3>

                        {/* Created By */}
                        <p className="text-sm text-[#727A90] mb-4">Created by you</p>

                        {/* View Availability Button and Members Section in Same Row */}
                        <div className="flex items-center gap-4">
                            {/* View Availability Button */}
                            <button
                                onClick={() => {
                                    setSelectedGroup(group);
                                    setIsMembersModalOpen(true);
                                }}
                                className="px-4 py-2 border border-[#D1CEFF] rounded-sm text-sm font-medium text-[#5542F6] hover:bg-[#E9E8FB] transition-colors bg-[#E9E8FB]"
                            >
                                View Availability
                            </button>

                            {/* Members Section */}
                            <button
                                onClick={() => {
                                    setSelectedGroup(group);
                                    setIsMembersModalOpen(true);
                                }}
                                className="flex items-center gap-2 bg-white border border-[#E4E7EC] rounded-lg px-3 py-2 hover:bg-[#F7F8FA] transition-colors cursor-pointer"
                            >
                                {/* Overlapping Avatars */}
                                <div className="flex items-center -space-x-2">
                                    {[
                                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
                                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
                                    ].map((imageUrl, index) => (
                                        <div
                                            key={index}
                                            className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shrink-0"
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={`Member ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Member Count */}
                                <span className="text-sm text-[#24282E]">{group.memberCount} Members</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Group Modal */}
            <CreateGroupModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={(groupName, members) => {
                    // Handle group creation - in real app, this would call an API
                    console.log('Creating group:', groupName, members);
                    setIsCreateModalOpen(false);
                }}
            />

            {/* Group Members Modal */}
            {selectedGroup && (
                <GroupMembersModal
                    isOpen={isMembersModalOpen}
                    onClose={() => {
                        setIsMembersModalOpen(false);
                        setSelectedGroup(null);
                    }}
                    groupName={selectedGroup.name}
                    members={[
                        {
                            id: '1',
                            name: 'Elissa',
                            email: 'elissa@example.com',
                            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
                            role: 'owner',
                            isOwner: true,
                        },
                        {
                            id: '2',
                            name: 'Elena Perry',
                            email: 'elena@example.com',
                            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                            role: 'viewer',
                        },
                        {
                            id: '3',
                            name: 'Marcus Finch',
                            email: 'marcus@example.com',
                            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                            role: 'editor',
                        },
                        {
                            id: '4',
                            name: 'Sofia Nguyen',
                            email: 'sofia@example.com',
                            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                            role: 'admin',
                        },
                    ]}
                />
            )}
        </div>
    );
}

