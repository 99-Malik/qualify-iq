'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react';

export default function OnBoarding() {
    const router = useRouter();

    const handlePlayVideo = () => {
        console.log('Playing video');
        // Handle video play
    };

    const handleSkipToDashboard = () => {
        router.push('/on-boarding/subscription');
    };

  return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="flex justify-center pt-8 pb-4">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">IQ</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#3A3541]">Qualify IQ</h1>
                </div>
            </div>

            {/* Main Card */}
            <div className="flex-1 flex justify-center px-6 py-8">
                <div className="w-full max-w-6xl">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-primary">
                        <div className="h-[600px] bg-gray-300 relative flex items-center justify-center">
                            {/* Video Play Button */}
                            <button
                                onClick={handlePlayVideo}
                                className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
                            >
                                <Play className="w-16 h-16 text-primary ml-2" fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Welcome Section */}
            <div className="text-center pb-8 px-6">
                <h2 className="text-3xl font-bold text-[#3A3541] mb-4">
                    Welcome to QualifIQ Let's take a tour!
                </h2>
                <p className="text-[#3A3541] mb-8 max-w-2xl mx-auto">
                    Welcome to QualifIQ! We're excited to have you here. Join us for an in-depth tour where you'll discover all the amazing features and tools we offer to enhance your experience.
                </p>
                
                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handlePlayVideo}
                        className="bg-primary text-white px-16 py-3 rounded-sm font-medium hover:bg-primary-hover transition-colors"
                    >
                        Play Video
                    </button>
                    <button
                        onClick={handleSkipToDashboard}
                        className="bg-[#FBFAFC] border border-[#E3E1E5] text-black px-8 py-3 rounded-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        Skip/Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}