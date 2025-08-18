'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpStepFive() {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankDocument, setBankDocument] = useState<File | null>(null);
  const [errors, setErrors] = useState({ bankName: '', accountNumber: '', ifscCode: '', bankDocument: '' });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ bankName: '', accountNumber: '', ifscCode: '', bankDocument: '' });
    
    // Validate fields
    const newErrors = { bankName: '', accountNumber: '', ifscCode: '', bankDocument: '' };
    
    if (!bankName.trim()) {
      newErrors.bankName = 'Please enter your bank name.';
    }
    
    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Please enter your account number.';
    }
    
    if (!ifscCode.trim()) {
      newErrors.ifscCode = 'Please enter your IFSC code.';
    }
    
    if (!bankDocument) {
      newErrors.bankDocument = 'Please upload your bank document.';
    }
    
    if (newErrors.bankName || newErrors.accountNumber || newErrors.ifscCode || newErrors.bankDocument) {
      setErrors(newErrors);
      return;
    }
    
    // Navigate to next step
    router.push('/signup/step-6');
  };

  const handleBack = () => {
    router.push('/signup/step-4');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBankDocument(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-auto">
      {/* Header with right-arrow icon */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-3" style={{ backgroundColor: '#A0C8A9' }}>
          <svg className="w-7 h-7" style={{ color: '#1E2E23' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2" style={{ color: '#1E2E23' }}>Bank Account Details</h1>
        <p className="text-sm text-gray-600">Please provide your bank account information.</p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bank Name Field */}
        <div>
          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Bank Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="bankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 text-sm"
            style={{ 
              color: '#111827', 
              backgroundColor: '#ffffff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#A0C8A9';
              e.target.style.boxShadow = '0 0 0 2px rgba(160, 200, 169, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="Bank Name"
            required
          />
          {errors.bankName && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.bankName}
            </div>
          )}
        </div>

        {/* Account Number Field */}
        <div>
          <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
            Account Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 text-sm"
            style={{ 
              color: '#111827', 
              backgroundColor: '#ffffff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#A0C8A9';
              e.target.style.boxShadow = '0 0 0 2px rgba(160, 200, 169, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="Account Number"
            required
          />
          {errors.accountNumber && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.accountNumber}
            </div>
          )}
        </div>

        {/* IFSC Code Field */}
        <div>
          <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1.5">
            IFSC Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ifscCode"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 text-sm"
            style={{ 
              color: '#111827', 
              backgroundColor: '#ffffff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#A0C8A9';
              e.target.style.boxShadow = '0 0 0 2px rgba(160, 200, 169, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="IFSC Code"
            required
          />
          {errors.ifscCode && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.ifscCode}
            </div>
          )}
        </div>

        {/* Bank Document Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Bank Document <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200">
            <div className="flex flex-col items-center space-y-3">
              <svg className="w-12 h-12" style={{ color: '#1E2E23' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="text-sm text-gray-600">
                <p>Upload Bank Document (Passbook/Statement)</p>
              </div>
              <label className="inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer" style={{ backgroundColor: '#A0C8A9', color: '#1E2E23' }}>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                />
                Upload
              </label>
              {bankDocument && (
                <p className="text-sm text-green-600 font-medium">✓ {bankDocument.name}</p>
              )}
            </div>
          </div>
          {errors.bankDocument && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.bankDocument}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 text-white text-sm"
            style={{ 
              backgroundColor: '#A0C8A9'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#8FB89A';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#A0C8A9';
            }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
