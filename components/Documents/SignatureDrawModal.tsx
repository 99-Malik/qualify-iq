'use client';

import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { X, Pen, PenTool, Paintbrush, Undo2, Redo2 } from 'lucide-react';

interface SignatureDrawModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (signatureDataUrl: string) => void;
}

type PenType = 'pen' | 'fountain' | 'brush';

export default function SignatureDrawModal({ isOpen, onClose, onSave }: SignatureDrawModalProps) {
    const canvasRef = useRef<SignatureCanvas>(null);
    const boldnessSliderRef = useRef<HTMLInputElement>(null);
    const [penType, setPenType] = useState<PenType>('pen');
    const [boldness, setBoldness] = useState(2);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    const colors = [
        '#000000', // Black
        '#90EE90', // Light Green
        '#DDA0DD', // Light Purple
        '#FFB6C1', // Pink
        '#ADD8E6'  // Light Blue
    ];

    // Update range progress CSS variable for the slider
    useEffect(() => {
        if (boldnessSliderRef.current) {
            const percentage = ((boldness - 1) / (10 - 1)) * 100;
            boldnessSliderRef.current.style.setProperty('--range-progress', `${percentage}%`);
        }
    }, [boldness]);


    const handleClear = () => {
        canvasRef.current?.clear();
        setCanUndo(false);
        setCanRedo(false);
    };

    const handleUndo = () => {
        // Signature pad doesn't have built-in undo, so we'll track history manually
        // For now, we'll clear and let user redraw
        if (canvasRef.current) {
            canvasRef.current.clear();
        }
        setCanUndo(false);
    };

    const handleSave = () => {
        if (canvasRef.current && !canvasRef.current.isEmpty()) {
            const dataUrl = canvasRef.current.toDataURL('image/png');
            onSave(dataUrl);
            handleClear();
            onClose();
        }
    };

    const handleCancel = () => {
        handleClear();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                onClick={handleCancel}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl my-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#24282E]">Draw Your Signature</h2>
                    <button
                        onClick={handleCancel}
                        className="text-[#727A90] hover:text-[#24282E] transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Draw New Sign Button */}
                <button
                    onClick={handleClear}
                    className="w-full mb-4 px-4 py-3 bg-[#F7F7F7] border-2 border-[#E4E7EC] rounded-lg hover:bg-[#EBEBEB] transition-colors flex items-center gap-3"
                >
                    <Pen size={20} color="#5542F6" />
                    <span className="text-[#24282E] font-semibold">Draw New Sign</span>
                </button>

                {/* Drawing Canvas */}
                <div className="mb-6 border-2 border-[#E4E7EC] rounded-lg overflow-hidden bg-white">
                    <SignatureCanvas
                        key={`${penType}-${boldness}-${selectedColor}`}
                        ref={canvasRef}
                        canvasProps={{
                            className: 'signature-canvas w-full',
                            width: 800,
                            height: 300
                        }}
                        backgroundColor="white"
                        penColor={selectedColor}
                        minWidth={
                            penType === 'pen' ? boldness * 0.5 :
                            penType === 'fountain' ? boldness * 0.8 :
                            boldness * 1.2
                        }
                        maxWidth={
                            penType === 'pen' ? boldness * 0.8 :
                            penType === 'fountain' ? boldness * 1.5 :
                            boldness * 2.5
                        }
                        throttle={16}
                        velocityFilterWeight={0.7}
                        onBegin={() => setCanUndo(true)}
                    />
                </div>

                {/* Controls Panel */}
                <div className="bg-white border-2 border-[#E4E7EC] rounded-lg p-4 space-y-4">
                    {/* Pen Types */}
                    <div>
                        <label className="block text-sm font-semibold text-[#24282E] mb-2">Pen Types</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPenType('pen')}
                                className={`flex-1 p-3 border-2 rounded-lg transition-colors flex items-center justify-center ${
                                    penType === 'pen'
                                        ? 'bg-[#F7F7F7] border-[#5542F6]'
                                        : 'bg-white border-[#E4E7EC] hover:bg-[#F7F8FA]'
                                }`}
                            >
                                <Pen 
                                    size={25} 
                                    className="shrink-0" 
                                    color={penType === 'pen' ? '#5542F6' : '#84818A'} 
                                />
                            </button>
                            <button
                                onClick={() => setPenType('fountain')}
                                className={`flex-1 p-3 border-2 rounded-lg transition-colors flex items-center justify-center ${
                                    penType === 'fountain'
                                        ? 'bg-[#F7F7F7] border-[#5542F6]'
                                        : 'bg-white border-[#E4E7EC] hover:bg-[#F7F8FA]'
                                }`}
                            >
                                <PenTool 
                                    size={30} 
                                    className="shrink-0" 
                                    color={penType === 'fountain' ? '#5542F6' : '#84818A'} 
                                />
                            </button>
                            <button
                                onClick={() => setPenType('brush')}
                                className={`flex-1 p-3 border-2 rounded-lg transition-colors flex items-center justify-center ${
                                    penType === 'brush'
                                        ? 'bg-[#F7F7F7] border-[#5542F6]'
                                        : 'bg-white border-[#E4E7EC] hover:bg-[#F7F8FA]'
                                }`}
                            >
                                <Paintbrush 
                                    size={30} 
                                    className="shrink-0" 
                                    color={penType === 'brush' ? '#5542F6' : '#84818A'} 
                                />
                            </button>
                        </div>
                    </div>

                    {/* Boldness Slider */}
                    <div>
                        <label className="block text-sm font-semibold text-[#24282E] mb-2">Boldness</label>
                        <input
                            ref={boldnessSliderRef}
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            value={boldness}
                            onChange={(e) => setBoldness(Number(e.target.value))}
                            className="range-slider"
                        />
                    </div>

                    {/* Pick Color */}
                    <div>
                        <label className="block text-sm font-semibold text-[#24282E] mb-2">Pick Color</label>
                        <div className="flex gap-2">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                                        selectedColor === color
                                            ? 'border-[#5542F6] scale-110'
                                            : 'border-[#E4E7EC] hover:border-[#D1CEFF]'
                                    }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Undo/Redo Buttons */}
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={handleUndo}
                            disabled={!canUndo}
                            className={`p-2 rounded-lg border-2 transition-colors ${
                                canUndo
                                    ? 'border-[#E4E7EC] hover:bg-[#F7F8FA] text-[#24282E]'
                                    : 'border-[#E4E7EC] opacity-50 cursor-not-allowed text-[#727A90]'
                            }`}
                        >
                            <Undo2 
                                size={20} 
                                className={canUndo ? 'text-[#24282E]' : 'text-[#727A90]'} 
                            />
                        </button>
                        <button
                            onClick={() => {}}
                            disabled={!canRedo}
                            className={`p-2 rounded-lg border-2 transition-colors ${
                                canRedo
                                    ? 'border-[#E4E7EC] hover:bg-[#F7F8FA] text-[#24282E]'
                                    : 'border-[#E4E7EC] opacity-50 cursor-not-allowed text-[#727A90]'
                            }`}
                        >
                            <Redo2 
                                size={20} 
                                className={canRedo ? 'text-[#24282E]' : 'text-[#727A90]'} 
                            />
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2.5 border-2 border-[#E4E7EC] rounded-lg text-[#24282E] font-medium hover:bg-[#F7F8FA] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-[#5542F6] text-white rounded-lg font-medium hover:bg-[#4535D6] transition-colors"
                    >
                        Save Signature
                    </button>
                </div>
            </div>
        </div>
    );
}

