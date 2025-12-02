'use client';

import { AuthService } from '@/lib/authService';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SignUpStepSix() {
  const [signature, setSignature] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({ signature: '', terms: '' });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size and styling
    ctx.strokeStyle = '#1E2E23';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Update signature state
    setSignature('signed');
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ signature: '', terms: '' });
    
    // Validate fields
    const newErrors = { signature: '', terms: '' };
    
    if (!signature) {
      newErrors.signature = 'Please provide your digital signature.';
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions.';
    }
    
    if (newErrors.signature || newErrors.terms) {
      setErrors(newErrors);
      return;
    }

    try {
      // Save step 6 data using auth service
      const result = await AuthService.submitKyc();

      if (result.success) {
        // Navigate to step 8 (success page)
        router.push('/signup/step-8');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error saving step 6 data:', error);
      alert('Failed to save your information. Please try again.');
    }
  };

  const handleBack = () => {
    router.push('/signup/step-6');
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
        <h1 className="text-xl font-bold text-gray-900 mb-2" style={{ color: '#1E2E23' }}>E-Signature</h1>
        <p className="text-sm text-gray-600">Please sign below to complete your verification</p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Digital Signature Input Area */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1.5">
            Digital Signature <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={280}
              height={120}
              className="w-full h-32 cursor-crosshair bg-white"
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
              onMouseMove={draw}
            />
          </div>
          {errors.signature && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.signature}
            </div>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div>
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              I agree to the{' '}
              <button type="button" className="text-blue-600 underline hover:text-blue-800">
                Terms and Conditions
              </button>
              {' '}and{' '}
              <button type="button" className="text-blue-600 underline hover:text-blue-800">
                Privacy Policy
              </button>
              <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.terms && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.terms}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={clearSignature}
            className="flex-1 py-2.5 px-5 rounded-lg font-medium transition-colors duration-200 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm bg-white"
          >
            Clear
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
            Submit KYC
          </button>
        </div>
      </form>
    </div>
  );
}
