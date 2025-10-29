'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LeftSection from './Sections/LeftSection';
import Terms from './Sections/Terms';
import PhoneNumberPicker from "../PhoneNumberPicker/PhoneNumberPicker";
import { CountryCode } from "libphonenumber-js"; 
import { Mail, Phone, Eye, EyeOff } from "lucide-react"; 

export default function SignIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    email: 'maxbert22@email.com',
    password: '',
    phone: '+101 | 6651-6151-1',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['9', '9', '', '']);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handlePhoneChange = (value: string) => {
  //   setFormData((prev) => ({ ...prev, phone: value }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempt:', formData);
    router.push(`/sign-in/verify-otp?method=${activeTab}`);
  };

  const [phone, setPhone] = useState({
    iso: "AE" as CountryCode,
    dialCode: "+971",
    national: "",
    e164: ""
  });
    return (
        <div className="min-h-screen flex">
            {/* Left Section - Restaurant Image */}
            <LeftSection />

            {/* Right Section - Sign In Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-lg">IQ</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-[#24282E]">Qualify IQ</h1>
                    </div>

                    {/* Main Title */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-[#24282E] mb-2">Sign in</h2>
                        <p className="text-[#24282E]">
                            New user? <span className="text-primary cursor-pointer ml-1">Create an account</span>
                        </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="mb-6">
                        <div className="flex p-1 bg-white relative">
                            <button
                                type="button"
                                onClick={() => setActiveTab('email')}
                                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-colors relative ${
                                    activeTab === 'email'
                                        ? ' text-[#24282E]'
                                        : 'text-[#727A90] hover:text-[#24282E]'
                                }`}
                            >
                                {activeTab === 'email' ? (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
                                        <path d="M13.334 2.66602H2.66732C1.93398 2.66602 1.34065 3.26602 1.34065 3.99935L1.33398 11.9993C1.33398 12.7327 1.93398 13.3327 2.66732 13.3327H13.334C14.0673 13.3327 14.6673 12.7327 14.6673 11.9993V3.99935C14.6673 3.26602 14.0673 2.66602 13.334 2.66602ZM13.334 5.33268L8.00065 8.66602L2.66732 5.33268V3.99935L8.00065 7.33268L13.334 3.99935V5.33268Z" fill="#5542F6"/>
                                    </svg>
                                ) : (
                                    <Mail className="w-4 h-4 mr-2 text-[#727A90]" />
                                )}
                                <span className="font-medium">Via Email</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('phone')}
                                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-colors relative ${
                                    activeTab === 'phone'
                                        ? ' text-[#24282E]'
                                        : 'text-[#727A90] hover:text-[#24282E]'
                                }`}
                            >
                                {activeTab === 'phone' ? (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
                                        <path d="M4.41333 7.19333C5.37333 9.08 6.92 10.62 8.80667 11.5867L10.2733 10.12C10.4533 9.94 10.72 9.88 10.9533 9.96C11.7 10.2067 12.5067 10.34 13.3333 10.34C13.7 10.34 14 10.64 14 11.0067V13.3333C14 13.7 13.7 14 13.3333 14C7.07333 14 2 8.92667 2 2.66667C2 2.3 2.3 2 2.66667 2H5C5.36667 2 5.66667 2.3 5.66667 2.66667C5.66667 3.5 5.8 4.3 6.04667 5.04667C6.12 5.28 6.06667 5.54 5.88 5.72667L4.41333 7.19333Z" fill="#5542F6"/>
                                    </svg>
                                ) : (
                                    <Phone className="w-4 h-4 mr-2 text-[#727A90]" />
                                )}
                                <span className="font-medium">Via Phone Number</span>
                            </button>
                            {/* Single continuous bottom line */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E9EAEA]"></div>
                            {/* Active tab indicator */}
                            <div 
                                className={`absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ${
                                    activeTab === 'email' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'
                                }`}
                            ></div>
                        </div>
                    </div>

                    {/* Sign In Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {activeTab === 'email' ? (
                            <>
                                {/* Email Address */}
                        <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#727A90] mb-2">
                                        Email Address
                            </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors"
                                    placeholder="Enter your email"
                                />
                        </div>

                        {/* Password */}
                                <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#727A90] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                            className="w-full px-4 py-3 pr-12 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0] hover:text-[#727A90]"
                                >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                                    <div className="text-right mt-2">
                                        <span 
                                            className="text-primary text-sm cursor-pointer hover:underline"
                                            onClick={() => router.push('/sign-in/password-reset')}
                                        >
                                            Forgot password?
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Phone Number */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-[#727A90] mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border-b-2 border-[#E9EAEA] bg-transparent focus:outline-none focus:border-primary text-[#24282E] text-sm transition-colors"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                {/* OTP Verification */}
                                <div>
                                    <label className="block text-sm font-medium text-[#727A90] mb-2">
                                        OTP
                                    </label>
                                    <div className="flex justify-between mb-2 w-full">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                className="w-22 h-24 text-center border border-gray-200 bg-white focus:outline-none focus:border-primary text-[#24282E] text-4xl font-semibold transition-colors"
                                                maxLength={1}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-primary text-sm cursor-pointer hover:underline">Forgot OTP?</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Separator */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-[#E9EAEA]"></div>
                        <span className="px-4 text-[#A0A0A0] text-sm">or</span>
                        <div className="flex-1 h-px bg-[#E9EAEA]"></div>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                        type="button"
                        className="w-full bg-white border border-[#E9EAEA] text-[#24282E] py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign in with Google
                    </button>

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