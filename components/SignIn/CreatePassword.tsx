'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LeftSection from './Sections/LeftSection';
import { Eye, EyeOff } from 'lucide-react';

export default function CreatePassword() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Setting new password:', formData);
        // Navigate to on-boarding page after successful password reset
        router.push('/on-boarding');
    };

    return (
        <div className="min-h-screen flex">
            <LeftSection />

            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="flex items-center justify-center mb-12">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-lg">IQ</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-[#24282E]">Qualify IQ</h1>
                    </div>
                    {/* Main Title */}
                    <div className="text-left mb-8">
                        <h2 className="text-4xl font-bold text-[#24282E] mb-4">Set New Password</h2>
                        <p className="text-[#24282E] text-base">
                            Set new password here and login to your account!
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Create New Password */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-[#727A90] mb-2">
                                Create New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 pr-12 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors"
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0] hover:text-[#727A90]"
                                >
                                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#727A90] mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 pr-12 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors"
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0] hover:text-[#727A90]"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Set Password Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary-hover transition-colors"
                        >
                            Set Password
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-[#24282E]">
                        <p>
                            Protected by reCAPTCHA and subject to the Google{' '}
                            <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>{' '}
                            and{' '}
                            <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 