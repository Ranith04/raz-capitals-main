'use client';

import { useEffect, useState } from 'react';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string | null;
  documentName: string;
  documentType?: string;
}

export default function DocumentViewer({
  isOpen,
  onClose,
  documentUrl,
  documentName,
  documentType
}: DocumentViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>('');

  useEffect(() => {
    if (documentUrl && isOpen) {
      setLoading(true);
      setError(null);
      
      // Determine file type from URL
      const urlLower = documentUrl.toLowerCase();
      if (urlLower.includes('.pdf')) {
        setFileType('pdf');
      } else if (urlLower.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/)) {
        setFileType('image');
      } else {
        setFileType('unknown');
      }
    }
  }, [documentUrl, isOpen]);

  if (!isOpen) return null;

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError('Failed to load document');
  };

  const handlePdfLoad = () => {
    setLoading(false);
  };

  const handlePdfError = () => {
    setLoading(false);
    setError('Failed to load PDF document');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2D4A32] rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#4A6741]">
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-lg sm:text-xl font-bold truncate">{documentName}</h3>
            {documentType && (
              <p className="text-[#9BC5A2] text-sm mt-1">{documentType}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-[#9BC5A2] hover:text-white hover:bg-[#4A6741] rounded-lg transition-colors"
            aria-label="Close viewer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-black/50">
          {!documentUrl ? (
            <div className="flex flex-col items-center justify-center h-full text-[#9BC5A2]">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg">No document URL available</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-red-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg mb-4">{error}</p>
              <a
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
              >
                Open in New Tab
              </a>
            </div>
          ) : fileType === 'pdf' ? (
            <div className="w-full h-full min-h-[400px]">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[#9BC5A2]">
                    <svg className="animate-spin h-8 w-8" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
              )}
              <iframe
                src={documentUrl}
                className="w-full h-full min-h-[600px] rounded-lg"
                onLoad={handlePdfLoad}
                onError={handlePdfError}
                title={documentName}
              />
            </div>
          ) : fileType === 'image' ? (
            <div className="flex items-center justify-center w-full h-full">
              {loading && (
                <div className="absolute flex items-center justify-center">
                  <div className="text-[#9BC5A2]">
                    <svg className="animate-spin h-8 w-8" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
              )}
              <img
                src={documentUrl}
                alt={documentName}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#9BC5A2]">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg mb-4">Unsupported file type</p>
              <a
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
              >
                Open in New Tab
              </a>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-t border-[#4A6741]">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          {documentUrl && (
            <a
              href={documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Open in New Tab</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

