'use client';

import { useState, useRef, useEffect } from 'react';

interface SignatureFieldProps {
    id: string;
    initialX: number;
    initialY: number;
    initialWidth?: number;
    initialHeight?: number;
    text?: string;
    imageUrl?: string;
    type?: 'text' | 'image';
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: number;
    onDelete: (id: string) => void;
    onUpdate: (id: string, data: { x: number; y: number; width: number; height: number; text?: string; imageUrl?: string }) => void;
    isPreviewMode?: boolean; // Disable interactions in preview mode
}

export default function SignatureField({
    id,
    initialX,
    initialY,
    initialWidth = 300,
    initialHeight = 100,
    text = '',
    imageUrl,
    type = 'text',
    fontFamily,
    fontWeight,
    fontSize,
    onDelete,
    onUpdate,
    isPreviewMode = false
}: SignatureFieldProps) {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeHandle, setResizeHandle] = useState<string>('');
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });
    const [signatureText, setSignatureText] = useState(text);
    const [isEditing, setIsEditing] = useState(false);
    const fieldRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLInputElement>(null);

    // Helper function to convert fontWeight string to CSS value
    const convertFontWeight = (weight: string | undefined): string => {
        if (!weight) return 'normal';
        const weightMap: { [key: string]: string } = {
            'Bold': 'bold',
            'Normal': 'normal',
            'Light': '300',
            'Extra Bold': '800'
        };
        return weightMap[weight] || weight.toLowerCase();
    };

    // Sync signatureText with text prop when it changes (for real-time updates from properties panel)
    useEffect(() => {
        if (text !== undefined) {
            setSignatureText(text);
        }
    }, [text]);

    // Handle dragging
    const handleMouseDown = (e: React.MouseEvent) => {
        if (isPreviewMode) return; // Disable in preview mode
        if ((e.target as HTMLElement).closest('.resize-handle') || (e.target as HTMLElement).closest('.delete-button')) {
            return;
        }
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && !isResizing) {
                const newX = e.clientX - dragStart.x;
                const newY = e.clientY - dragStart.y;
                setPosition({ x: newX, y: newY });
            } else if (isResizing) {
                const deltaX = e.clientX - resizeStart.x;
                const deltaY = e.clientY - resizeStart.y;
                let newWidth = resizeStart.width;
                let newHeight = resizeStart.height;
                let newX = position.x;
                let newY = position.y;

                if (resizeHandle.includes('right')) {
                    newWidth = Math.max(200, resizeStart.width + deltaX);
                }
                if (resizeHandle.includes('left')) {
                    newWidth = Math.max(200, resizeStart.width - deltaX);
                    newX = resizeStart.posX + deltaX;
                }
                if (resizeHandle.includes('bottom')) {
                    newHeight = Math.max(80, resizeStart.height + deltaY);
                }
                if (resizeHandle.includes('top')) {
                    newHeight = Math.max(80, resizeStart.height - deltaY);
                    newY = resizeStart.posY + deltaY;
                }

                setSize({ width: newWidth, height: newHeight });
                if (resizeHandle.includes('left') || resizeHandle.includes('top')) {
                    setPosition({ x: newX, y: newY });
                }
            }
        };

        const handleMouseUp = () => {
            if (isDragging || isResizing) {
                setIsDragging(false);
                setIsResizing(false);
                // Update parent with new position/size
                onUpdate(id, {
                    ...position,
                    ...size,
                    text: signatureText,
                    imageUrl: imageUrl
                });
            }
        };

        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, isResizing, dragStart, resizeStart, resizeHandle, id, position, size, signatureText, onUpdate]);

    // Handle resizing
    const handleResizeStart = (e: React.MouseEvent, handle: string) => {
        if (isPreviewMode) return; // Disable in preview mode
        setIsResizing(true);
        setResizeHandle(handle);
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            width: size.width,
            height: size.height,
            posX: position.x,
            posY: position.y
        });
        e.preventDefault();
        e.stopPropagation();
    };

    // Handle text editing
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignatureText(e.target.value);
        onUpdate(id, {
            ...position,
            ...size,
            text: e.target.value
        });
    };

    // Focus textarea when editing starts
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditing]);

    // Handle double click to edit
    const handleDoubleClick = () => {
        if (isPreviewMode) return; // Disable in preview mode
        setIsEditing(true);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isPreviewMode) return; // Disable in preview mode
        onDelete(id);
    };

    return (
        <div
            ref={fieldRef}
            className={`absolute ${isPreviewMode ? 'cursor-default' : 'cursor-move border-6 border-[#5542F6] bg-white rounded-lg'}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                minWidth: isPreviewMode ? 'auto' : '200px',
                minHeight: isPreviewMode ? 'auto' : '80px',
                border: isPreviewMode ? 'none' : undefined,
                background: isPreviewMode ? 'transparent' : undefined,
                borderRadius: isPreviewMode ? '0' : undefined
            }}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
        >
            {/* Delete Button - Only show in edit mode */}
            {!isPreviewMode && (
                <button
                    className="delete-button absolute -top-5 -right-5  flex items-center justify-center cursor-pointer z-20 transition-colors"
                    onClick={handleDelete}
                >
                <svg width="40" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="18" height="18" rx="9" fill="#FC3400" />
                    <path d="M11.864 6.71317L11.2872 6.13635L9.00036 8.42317L6.71354 6.13635L6.13672 6.71317L8.42354 8.99999L6.13672 11.2868L6.71354 11.8636L9.00036 9.57681L11.2872 11.8636L11.864 11.2868L9.57717 8.99999L11.864 6.71317Z" fill="white" />
                </svg>
                </button>
            )}

            {/* Resize Handles - Only show in edit mode */}
            {!isPreviewMode && (
                <>
            <div
                className="resize-handle absolute -top-2 -left-2.5 w-4 h-4 bg-[#5542F6] cursor-nwse-resize z-10"
                onMouseDown={(e) => handleResizeStart(e, 'top-left')}
            />
            <div
                className="resize-handle absolute -top-1 -right-1 w-2 h-2 bg-[#5542F6] cursor-nesw-resize z-10"
                onMouseDown={(e) => handleResizeStart(e, 'top-right')}
            />
            <div
                className="resize-handle absolute -bottom-2 -left-2.5 w-4 h-4 bg-[#5542F6] cursor-nesw-resize z-10"
                onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
            />
            <div
                className="resize-handle absolute -bottom-2.5 -right-2.5 w-4 h-4 bg-[#5542F6] cursor-nwse-resize z-10"
                onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
            />
                </>
            )}

            {/* Signature Content Area */}
            <div className={`w-full h-full flex items-center justify-center overflow-hidden ${isPreviewMode ? 'px-0' : 'px-6'}`}>
                {type === 'image' && imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Imported signature"
                        className={`${isPreviewMode ? 'w-auto h-auto max-w-full max-h-full' : 'w-full h-full'} object-contain`}
                        draggable={false}
                    />
                ) : isEditing && !isPreviewMode ? (
                    <input
                        type="text"
                        ref={textareaRef}
                        className="w-full h-full border-none outline-none bg-transparent text-black text-center px-4"
                        style={{ 
                            fontFamily: fontFamily || 'cursive',
                            fontWeight: convertFontWeight(fontWeight),
                            fontSize: fontSize ? `${fontSize}px` : '18px'
                        }}
                        value={signatureText}
                        onChange={handleTextChange}
                        onBlur={() => setIsEditing(false)}
                        placeholder="Type your signature here..."
                    />
                ) : (
                    <div
                        className={`w-full h-full flex items-center justify-center ${isPreviewMode ? 'cursor-default px-0' : 'cursor-text px-4'}`}
                        style={{ 
                            fontFamily: fontFamily || 'cursive',
                            fontWeight: convertFontWeight(fontWeight),
                            fontSize: fontSize ? `${fontSize}px` : '18px'
                        }}
                    >
                        {signatureText ? (
                            <span className="text-black wrap-break-word">{signatureText}</span>
                        ) : !isPreviewMode ? (
                            <span className="text-[#A0A0A0] text-base font-normal">Double click to type signature</span>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}

