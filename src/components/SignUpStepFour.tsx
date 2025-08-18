'use client';

import { AuthService } from '@/lib/authService';
import { useRouter } from 'next/navigation';

import { useEffect, useRef, useState } from 'react';

export default function SignUpStepFour() {

  const [primaryDocumentType, setPrimaryDocumentType] = useState('');
  const [secondaryDocumentType, setSecondaryDocumentType] = useState('');
  const [primaryDocument, setPrimaryDocument] = useState<File | null>(null);
  const [secondaryDocument, setSecondaryDocument] = useState<File | null>(null);
  const [showPrimaryDropdown, setShowPrimaryDropdown] = useState(false);
  const [showSecondaryDropdown, setShowSecondaryDropdown] = useState(false);
  const [errors, setErrors] = useState({ primaryDocumentType: '', secondaryDocumentType: '', primaryDocument: '', secondaryDocument: '' });
  const router = useRouter();

  const primaryDropdownRef = useRef<HTMLDivElement>(null);
  const secondaryDropdownRef = useRef<HTMLDivElement>(null);

  const documentTypes = [
    'Passport', 'National ID Card', 'Driver License', 'Birth Certificate', 
    'Social Security Card', 'Military ID', 'Student ID', 'Work Permit'
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (primaryDropdownRef.current && !primaryDropdownRef.current.contains(event.target as Node)) {
        setShowPrimaryDropdown(false);
      }
      if (secondaryDropdownRef.current && !secondaryDropdownRef.current.contains(event.target as Node)) {
        setShowSecondaryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePrimaryDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPrimaryDropdown(!showPrimaryDropdown);
  };

  const toggleSecondaryDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSecondaryDropdown(!showSecondaryDropdown);
  };

  const selectPrimaryDocumentType = (type: string) => {
    setPrimaryDocumentType(type);
    setShowPrimaryDropdown(false);
  };

  const selectSecondaryDocumentType = (type: string) => {
    setSecondaryDocumentType(type);
    setShowSecondaryDropdown(false);
  };

  const handlePrimaryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrimaryDocument(file);
    }
  };

  const handleSecondaryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSecondaryDocument(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors

    setErrors({ primaryDocumentType: '', secondaryDocumentType: '', primaryDocument: '', secondaryDocument: '' });
    
    // Validate fields

    const newErrors = { primaryDocumentType: '', secondaryDocumentType: '', primaryDocument: '', secondaryDocument: '' };
    
    if (!primaryDocumentType.trim()) {
      newErrors.primaryDocumentType = 'Please select a primary document type.';
    }
    
    if (!primaryDocument) {
      newErrors.primaryDocument = 'Please upload your primary identity document.';
    }
    
    if (!secondaryDocumentType.trim()) {
      newErrors.secondaryDocumentType = 'Please select a secondary document type.';
    }
    
    if (!secondaryDocument) {
      newErrors.secondaryDocument = 'Please upload your secondary identity document.';
    }
    
    if (newErrors.primaryDocumentType || newErrors.primaryDocument || newErrors.secondaryDocumentType || newErrors.secondaryDocument) {
      setErrors(newErrors);
      return;
    }
    

    try {
      const result = await AuthService.saveKycDocuments({
        primaryDocumentType,
        primaryDocument: primaryDocument as File,
        secondaryDocumentType,
        secondaryDocument: secondaryDocument as File,
      });
      if (result.success) {
        router.push('/signup/step-5');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error saving KYC docs:', error);
      alert('Failed to upload documents. Please try again.');
    }
  };

  const handleBack = () => {
    router.push('/signup/step-3');
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

        <h1 className="text-xl font-bold text-gray-900 mb-2" style={{ color: '#1E2E23' }}>Just checking you're not a bot!</h1>
        <p className="text-sm text-gray-600">Please upload a government-issued proof of identity</p>
      </div>


      {/* Progress Dots */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Primary Document Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Primary Document</h3>
          
          {/* Document Type Field */}
          <div className="relative" ref={primaryDropdownRef}>
            <label htmlFor="primaryDocumentType" className="block text-sm font-medium text-gray-700 mb-1.5">
              Document Type <span className="text-red-500">*</span>
          </label>

            <button
              type="button"
              onClick={togglePrimaryDropdown}
              className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-left text-sm flex items-center justify-between focus:ring-2 focus:ring-green-200 focus:border-green-500"
            >
              <span className={primaryDocumentType ? 'text-black font-medium' : 'text-gray-500'}>
                {primaryDocumentType || 'Choose document type'}
              </span>
              <svg 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showPrimaryDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Document Type Dropdown */}
            {showPrimaryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-400 rounded-lg shadow-2xl z-[9999] max-h-48 overflow-y-auto">
                {documentTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => selectPrimaryDocumentType(type)}
                    className="w-full px-3 py-2.5 text-left text-sm text-black hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200 last:border-b-0 focus:bg-gray-100 focus:outline-none font-medium"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
            {errors.primaryDocumentType && (
              <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>

                {errors.primaryDocumentType}
            </div>
          )}
        </div>


          {/* Identity Document Upload */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Identity Document <span className="text-red-500">*</span>
            </label>

            <div className="border-2 border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200">
              <div className="flex flex-col items-center space-y-3">
                <svg className="w-12 h-12" style={{ color: '#1E2E23' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="text-sm text-gray-600">
                  <p>Drag & drop your file here or</p>
                </div>
                <label className="inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer" style={{ backgroundColor: '#A0C8A9', color: '#1E2E23' }}>
            <input

                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handlePrimaryFileUpload}
                  />
                  Upload
                </label>
                {primaryDocument && (
                  <p className="text-sm text-green-600 font-medium">✓ {primaryDocument.name}</p>
                )}
              </div>
            </div>
            {errors.primaryDocument && (
              <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.primaryDocument}
              </div>
            )}
          </div>
        </div>

        {/* Secondary Document Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Secondary Document</h3>
          
          {/* Secondary Document Type Field */}
          <div className="relative" ref={secondaryDropdownRef}>
            <label htmlFor="secondaryDocumentType" className="block text-sm font-medium text-gray-700 mb-1.5">
              Secondary Document Type <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={toggleSecondaryDropdown}
              className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-left text-sm flex items-center justify-between focus:ring-2 focus:ring-green-200 focus:border-green-500"
            >
              <span className={secondaryDocumentType ? 'text-black font-medium' : 'text-gray-500'}>
                {secondaryDocumentType || 'Choose secondary document type'}
              </span>
              <svg 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showSecondaryDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Secondary Document Type Dropdown */}
            {showSecondaryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-400 rounded-lg shadow-2xl z-[9999] max-h-48 overflow-y-auto">
                {documentTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => selectSecondaryDocumentType(type)}
                    className="w-full px-3 py-2.5 text-left text-sm text-black hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200 last:border-b-0 focus:bg-gray-100 focus:outline-none font-medium"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
            {errors.secondaryDocumentType && (
              <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>

                {errors.secondaryDocumentType}
              </div>
            )}
          </div>
          

          {/* Secondary Identity Document Upload */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Secondary Identity Document <span className="text-red-500">*</span>
            </label>

            <div className="border-2 border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200">
              <div className="flex flex-col items-center space-y-3">
                <svg className="w-12 h-12" style={{ color: '#1E2E23' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="text-sm text-gray-600">
                  <p>Drag & drop your secondary file here or</p>
                </div>
                <label className="inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer" style={{ backgroundColor: '#A0C8A9', color: '#1E2E23' }}>
            <input

                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleSecondaryFileUpload}
                  />
                  Upload
                </label>
                {secondaryDocument && (
                  <p className="text-sm text-green-600 font-medium">✓ {secondaryDocument.name}</p>
                )}
              </div>
            </div>
            {errors.secondaryDocument && (
              <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>

                {errors.secondaryDocument}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleBack}

            className="flex-1 py-2.5 px-5 rounded-lg font-medium transition-colors duration-200 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
          >
            Back
          </button>
          
          <button
            type="submit"

            className="flex-1 py-2.5 px-5 rounded-lg font-semibold transition-colors duration-200 text-white text-sm"
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

            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

