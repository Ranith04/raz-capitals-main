'use client';

import { AuthService } from '@/lib/authService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignUpFinalStep() {
  const [isLoading, setIsLoading] = useState(false);
  const [stepData, setStepData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    // Load all step data from sessionStorage
    const userUuid = sessionStorage.getItem('signup_user_uuid');
    const email = sessionStorage.getItem('signup_email');
    const step2Data = JSON.parse(sessionStorage.getItem('signup_step2') || '{}');
    const step3Data = JSON.parse(sessionStorage.getItem('signup_step3') || '{}');
    const step4Data = JSON.parse(sessionStorage.getItem('signup_step4') || '{}');
    const step5Data = JSON.parse(sessionStorage.getItem('signup_step5') || '{}');
    const step6Data = JSON.parse(sessionStorage.getItem('signup_step6') || '{}');
    const step7Data = JSON.parse(sessionStorage.getItem('signup_step7') || '{}');

    setStepData({
      userUuid,
      email,
      step2: step2Data,
      step3: step3Data,
      step4: step4Data,
      step5: step5Data,
      step6: step6Data,
      step7: step7Data
    });

    // Check if user has completed all required steps
    if (!userUuid || !email || !step2Data.first_name) {
      alert('Please complete all previous steps first');
      router.push('/signup');
    }
  }, [router]);

  const handleCompleteRegistration = async () => {
    setIsLoading(true);

    try {
      const result = await AuthService.completeRegistration();

      if (result.success) {
        alert(result.message);
        // Redirect to dashboard or login
        router.push('/dashboard');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error completing registration:', error);
      alert('Failed to complete registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/signup/step-7');
  };

  const handleStartOver = () => {
    if (confirm('Are you sure you want to start over? All your data will be lost.')) {
      // Clear all sessionStorage
      sessionStorage.clear();
      router.push('/signup');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4" style={{ backgroundColor: '#A0C8A9' }}>
          <svg className="w-10 h-10" style={{ color: '#1E2E23' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ color: '#1E2E23' }}>Complete Your Registration</h1>
        <p className="text-gray-600">Review your information and complete your RAZ CAPITALS account</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="h-3 rounded-full transition-all duration-500" 
            style={{ 
              backgroundColor: '#A0C8A9',
              width: '100%'
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">Step 7 of 7 - Complete</p>
      </div>

      {/* Data Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Step 1: Account */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">Account Information</h4>
            <p className="text-sm text-gray-600">Email: {stepData.email}</p>
            <p className="text-sm text-gray-600">Status: Account Created ✓</p>
          </div>

          {/* Step 2: Basic Profile */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">Basic Profile</h4>
            <p className="text-sm text-gray-600">Name: {stepData.step2?.first_name} {stepData.step2?.middle_name} {stepData.step2?.last_name}</p>
            <p className="text-sm text-gray-600">Phone: {stepData.step2?.phone_no}</p>
          </div>

          {/* Step 3: Personal Details */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">Personal Details</h4>
            <p className="text-sm text-gray-600">DOB: {stepData.step3?.dob || 'Not provided'}</p>
            <p className="text-sm text-gray-600">Gender: {stepData.step3?.gender || 'Not provided'}</p>
          </div>

          {/* Step 4: Additional Info */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">Additional Information</h4>
            <p className="text-sm text-gray-600">Country: {stepData.step4?.country_of_birth || 'Not provided'}</p>
            <p className="text-sm text-gray-600">Address: {stepData.step4?.residential_address || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-3 text-sm text-blue-900">
            I agree to the{' '}
            <a href="/terms" className="underline hover:text-blue-700">Terms and Conditions</a>
            {' '}and{' '}
            <a href="/privacy" className="underline hover:text-blue-700">Privacy Policy</a>
            {' '}of RAZ CAPITALS
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex-1 py-3 px-6 rounded-lg font-medium transition-colors duration-200 border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        
        <button
          type="button"
          onClick={handleStartOver}
          className="flex-1 py-3 px-6 rounded-lg font-medium transition-colors duration-200 border border-red-300 text-red-700 hover:bg-red-50"
        >
          Start Over
        </button>
        
        <button
          type="button"
          onClick={handleCompleteRegistration}
          disabled={isLoading}
          className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#A0C8A9' }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#8FB89A';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#A0C8A9';
            }
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Completing Registration...
            </div>
          ) : (
            'Complete Registration'
          )}
        </button>
      </div>

      {/* Important Note */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex">
          <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-yellow-800">
            <p className="font-medium">Important:</p>
            <p>Please check your email to verify your account before proceeding. You may need to verify your email address to access all features.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
