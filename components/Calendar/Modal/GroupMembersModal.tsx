'use client';

import React, { useState } from 'react';
import { Dropdown } from '@/components/OutboundLeads/Modal/ApplyFilterModal/components/Dropdown';

interface Member {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
    isOwner?: boolean;
}

interface GroupMembersModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupName: string;
    members: Member[];
}

export default function GroupMembersModal({ isOpen, onClose, groupName, members: initialMembers }: GroupMembersModalProps) {
    const [members, setMembers] = useState<Member[]>(initialMembers);

    const roleOptions = [
        { value: 'owner', label: 'Owner' },
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
    ];

    const handleRoleChange = (memberId: string, role: string) => {
        setMembers(members.map(member =>
            member.id === memberId ? { ...member, role } : member
        ));
    };

    const handleRemoveMember = (id: string) => {
        setMembers(members.filter(member => member.id !== id));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="relative bg-white rounded-lg shadow-xl flex flex-col max-h-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-start justify-between px-6 pt-6 pb-4 shrink-0">
                        <div className="flex-1 pr-4">
                            <h2 className="text-2xl font-bold text-[#24282E] mb-2">
                                Members of {groupName}
                            </h2>
                            <p className="text-sm text-[#727A90]">
                                You can view all the members of the test group here
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center   transition-colors shrink-0"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6667 0C5.215 0 0 5.215 0 11.6667C0 18.1183 5.215 23.3333 11.6667 23.3333C18.1183 23.3333 23.3333 18.1183 23.3333 11.6667C23.3333 5.215 18.1183 0 11.6667 0ZM17.5 15.855L15.855 17.5L11.6667 13.3117L7.47833 17.5L5.83333 15.855L10.0217 11.6667L5.83333 7.47833L7.47833 5.83333L11.6667 10.0217L15.855 5.83333L17.5 7.47833L13.3117 11.6667L17.5 15.855Z" fill="#504F54" />
                            </svg>

                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1 scroll-hidden">
                        <div className="px-6 pb-6">
                            {/* Added Members Section */}
                            <div>
                                <label className="block text-sm font-medium text-[#24282E] mb-3">
                                    Added Members
                                </label>
                                <div className="space-y-3">
                                    {members.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center gap-3 bg-white border border-[#EBEAED] rounded-lg px-4 py-3"
                                        >
                                            {/* Avatar */}
                                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Name */}
                                            <span className="text-sm text-[#24282E] font-medium min-w-[120px]">
                                                {member.isOwner ? `(${member.name}) You` : member.name}
                                            </span>

                                            {/* Role - Button for Owner, Dropdown for others */}
                                            <div className="flex-1 flex justify-end">
                                                {member.role === 'owner' || member.isOwner ? (
                                                    <button className="px-4 py-2 bg-[#EDECFE] text-black rounded-sm text-sm font-medium shrink-0">
                                                        Owner
                                                    </button>
                                                ) : (
                                                    <Dropdown
                                                        value={member.role}
                                                        onChange={(value) => handleRoleChange(member.id, value)}
                                                        options={roleOptions.filter(opt => opt.value !== 'owner')}
                                                        placeholder="Select role"
                                                        bg="white"
                                                        className="w-fit"
                                                        buttonClassName="w-fit px-4 py-2.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white"
                                                    />
                                                )}
                                            </div>

                                            {/* Remove Button - Only show if not owner */}
                                            {!member.isOwner && (
                                                <button
                                                    onClick={() => handleRemoveMember(member.id)}
                                                    className="w-5 h-5 bg-[#5542F6] rounded-full flex items-center justify-center hover:bg-[#4535D6] transition-colors shrink-0 ml-2"
                                                >
                                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

