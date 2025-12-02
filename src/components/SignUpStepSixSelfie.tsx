'use client';

import { AuthService } from '@/lib/authService';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function SignUpStepSixSelfie() {
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [errors, setErrors] = useState({ selfie: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } // Front camera
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please allow camera permissions or upload a photo instead.');
      setIsCapturing(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  };

  const flipCamera = async () => {
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: { exact: 'environment' } } // Back camera
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      // If back camera fails, try front again
      startCamera();
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
        setSelfieImage(file);
        setPreviewUrl(URL.createObjectURL(blob));
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelfieImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        stopCamera();
      } else {
        alert('Please upload an image file.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ selfie: '' });
    
    // Validate
    if (!selfieImage) {
      setErrors({ selfie: 'Please take a selfie or upload a photo.' });
      return;
    }

    try {
      const result = await AuthService.saveFaceImage(selfieImage);
      if (result.success) {
        router.push('/signup/step-7');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error saving face image:', error);
      alert('Failed to upload selfie. Please try again.');
    }
  };

  const handleBack = () => {
    stopCamera();
    router.push('/signup/step-5');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-3" style={{ backgroundColor: '#A0C8A9' }}>
          <svg className="w-7 h-7" style={{ color: '#1E2E23' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2" style={{ color: '#1E2E23' }}>Take a Selfie</h1>
        <p className="text-sm text-gray-600">Please take a clear photo of your face for verification</p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A0C8A9' }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selfie Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Selfie Photo <span className="text-red-500">*</span>
          </label>
          
          {!previewUrl && !isCapturing && (
            <div className="border-2 border-gray-300 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#A0C8A9' }}>
                  <svg className="w-8 h-8" style={{ color: '#1E2E23' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-white text-sm mb-2"
                    style={{ backgroundColor: '#A0C8A9' }}
                  >
                    Open Camera
                  </button>
                  <p className="text-xs text-gray-500 mb-2">or</p>
                  <label className="inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer text-sm" style={{ backgroundColor: '#A0C8A9', color: '#1E2E23' }}>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      capture="user"
                      onChange={handleFileUpload}
                    />
                    Upload Photo
                  </label>
                </div>
              </div>
            </div>
          )}

          {isCapturing && !previewUrl && (
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover"
                style={{ backgroundColor: '#000' }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-64 border-2 border-white rounded-lg"></div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={flipCamera}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Flip Camera
                </button>
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-white text-sm"
                  style={{ backgroundColor: '#A0C8A9' }}
                >
                  Take Photo
                </button>
              </div>
            </div>
          )}

          {previewUrl && (
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden relative">
              <img
                src={previewUrl}
                alt="Selfie preview"
                className="w-full h-64 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  setSelfieImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Remove
              </button>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          {errors.selfie && (
            <div className="mt-1.5 flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.selfie}
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
            style={{ backgroundColor: '#A0C8A9' }}
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

