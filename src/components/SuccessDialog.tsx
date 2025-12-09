'use client';

import { useRouter } from 'next/navigation';

interface SuccessDialogProps {
  message: string;
  onClose: () => void;
}

export default function SuccessDialog({ message, onClose }: SuccessDialogProps) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push('/signin');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4" style={{ backgroundColor: '#D1FAE5' }}>
            <svg className="w-8 h-8" style={{ color: '#10B981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
          <p className="text-gray-600 text-sm whitespace-pre-line">{message}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClose}
          className="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 text-white"
          style={{ backgroundColor: '#A0C8A9' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#8FB89A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#A0C8A9';
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

