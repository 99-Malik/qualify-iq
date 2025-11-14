'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export interface ColumnConfig {
    id: string;
    label: string;
    example: string;
    visible: boolean;
    order: number;
}

interface DataPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    columns: ColumnConfig[];
    onSave: (columns: ColumnConfig[]) => void;
}

export default function DataPreviewModal({
    isOpen,
    onClose,
    columns: initialColumns,
    onSave,
}: DataPreviewModalProps) {
    const [columns, setColumns] = useState<ColumnConfig[]>(initialColumns);
    const [draggedColumnId, setDraggedColumnId] = useState<string | null>(null);
    const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
    const [showMore, setShowMore] = useState(false);

    const visibleColumns = showMore ? columns : columns.filter(col => col.visible);
    const activeColumnsCount = columns.filter(col => col.visible).length;
    const maxColumns = 5;
    const isMaxReached = activeColumnsCount >= maxColumns;

    const handleDragStart = (columnId: string) => {
        setDraggedColumnId(columnId);
    };

    const handleDragEnd = () => {
        setDraggedColumnId(null);
        setDragOverColumnId(null);
    };

    const handleDragOver = (e: React.DragEvent, columnId: string) => {
        e.preventDefault();
        if (draggedColumnId && draggedColumnId !== columnId) {
            setDragOverColumnId(columnId);
        }
    };

    const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
        e.preventDefault();
        if (!draggedColumnId || draggedColumnId === targetColumnId) {
            return;
        }

        const draggedIndex = columns.findIndex(col => col.id === draggedColumnId);
        const targetIndex = columns.findIndex(col => col.id === targetColumnId);

        if (draggedIndex === -1 || targetIndex === -1) {
            return;
        }

        const newColumns = [...columns];
        const [removed] = newColumns.splice(draggedIndex, 1);
        newColumns.splice(targetIndex, 0, removed);

        // Update order values
        newColumns.forEach((col, index) => {
            col.order = index;
        });

        setColumns(newColumns);
        setDraggedColumnId(null);
        setDragOverColumnId(null);
    };

    const handleToggleVisibility = (columnId: string) => {
        if (isMaxReached && columns.find(col => col.id === columnId)?.visible) {
            // Allow toggling off even if max is reached
            setColumns(prev =>
                prev.map(col =>
                    col.id === columnId ? { ...col, visible: !col.visible } : col
                )
            );
        } else if (!isMaxReached || !columns.find(col => col.id === columnId)?.visible) {
            setColumns(prev =>
                prev.map(col =>
                    col.id === columnId ? { ...col, visible: !col.visible } : col
                )
            );
        }
    };

    const handleColumnNameChange = (columnId: string, newName: string) => {
        setColumns(prev =>
            prev.map(col => (col.id === columnId ? { ...col, label: newName } : col))
        );
    };

    const handleSave = () => {
        onSave(columns);
        onClose();
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6">
                    <h2 className="text-xl font-bold text-[#24282E]">Data Preview</h2>
                    <button
                        onClick={onClose}
                        className="text-[#727A90] hover:text-[#24282E] transition-colors"
                    >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9987 2.33203C7.54703 2.33203 2.33203 7.54703 2.33203 13.9987C2.33203 20.4504 7.54703 25.6654 13.9987 25.6654C20.4504 25.6654 25.6654 20.4504 25.6654 13.9987C25.6654 7.54703 20.4504 2.33203 13.9987 2.33203ZM19.832 18.187L18.187 19.832L13.9987 15.6437L9.81036 19.832L8.16537 18.187L12.3537 13.9987L8.16537 9.81036L9.81036 8.16537L13.9987 12.3537L18.187 8.16537L19.832 9.81036L15.6437 13.9987L19.832 18.187Z" fill="#504F54" />
                        </svg>

                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Bordered Container - Contains column names title, column list, show more, and warning */}
                    <div className="border border-[#E4E7EC] rounded-lg px-4 pt-6 mb-4">
                        <h3 className="text-lg font-bold text-[#2E2C34] mb-4">Column Names</h3>
                        {/* Column List */}
                        <div className="space-y-3 mb-4">
                            {visibleColumns.map((column) => {
                                const isDragging = draggedColumnId === column.id;
                                const isDragOver = dragOverColumnId === column.id;

                                return (
                                    <div
                                        key={column.id}
                                        draggable
                                        onDragStart={() => handleDragStart(column.id)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => handleDragOver(e, column.id)}
                                        onDrop={(e) => handleDrop(e, column.id)}
                                        className={`flex items-center gap-3 transition-all ${isDragging ? 'opacity-50' : ''
                                            }`}
                                    >
                                        {/* Drag Handle - Outside border */}
                                        <div className="cursor-move shrink-0 flex items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 18C11 19.1 10.1 20 9 20C7.9 20 7 19.1 7 18C7 16.9 7.9 16 9 16C10.1 16 11 16.9 11 18ZM9 10C7.9 10 7 10.9 7 12C7 13.1 7.9 14 9 14C10.1 14 11 13.1 11 12C11 10.9 10.1 10 9 10ZM9 4C7.9 4 7 4.9 7 6C7 7.1 7.9 8 9 8C10.1 8 11 7.1 11 6C11 4.9 10.1 4 9 4ZM15 8C16.1 8 17 7.1 17 6C17 4.9 16.1 4 15 4C13.9 4 13 4.9 13 6C13 7.1 13.9 8 15 8ZM15 10C13.9 10 13 10.9 13 12C13 13.1 13.9 14 15 14C16.1 14 17 13.1 17 12C17 10.9 16.1 10 15 10ZM15 16C13.9 16 13 16.9 13 18C13 19.1 13.9 20 15 20C16.1 20 17 19.1 17 18C17 16.9 16.1 16 15 16Z" fill="#84818A" />
                                            </svg>

                                        </div>

                                        {/* Border div - Contains column name, example, and toggle */}
                                        <div className={`flex items-center gap-3 flex-1 px-6 py-3 rounded-sm border transition-all ${isDragOver ? 'border-[#5542F6] bg-[#EDECFE]' : 'border-[#E3E1E5] border-2s bg-white'
                                            }`}>
                                            {/* Column Name */}
                                            <span className="text-md font-semibold  text-[#2E2C34] shrink-0" style={{ minWidth: '100px', display: 'block' }}>
                                                {column.label}
                                            </span>

                                            {/* Example Value */}
                                            <span className="text-md text-[#84818A] shrink-0 ml-4">
                                                {column.example}
                                            </span>

                                            {/* Spacer to push toggle to the right */}
                                            <div className="flex-1"></div>

                                            {/* Toggle Switch */}
                                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                <input
                                                    type="checkbox"
                                                    checked={column.visible}
                                                    onChange={() => handleToggleVisibility(column.id)}
                                                    disabled={isMaxReached && !column.visible}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-[#E4E7EC] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#EDECFE] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5542F6] peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Show More Button */}
                        {!showMore && columns.length > visibleColumns.length && (
                            <button
                                onClick={() => setShowMore(true)}
                                className="text-sm text-[#5542F6] font-medium mb-4 hover:underline"
                            >
                                Show More
                            </button>
                        )}

                        {/* Warning Message */}
                        {isMaxReached && (
                            <div className="flex items-center gap-2 p-3 mb-4 bg-[#ffe6b8] border border-[#FFE5CC] rounded-lg">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 2H10L4.02 8L4 20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM13 17H11V15H13V17ZM13 13H11V8H13V13Z" fill="#2E2C34" />
                                </svg>

                                <span className="text-sm text-[#24282E] font-medium">
                                    Max Limit for columns is reached
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-[#5542F6] text-white text-md rounded-sm hover:bg-[#4535D6] transition-colors"
                        >
                            Save & Update to Uploads
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}

