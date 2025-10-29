'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import AppLayout from '../../components/Layout/AppLayout';
import FeaturesBar from '../../components/FeaturesBar/page';
import AiSvg from '@/components/Svgs/AiSvg';
export default function AIAssistancePage() {
    const [showFeatures, setShowFeatures] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    type AssistantMessage =
        | { id: number; role: 'assistant'; kind: 'buttons'; text: string; buttons: string[] }
        | { id: number; role: 'assistant'; kind: 'form'; title: string; imgSrc: string };

    type ChatMessage =
        | { id: number; role: 'user'; text: string }
        | AssistantMessage;

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            role: 'assistant',
            kind: 'buttons',
            text: 'Hello! there, You can select the context you want in this short form , like what fields you want here?',
            buttons: ['+ Email Address', '+ Phone Number', '+ Budget']
        }
    ]);

    const handleSend = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1;
        const userMsg: ChatMessage = { id: nextId, role: 'user', text: trimmed };

        // Two-response bot: buttons then form card, then repeat form for subsequent messages
        const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant') as AssistantMessage | undefined;
        let botMsg: AssistantMessage;
        if (!lastAssistant || lastAssistant.kind === 'form') {
            botMsg = {
                id: nextId + 1,
                role: 'assistant',
                kind: 'buttons',
                text:
                    'Hello! there, You can select the context you want in this short form , like what fields you want here?',
                buttons: ['+ Email Address', '+ Phone Number', '+ Budget']
            };
        } else {
            botMsg = {
                id: nextId + 1,
                role: 'assistant',
                kind: 'form',
                title: 'Okay here is the short form for you',
                imgSrc: '/images/form.png'
            };
        }

        setMessages((prev) => [...prev, userMsg, botMsg]);
        setInputValue('');
    };
    return (
        <AppLayout activeKey="ai-assistant" contentClassName="h-[calc(100vh-64px)] overflow-hidden">
            {/* Top bar: breadcrumbs + title + settings button */}
            <div className="flex items-center justify-between mt-4">
                <div>
                    <div className="text-sm text-[#727A90]">Home / <span className="text-[#24282E]">AI Assistant</span></div>
                    <h1 className="text-[28px] font-semibold text-[#24282E] mt-2">AI Assistant</h1>
                </div>
                <button onClick={() => setShowFeatures(true)} className="inline-flex items-center gap-2 bg-white border border-[#E4E7EC] rounded-md px-3 py-2 text-sm font-semibold text-[#24282E] hover:bg-[#F7F8FA]">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9853 7.02667C11.012 6.82667 11.0253 6.62 11.0253 6.4C11.0253 6.18667 11.012 5.97333 10.9787 5.77333L12.332 4.72C12.452 4.62667 12.4853 4.44667 12.412 4.31333L11.132 2.1C11.052 1.95333 10.8853 1.90667 10.7387 1.95333L9.14533 2.59333C8.812 2.34 8.45867 2.12667 8.06533 1.96667L7.82533 0.273333C7.79867 0.113333 7.66533 0 7.50533 0H4.94533C4.78533 0 4.65867 0.113333 4.632 0.273333L4.392 1.96667C3.99867 2.12667 3.63867 2.34667 3.312 2.59333L1.71867 1.95333C1.572 1.9 1.40533 1.95333 1.32533 2.1L0.0520002 4.31333C-0.0279998 4.45333 -0.00133318 4.62667 0.132 4.72L1.48533 5.77333C1.452 5.97333 1.42533 6.19333 1.42533 6.4C1.42533 6.60667 1.43867 6.82667 1.472 7.02667L0.118667 8.08C-0.00133317 8.17333 -0.0346664 8.35333 0.0386669 8.48667L1.31867 10.7C1.39867 10.8467 1.56533 10.8933 1.712 10.8467L3.30533 10.2067C3.63867 10.46 3.992 10.6733 4.38533 10.8333L4.62533 12.5267C4.65867 12.6867 4.78533 12.8 4.94533 12.8H7.50533C7.66533 12.8 7.79867 12.6867 7.81867 12.5267L8.05867 10.8333C8.452 10.6733 8.812 10.46 9.13867 10.2067L10.732 10.8467C10.8787 10.9 11.0453 10.8467 11.1253 10.7L12.4053 8.48667C12.4853 8.34 12.452 8.17333 12.3253 8.08L10.9853 7.02667ZM6.22533 8.8C4.90533 8.8 3.82533 7.72 3.82533 6.4C3.82533 5.08 4.90533 4 6.22533 4C7.54533 4 8.62533 5.08 8.62533 6.4C8.62533 7.72 7.54533 8.8 6.22533 8.8Z" fill="#2E2C34" />
                    </svg>
                    <span>AI Settings</span>
                </button>
            </div>

            {/* Conversation area */}
            {/* Chat container: messages scroll, input fixed at bottom */}
            <div className="mt-4 flex flex-col flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto space-y-4  pr-6">
                {messages.map((m) => {
                    if (m.role === 'user') {
                        return (
                            <div key={m.id} className="flex justify-end">
                                <div className="bg-primary text-white max-w-[70%] rounded-md px-3 py-2 text-sm">{m.text}</div>
                            </div>
                        );
                    }
                    // assistant
                    return (
                        <div key={m.id} className="flex justify-start">
                            <div className="w-7 h-7 rounded-full overflow-hidden mr-2 shrink-0 mt-0.5 bg-linear-to-br from-[#7B61FF] to-[#C33DF0] grid place-items-center">
                                <AiSvg />
                            </div>
                            {m.kind === 'buttons' ? (
                                <div className="bg-white text-[#24282E] border border-[#E4E7EC] max-w-[80%] rounded-md px-4 py-3 text-sm">
                                    <div className="mb-3 leading-relaxed">{m.text}</div>
                                    <div className="flex flex-wrap gap-3">
                                        {m.buttons.map((b, i) => (
                                            <span key={i} className="px-4 py-2 bg-white border border-[#E4E7EC] rounded-md text-sm text-[#24282E]">
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white text-[#24282E] border border-[#E4E7EC] rounded-md p-4">
                                    <div className="text-xl font-semibold mb-4">{m.title}</div>
                                    <Image src={m.imgSrc} alt="Form preview" width={240} height={240} className="rounded-md border  border-[#E4E7EC] w-auto h-auto" />
                                </div>
                            )}
                        </div>
                    );
                })}
                </div>
            

            {/* Input area */}
            <div className="mt-3">
                <div className="bg-white border border-[#E4E7EC] rounded-lg h-40 p-4 flex flex-col">
                    {/* Command preview when input begins with a slash */}
                    {inputValue.trim().startsWith('/') && (
                        <div className="mb-2">
                            {(() => {
                                const raw = inputValue.trim();
                                const hotMatch = raw.match(/\(([^)]+)\)/);
                                const hot = hotMatch ? hotMatch[1] : '';
                                const afterSlash = raw.replace(/^\/?\s*/, '').replace(/\([^)]*\)/, '').trim();
                                const words = afterSlash.split(/\s+/);
                                const first = words[0] || '';
                                const rest = words.slice(1).join(' ');
                                return (
                                    <div className="text-base">
                                        <span className="text-primary">/</span>
                                        <span className="text-[#24282E] ml-1">{first}</span>
                                        {rest && <span className="text-primary ml-1">{rest}</span>}
                                        {hot && <span className="text-primary ml-1">({hot})</span>}
                                    </div>
                                );
                            })()}
                        </div>
                    )}
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Say Hello"
                        className={`w-full resize-none outline-none text-md placeholder-[#9AA0A6] flex-1 ${
                            inputValue.trim().startsWith('/') ? 'text-transparent caret-[#24282E]' : 'text-[#24282E]'
                        }`}
                    />
                    <div className="mt-3 flex justify-end">
                        <button onClick={handleSend} className="h-10 px-3 bg-primary text-white rounded-md inline-flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.34065 14L15.334 8L1.34065 2L1.33398 6.66667L11.334 8L1.33398 9.33333L1.34065 14Z" fill="#FBFAFC" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            </div>

            {/* Right-side Features drawer */}
            <div className={`fixed inset-0 z-70 pointer-events-none`}>
                <div className={`absolute top-0 right-0 h-full transition-transform duration-200 ${showFeatures ? 'translate-x-0' : 'translate-x-full'} pointer-events-auto`}>
                    <div className="h-full w-[380px] p-4 flex">
                        <div className="h-full w-full">
                            <FeaturesBar
                                onPick={(text) => {
                                    setInputValue(text);
                                    setShowFeatures(false);
                                    setTimeout(() => inputRef.current?.focus(), 0);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showFeatures && (
                <button
                    aria-label="Close features"
                    onClick={() => setShowFeatures(false)}
                    className="fixed inset-0 bg-black/25 backdrop-blur-sm cursor-default z-60"
                />
            )}
        </AppLayout>
    );
}


