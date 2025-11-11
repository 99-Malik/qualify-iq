'use client';

import React, { useState } from 'react';

interface ViewNotesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ViewNotesModal({
    isOpen,
    onClose,
}: ViewNotesModalProps) {
    const [activeTab, setActiveTab] = useState<'gemini' | 'transcript'>('gemini');
    const [copySuccess, setCopySuccess] = useState(false);

    const getContentText = () => {
        if (activeTab === 'gemini') {
            return `Summary
✨ Welcome to a New Era of Lead Generation! ✨ At Qualify IQ, we understand that generating leads efficiently is crucial for your business growth. This month, we're excited to introduce our innovative tools designed to simplify your lead generation process! 💡📈 Experience seamless integration with our user-friendly platform that allows you to capture and nurture leads like never before. From automated follow-ups to insightful analytics, we've got everything you need to elevate your sales strategy. 📊📈

Details
• Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce
• Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce

Suggested Next Steps
• Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce`;
        } else {
            return `00:00:00
John: "I'm currently developing a new mobile application aimed at simplifying personal finance management."
Emily: "That sounds interesting! How are you planning to address user privacy?"
Michael: "We're implementing robust encryption methods and giving users full control over their data."
Alice: "Have you conducted any user research yet to validate your concept?"
David: "Yes, we've held several focus groups and gathered valuable feedback that is shaping our design."
Sarah: "That's great to hear! What features are you most excited about?"

00:20:30
John: "I'm currently developing a new mobile application aimed at simplifying personal finance management."
Emily: "That sounds interesting! How are you planning to address user privacy?"
Michael: "We're implementing robust encryption methods and giving users full control over their data."`;
        }
    };

    const handleCopy = async () => {
        try {
            const content = getContentText();
            await navigator.clipboard.writeText(content);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownloadPDF = () => {
        const content = getContentText();
        
        // Create HTML content based on active tab
        let htmlContent = '';
        
        if (activeTab === 'gemini') {
            htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>View Notes - Gemini Notes</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #2E2C34; font-size: 20px; margin-bottom: 10px; }
                    h2 { color: #24282E; font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; }
                    p { color: #2E2C34; font-size: 12px; line-height: 1.6; }
                    ul { margin: 10px 0; padding-left: 20px; }
                    li { color: #2E2C34; font-size: 12px; margin: 5px 0; }
                </style>
            </head>
            <body>
                <h1>View Notes - Gemini Notes</h1>
                <h2>Summary</h2>
                <p>✨ Welcome to a New Era of Lead Generation! ✨ At Qualify IQ, we understand that generating leads efficiently is crucial for your business growth. This month, we're excited to introduce our innovative tools designed to simplify your lead generation process! 💡📈 Experience seamless integration with our user-friendly platform that allows you to capture and nurture leads like never before. From automated follow-ups to insightful analytics, we've got everything you need to elevate your sales strategy. 📊📈</p>
                <h2>Details</h2>
                <ul>
                    <li>Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce</li>
                    <li>Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce</li>
                </ul>
                <h2>Suggested Next Steps</h2>
                <ul>
                    <li>Lorem ipusm this month, we're excited to introduce our innovative tools designed to simplify your lead generation proce</li>
                </ul>
            </body>
            </html>
        `;
        } else {
            htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>View Notes - Transcript</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #2E2C34; font-size: 20px; margin-bottom: 20px; }
                    .timestamp { color: #24282E; font-size: 14px; font-weight: 500; margin-top: 20px; margin-bottom: 10px; }
                    p { color: #24282E; font-size: 12px; line-height: 1.6; margin: 5px 0; }
                </style>
            </head>
            <body>
                <h1>View Notes - Transcript</h1>
                <div class="timestamp">00:00:00</div>
                <p><strong>John:</strong> "I'm currently developing a new mobile application aimed at simplifying personal finance management."</p>
                <p><strong>Emily:</strong> "That sounds interesting! How are you planning to address user privacy?"</p>
                <p><strong>Michael:</strong> "We're implementing robust encryption methods and giving users full control over their data."</p>
                <p><strong>Alice:</strong> "Have you conducted any user research yet to validate your concept?"</p>
                <p><strong>David:</strong> "Yes, we've held several focus groups and gathered valuable feedback that is shaping our design."</p>
                <p><strong>Sarah:</strong> "That's great to hear! What features are you most excited about?"</p>
                
                <div class="timestamp">00:20:30</div>
                <p><strong>John:</strong> "I'm currently developing a new mobile application aimed at simplifying personal finance management."</p>
                <p><strong>Emily:</strong> "That sounds interesting! How are you planning to address user privacy?"</p>
                <p><strong>Michael:</strong> "We're implementing robust encryption methods and giving users full control over their data."</p>
            </body>
            </html>
        `;
        }

        // Create a blob and download
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = activeTab === 'gemini' ? 'gemini-notes.html' : 'transcript.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Try to print as PDF (browser's print to PDF)
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
            }, 250);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl my-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-start justify-between p-6 pb-4">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-[#2E2C34] mb-1">
                            View Notes
                        </h2>
                        <p className="text-md text-[#727A90] mb-3">
                            You can search and view the details of short form
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F8FA] transition-colors"
                    >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9997 2.33398C7.54801 2.33398 2.33301 7.54898 2.33301 14.0007C2.33301 20.4523 7.54801 25.6673 13.9997 25.6673C20.4513 25.6673 25.6663 20.4523 25.6663 14.0007C25.6663 7.54898 20.4513 2.33398 13.9997 2.33398ZM19.833 18.189L18.188 19.834L13.9997 15.6457L9.81134 19.834L8.16634 18.189L12.3547 14.0007L8.16634 9.81232L9.81134 8.16732L13.9997 12.3557L18.188 8.16732L19.833 9.81232L15.6447 14.0007L19.833 18.189Z" fill="#504F54" />
                        </svg>

                    </button>
                </div>

                <div className="px-6 pb-6">
                    <div className="flex items-center gap-6 mb-6 ">
                        <button
                            onClick={() => setActiveTab('gemini')}
                            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${activeTab === 'gemini'
                                ? 'text-[#24282E]'
                                : 'text-[#727A90] hover:text-[#24282E]'
                                }`}
                        >
                            Gemini Notes
                            {activeTab === 'gemini' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5542F6]"></span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('transcript')}
                            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${activeTab === 'transcript'
                                ? 'text-[#24282E]'
                                : 'text-[#727A90] hover:text-[#24282E]'
                                }`}
                        >
                            Transcript
                            {activeTab === 'transcript' && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5542F6]"></span>
                            )}
                        </button>
                    </div>

                    {activeTab === 'gemini' && (
                        <div className="bg-[#fbfafc] border border-[#E4E7EC] rounded-lg p-6 space-y-6 max-h-[500px] overflow-y-auto">
                            <div>
                                <h3 className="text-base font-bold text-[#24282E] mb-3">Summary</h3>
                                <p className="text-sm text-[#2E2C34] leading-relaxed">
                                    ✨ Welcome to a New Era of Lead Generation! ✨ At Qualify IQ, we understand that generating leads efficiently is crucial for your business growth. This month, we're excited to introduce our innovative tools designed to simplify your lead generation process! 💡📈 Experience seamless integration with our user-friendly platform that allows you to capture and nurture leads like never before. From automated follow-ups to insightful analytics, we've got everything you need to elevate your sales strategy. 📊📈
                                </p>
                            </div>

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
                    )}

                    {activeTab === 'transcript' && (
                        <div className="bg-[#fbfafc] border border-[#E4E7EC] rounded-lg p-6 max-h-[500px] overflow-y-auto">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-medium text-[#24282E] mb-3">00:00:00</p>
                                    <div className="space-y-2 text-sm text-[#24282E]">
                                        <p><strong>John:</strong> "I'm currently developing a new mobile application aimed at simplifying personal finance management."</p>
                                        <p><strong>Emily:</strong> "That sounds interesting! How are you planning to address user privacy?"</p>
                                        <p><strong>Michael:</strong> "We're implementing robust encryption methods and giving users full control over their data."</p>
                                        <p><strong>Alice:</strong> "Have you conducted any user research yet to validate your concept?"</p>
                                        <p><strong>David:</strong> "Yes, we've held several focus groups and gathered valuable feedback that is shaping our design."</p>
                                        <p><strong>Sarah:</strong> "That's great to hear! What features are you most excited about?"</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-[#24282E] mb-3">00:20:30</p>
                                    <div className="space-y-2 text-sm text-[#24282E]">
                                        <p><strong>John:</strong> "I'm currently developing a new mobile application aimed at simplifying personal finance management."</p>
                                        <p><strong>Emily:</strong> "That sounds interesting! How are you planning to address user privacy?"</p>
                                        <p><strong>Michael:</strong> "We're implementing robust encryption methods and giving users full control over their data."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 px-6 pb-6">
                    <button className="px-4 py-2.5 bg-white border border-[#E4E7EC] text-[#24282E] rounded-sm font-medium text-sm hover:bg-[#F7F8FA] transition-colors flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.333 1.33301H2.66634C1.93301 1.33301 1.33967 1.93301 1.33967 2.66634L1.33301 14.6663L3.99967 11.9997H13.333C14.0663 11.9997 14.6663 11.3997 14.6663 10.6663V2.66634C14.6663 1.93301 14.0663 1.33301 13.333 1.33301ZM3.99967 5.99967H11.9997V7.33301H3.99967V5.99967ZM9.33301 9.33301H3.99967V7.99967H9.33301V9.33301ZM11.9997 5.33301H3.99967V3.99967H11.9997V5.33301Z" fill="#2E2C34" />
                        </svg>

                        Ask AI Assistant
                    </button>
                    <button 
                        onClick={handleCopy}
                        className="px-4 py-2.5 bg-white border border-[#E4E7EC] text-[#24282E] rounded-sm font-medium text-sm hover:bg-[#F7F8FA] transition-colors"
                    >
                        {copySuccess ? 'Copied!' : 'Copy'}
                    </button>
                    <button 
                        onClick={handleDownloadPDF}
                        className="px-4 py-2.5 bg-[#5542F6] text-white rounded-sm font-medium text-sm hover:bg-[#4535D6] transition-colors"
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

