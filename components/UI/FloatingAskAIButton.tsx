'use client';

import { useRouter } from 'next/navigation';

export default function FloatingAskAIButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push('/ai-assistance')}
      className="fixed bottom-24 right-12 bg-primary text-white rounded-md px-6 py-4 shadow-lg hover:bg-[#4535D6] transition-colors flex items-center gap-1 z-50"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.16602 2.3335V15.1668H11.666V25.6668L19.8327 11.6668H15.166L19.8327 2.3335H8.16602Z" fill="white" />
      </svg>

      <span className="font-medium text-md">Ask AI</span>
    </button>
  );
}

