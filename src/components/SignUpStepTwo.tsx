'use client';

import { AuthService } from '@/lib/authService';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SignUpStepTwo() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [errors, setErrors] = useState({ firstName: '', lastName: '', phoneNumber: '' });
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+7', country: 'Russia' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+27', country: 'South Africa' },
    { code: '+971', country: 'UAE' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+65', country: 'Singapore' },
    { code: '+60', country: 'Malaysia' },
    { code: '+66', country: 'Thailand' },
    { code: '+84', country: 'Vietnam' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCountryDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCountryDropdown(!showCountryDropdown);
  };

  const selectCountryCode = (code: string) => {
    setCountryCode(code);
    setShowCountryDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ firstName: '', lastName: '', phoneNumber: '' });
    
    // Validate fields
    const newErrors = { firstName: '', lastName: '', phoneNumber: '' };
    
    if (!firstName.trim()) {
      newErrors.firstName = 'Please enter your first name.';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Please enter your last name.';
    }
    
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Please enter your phone number.';
    } else if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone number must be 10 digits.';
    }
    
    if (newErrors.firstName || newErrors.lastName || newErrors.phoneNumber) {
      setErrors(newErrors);
      return;
    }

    try {
      // Save step 2 data into users table keyed by user_uuid
      const result = await AuthService.saveStep2ToUsers({
        first_name: firstName.trim(),
        middle_name: middleName.trim() || undefined,
        last_name: lastName.trim(),
        phone_no: `${countryCode}${phoneNumber.trim()}`,
        country_code: countryCode
      });

      if (result.success) {
        // Navigate to step 3
        router.push('/signup/step-3');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error saving step 2 data:', error);
      alert('Failed to save your information. Please try again.');
    }
  };

  const handleBack = () => {
    router.push('/signup');
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
        <h1 className="text-xl font-bold text-gray-900 mb-2" style={{ color: '#1E2E23' }}>Need a few details to proceed</h1>
        <p className="text-sm text-gray-600">Let&apos;s get to know each other!</p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name Field */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            placeholder="First Name"
            required
          />
          {errors.firstName && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.firstName}
            </div>
          )}
        </div>

        {/* Middle Name Field */}
        <div>
          <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Middle Name
          </label>
          <input
            type="text"
            id="middleName"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
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
            placeholder="Middle Name"
          />
        </div>

        {/* Last Name Field */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            placeholder="Last Name"
            required
          />
          {errors.lastName && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.lastName}
            </div>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex" ref={dropdownRef}>
            <div className="relative">
              <button
                type="button"
                onClick={toggleCountryDropdown}
                className="flex items-center justify-between px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 min-w-[85px] cursor-pointer"
              >
                <span className="text-gray-700 font-medium text-sm">{countryCode}</span>
                <svg 
                  className={`w-4 h-4 ml-1.5 text-gray-500 transition-transform duration-200 ${showCountryDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Country Code Dropdown */}
              {showCountryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {countryCodes.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => selectCountryCode(country.code)}
                      className="w-full px-3 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-700 font-medium">{country.code}</span>
                      <span className="text-gray-500 text-xs">{country.country}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 px-3 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 text-sm"
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
              placeholder="Phone Number"
              maxLength={10}
              required
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500">Enter 10-digit mobile number (e.g., 9876543210)</p>
          {errors.phoneNumber && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.phoneNumber}
            </div>
          )}
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
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
