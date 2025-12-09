'use client';

interface ErrorDialogProps {
  title: string;
  message: string;
  onClose: () => void;
}

export default function ErrorDialog({ title, message, onClose }: ErrorDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Error Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4" style={{ backgroundColor: '#FEE2E2' }}>
            <svg className="w-8 h-8" style={{ color: '#DC2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
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

