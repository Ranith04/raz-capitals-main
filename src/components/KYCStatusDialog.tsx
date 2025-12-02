'use client';

interface KYCStatusDialogProps {
  status: 'pending' | 'rejected' | 'verified';
  onClose: () => void;
}

export default function KYCStatusDialog({ status, onClose }: KYCStatusDialogProps) {
  const getStatusInfo = () => {
    switch (status) {
      case 'pending':
        return {
          title: 'KYC Verification Pending',
          message: 'Your KYC approval is yet pending. Please wait for admin verification to access all features.',
          icon: (
            <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          buttonColor: 'bg-yellow-500 hover:bg-yellow-600'
        };
      case 'rejected':
        return {
          title: 'KYC Verification Rejected',
          message: 'Your KYC verification has been rejected. Please contact support or resubmit your documents.',
          icon: (
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          buttonColor: 'bg-red-500 hover:bg-red-600'
        };
      case 'verified':
        return {
          title: 'KYC Verified',
          message: 'Your KYC verification is complete. You have full access to all features.',
          icon: (
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          buttonColor: 'bg-green-500 hover:bg-green-600'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full ${statusInfo.bgColor} border-2 ${statusInfo.borderColor}`}>
        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            {statusInfo.icon}
          </div>

          {/* Title */}
          <h2 className={`text-2xl font-bold text-center mb-3 ${statusInfo.textColor}`}>
            {statusInfo.title}
          </h2>

          {/* Message */}
          <p className={`text-center mb-6 ${statusInfo.textColor} text-base leading-relaxed`}>
            {statusInfo.message}
          </p>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 ${statusInfo.buttonColor} shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95`}
            >
              {status === 'verified' ? 'Continue' : 'I Understand'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

