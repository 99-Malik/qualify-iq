'use client';

import React, { useState } from 'react';
import { Dropdown } from '@/components/OutboundLeads/Modal/ApplyFilterModal/components/Dropdown';

interface Member {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
}

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (groupName: string, members: Member[]) => void;
}

export default function CreateGroupModal({ isOpen, onClose, onCreate }: CreateGroupModalProps) {
    const [groupName, setGroupName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [addedMembers, setAddedMembers] = useState<Member[]>([
        {
            id: '1',
            name: 'Elena Perry',
            email: 'elena@example.com',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
            role: 'viewer',
        },
        {
            id: '2',
            name: 'Elena Perry',
            email: 'elena2@example.com',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
            role: 'viewer',
        },
    ]);

    const roleOptions = [
        { value: 'owner', label: 'Owner' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
    ];

    const handleAddMember = () => {
        if (memberEmail.trim()) {
            const newMember: Member = {
                id: Date.now().toString(),
                name: memberEmail.split('@')[0] || 'Member',
                email: memberEmail,
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                role: 'viewer',
            };
            setAddedMembers([...addedMembers, newMember]);
            setMemberEmail('');
        }
    };

    const handleRemoveMember = (id: string) => {
        setAddedMembers(addedMembers.filter(member => member.id !== id));
    };

    const handleRoleChange = (memberId: string, role: string) => {
        setAddedMembers(addedMembers.map(member =>
            member.id === memberId ? { ...member, role } : member
        ));
    };

    const handleCreate = () => {
        if (groupName.trim()) {
            onCreate(groupName, addedMembers);
            setGroupName('');
            setMemberEmail('');
            setAddedMembers([]);
            onClose();
        }
    };

    const handleCancel = () => {
        setGroupName('');
        setMemberEmail('');
        setAddedMembers([]);
        onClose();
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
                                Create Group
                            </h2>
                            <p className="text-sm text-[#727A90]">
                                Add members to your group to find mutual availability, you are the owner and editor by default
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center text-[#24282E] hover:text-[#FC3400] transition-colors shrink-0"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1 scroll-hidden">
                        <div className="px-6 pb-6">
                            {/* Group Name Section */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-[#24282E] mb-2">
                                    Group Name
                                </label>
                                <input
                                    type="text"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder="e.g Marketing Team"
                                    className="w-full px-4 py-2.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                                />
                            </div>

                            {/* Add Members Section */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-[#24282E] mb-2">
                                    Add Members
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="email"
                                        value={memberEmail}
                                        onChange={(e) => setMemberEmail(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddMember();
                                            }
                                        }}
                                        placeholder="e.g, abc123@gmail.com"
                                        className="flex-1 px-4 py-2.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-white focus:outline-none focus:ring-2 focus:ring-[#5542F6] focus:border-transparent"
                                    />
                                    <button
                                        onClick={handleAddMember}
                                        className="w-10 h-10 bg-[#5542F6] rounded-sm flex items-center justify-center hover:bg-[#4535D6] transition-colors shrink-0"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.334 17.5V15.8333C13.334 14.9493 12.9828 14.1014 12.3577 13.4763C11.7326 12.8512 10.8847 12.5 10.0007 12.5H4.16732C3.28326 12.5 2.43542 12.8512 1.8103 13.4763C1.18517 14.1014 0.833984 14.9493 0.833984 15.8333V17.5M16.6673 6.66667V11.6667M19.1673 9.16667H14.1673M10.4173 5.83333C10.4173 7.67428 8.92493 9.16667 7.08398 9.16667C5.24303 9.16667 3.75065 7.67428 3.75065 5.83333C3.75065 3.99238 5.24303 2.5 7.08398 2.5C8.92493 2.5 10.4173 3.99238 10.4173 5.83333Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </button>
                                </div>
                            </div>

                            {/* Added Members Section */}
                            <div>
                                <label className="block text-sm font-medium text-[#24282E] mb-3">
                                    Added Members
                                </label>
                                <div className="space-y-3">
                                    {addedMembers.map((member) => (
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
                                                {member.name}
                                            </span>

                                            {/* Role Dropdown */}
                                            <div className="flex-1">
                                                <Dropdown
                                                    value={member.role}
                                                    onChange={(value) => handleRoleChange(member.id, value)}
                                                    options={roleOptions}
                                                    placeholder="Select role"
                                                    bg="#EBEAED"
                                                    className="w-full"
                                                    buttonClassName="w-fit px-4 py-2.5 border border-[#E4E7EC] rounded-sm text-sm text-[#24282E] bg-[#F7F8FA]"
                                                />
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemoveMember(member.id)}
                                                className="w-8 h-8 bg-[#5542F6] rounded-full flex items-center justify-center hover:bg-[#4535D6] transition-colors shrink-0"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#EBEAED] shrink-0">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-2.5 bg-white border border-[#E4E7EC] rounded-sm text-sm font-medium text-[#24282E] hover:bg-[#F7F8FA] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            className="px-6 py-2.5 bg-[#5542F6] text-white rounded-sm text-sm font-medium hover:bg-[#4535D6] transition-colors flex items-center gap-2"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 3V13M3 8H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>Create Group</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

