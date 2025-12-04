'use client';

import { useActiveAccount } from '@/contexts/ActiveAccountContext';
import { useEffect, useState } from 'react';

interface TradingIDProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'card' | 'inline' | 'text';
}

export default function TradingID({ className = '', showLabel = true, variant = 'text' }: TradingIDProps) {
  const { activeAccount, loading } = useActiveAccount();
  const [tradingId, setTradingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return;
    }

    if (activeAccount) {
      setTradingId(activeAccount.account_uid);
      setError(null);
    } else {
      setTradingId(null);
      setError('No trading account found');
    }
    
    setIsLoading(false);
  }, [activeAccount, loading]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  if (variant === 'card') {
    return (
      <div className={`bg-[#2D4A35] text-white rounded-lg p-4 sm:p-6 ${className}`}>
        {showLabel && (
          <h3 className="text-sm text-[#A0C8A9] mb-2">Trading ID</h3>
        )}
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-[#4A6741] rounded w-32"></div>
          </div>
        ) : error ? (
          <p className="text-sm text-red-400">N/A</p>
        ) : tradingId ? (
          <div className="flex items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold">{tradingId}</div>
            <button
              onClick={() => copyToClipboard(tradingId)}
              className="text-[#A0C8A9] hover:text-white transition-colors"
              title="Copy Trading ID"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        ) : (
          <p className="text-sm text-[#A0C8A9]">N/A</p>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={className}>
        {isLoading ? (
          <span className="text-gray-400">Loading...</span>
        ) : error ? (
          <span className="text-gray-400">N/A</span>
        ) : tradingId ? (
          <div className="flex items-center space-x-2">
            {showLabel && <span className="text-sm text-gray-600">Trading ID:</span>}
            <span className="font-medium">{tradingId}</span>
            <button
              onClick={() => copyToClipboard(tradingId)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy Trading ID"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        ) : (
          <span className="text-gray-400">N/A</span>
        )}
      </div>
    );
  }

  // Default text variant
  return (
    <div className={className}>
      {isLoading ? (
        <span className="text-gray-400">Loading...</span>
      ) : error ? (
        <span className="text-gray-400">N/A</span>
      ) : tradingId ? (
        <span className="font-medium">{tradingId}</span>
      ) : (
        <span className="text-gray-400">N/A</span>
      )}
    </div>
  );
}

