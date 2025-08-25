'use client';

import { AuthService } from '@/lib/authService';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SignUpStepThree() {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [countryOfBirth, setCountryOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [errors, setErrors] = useState({ dateOfBirth: '', countryOfBirth: '', residentialAddress: '' });
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries = [
    'India', 'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Italy', 'Spain',
    'China', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia',
    'Brazil', 'Mexico', 'Argentina', 'Chile', 'South Africa', 'Nigeria', 'Egypt', 'Saudi Arabia', 'UAE', 'Turkey',
    'Russia', 'Ukraine', 'Poland', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark'
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

  const selectCountry = (country: string) => {
    setCountryOfBirth(country);
    setShowCountryDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ dateOfBirth: '', countryOfBirth: '', residentialAddress: '' });
    
    // Validate fields
    const newErrors = { dateOfBirth: '', countryOfBirth: '', residentialAddress: '' };
    
    if (!dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Please enter your date of birth.';
    }
    
    if (!countryOfBirth.trim()) {
      newErrors.countryOfBirth = 'Please select your country of birth.';
    }
    
    if (!residentialAddress.trim()) {
      newErrors.residentialAddress = 'Please enter your residential address.';
    }
    
    if (newErrors.dateOfBirth || newErrors.countryOfBirth || newErrors.residentialAddress) {
      setErrors(newErrors);
      return;
    }
    
    try {
      const result = await AuthService.saveStep3ToUsers({
        dob: dateOfBirth,
        gender,
        country_of_birth: countryOfBirth,
        residential_address: residentialAddress,
      });

      if (result.success) {
        router.push('/signup/step-4');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error saving step 3:', error);
      alert('Failed to save your information. Please try again.');
    }
  };

  const handleBack = () => {
    router.push('/signup/step-2');
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
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date of Birth Field */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1.5">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 text-sm"
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
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          {errors.dateOfBirth && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.dateOfBirth}
            </div>
          )}
        </div>

        {/* Country of Birth Field */}
        <div className="relative" ref={dropdownRef}>
          <label htmlFor="countryOfBirth" className="block text-sm font-medium text-gray-700 mb-1.5">
            Country of Birth <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={toggleCountryDropdown}
            className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-left text-sm flex items-center justify-between focus:ring-2 focus:ring-green-200 focus:border-green-500"
          >
            <span className={countryOfBirth ? 'text-black font-medium' : 'text-gray-500'}>
              {countryOfBirth || 'Country Of Birth'}
            </span>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showCountryDropdown ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Country Dropdown */}
          {showCountryDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-400 rounded-lg shadow-2xl z-[9999] max-h-48 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => selectCountry(country)}
                  className="w-full px-3 py-2.5 text-left text-sm text-black hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200 last:border-b-0 focus:bg-gray-100 focus:outline-none font-medium"
                >
                  {country}
                </button>
              ))}
            </div>
          )}
          {errors.countryOfBirth && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.countryOfBirth}
            </div>
          )}
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Female</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={gender === 'Other'}
                onChange={(e) => setGender(e.target.value)}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">Other</span>
            </label>
          </div>
        </div>

        {/* Residential Address Field */}
        <div>
          <label htmlFor="residentialAddress" className="block text-sm font-medium text-gray-700 mb-1.5">
            Residential Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="residentialAddress"
            value={residentialAddress}
            onChange={(e) => setResidentialAddress(e.target.value)}
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
            placeholder="Residential Address"
            required
          />
          {errors.residentialAddress && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.residentialAddress}
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
