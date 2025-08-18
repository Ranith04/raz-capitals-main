'use client';

import { AuthService } from '@/lib/authService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpStepSeven() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState({
    tradingExperience: '',
    investmentGoals: '',
    riskTolerance: 'medium'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!additionalInfo.tradingExperience.trim()) {
      alert('Please select your trading experience level.');
      return;
    }

    setIsLoading(true);

    try {
      // Save step 7 data using auth service
      const result = await AuthService.addStep7Data({
        tradingExperience: additionalInfo.tradingExperience,
        investmentGoals: additionalInfo.investmentGoals,
        riskTolerance: additionalInfo.riskTolerance
      });

      if (result.success) {
        // Navigate to final step
        router.push('/signup/final-step');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error saving step 7 data:', error);
      alert('Failed to save your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/signup/step-6');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-3" style={{ backgroundColor: '#A0C8A9' }}>
          <svg className="w-7 h-7" style={{ color: '#1E2E23' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2" style={{ color: '#1E2E23' }}>Trading Preferences</h1>
        <p className="text-sm text-gray-600">Help us customize your trading experience</p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Trading Experience */}
        <div>
          <label htmlFor="tradingExperience" className="block text-sm font-medium text-gray-700 mb-1.5">
            Trading Experience <span className="text-red-500">*</span>
          </label>
          <select
            id="tradingExperience"
            value={additionalInfo.tradingExperience}
            onChange={(e) => setAdditionalInfo(prev => ({ ...prev, tradingExperience: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white text-sm"
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
          >
            <option value="">Select your experience level</option>
            <option value="beginner">Beginner (0-1 years)</option>
            <option value="intermediate">Intermediate (1-3 years)</option>
            <option value="advanced">Advanced (3-5 years)</option>
            <option value="expert">Expert (5+ years)</option>
          </select>
        </div>

        {/* Investment Goals */}
        <div>
          <label htmlFor="investmentGoals" className="block text-sm font-medium text-gray-700 mb-1.5">
            Investment Goals
          </label>
          <select
            id="investmentGoals"
            value={additionalInfo.investmentGoals}
            onChange={(e) => setAdditionalInfo(prev => ({ ...prev, investmentGoals: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white text-sm"
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
          >
            <option value="">Select your primary goal</option>
            <option value="capital_growth">Capital Growth</option>
            <option value="income_generation">Income Generation</option>
            <option value="wealth_preservation">Wealth Preservation</option>
            <option value="speculation">Speculation</option>
            <option value="hedging">Hedging</option>
          </select>
        </div>

        {/* Risk Tolerance */}
        <div>
          <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700 mb-1.5">
            Risk Tolerance
          </label>
          <select
            id="riskTolerance"
            value={additionalInfo.riskTolerance}
            onChange={(e) => setAdditionalInfo(prev => ({ ...prev, riskTolerance: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white text-sm"
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
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
            <option value="very_aggressive">Very Aggressive</option>
          </select>
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
            disabled={isLoading}
            className="flex-1 py-2.5 px-5 rounded-lg font-semibold transition-colors duration-200 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: '#A0C8A9'
            }}
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
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              'Next'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
