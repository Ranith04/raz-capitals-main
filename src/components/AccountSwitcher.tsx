'use client';

import { useActiveAccount } from '@/contexts/ActiveAccountContext';
import { TradingAccount } from '@/types';
import { useState, useRef, useEffect } from 'react';

export default function AccountSwitcher() {
  const { activeAccount, accounts, setActiveAccount, loading } = useActiveAccount();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAccountSelect = (account: TradingAccount) => {
    setActiveAccount(account);
    setIsOpen(false);
    // Dispatch event to notify all components
    window.dispatchEvent(new CustomEvent('accountChanged', { detail: { accountUid: account.account_uid } }));
  };

  const formatAccountType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'real': 'Real Trading Account',
      'standard': 'Standard Trading Account',
      'premium': 'Premium Trading Account',
      'vip': 'VIP Trading Account',
      'demo': 'Demo Account',
      'demo_30': 'Demo Account (30 days)',
      'demo_60': 'Demo Account (60 days)',
      'demo_90': 'Demo Account (90 days)',
      'demo_unlimited': 'Demo Account (Unlimited)',
    };
    return typeMap[type] || 'Trading Account';
  };

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="relative">
        <div className="px-3 py-2 bg-[#2D4A35] text-white rounded-lg text-sm animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (!activeAccount || accounts.length === 0) {
    return null;
  }

  // Don't show switcher if user has only one account
  if (accounts.length <= 1) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-[#2D4A35] text-white rounded-lg hover:bg-[#3A5642] transition-colors text-sm"
        title="Switch Account"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="font-medium">{activeAccount.account_uid}</span>
        <span className="text-[#A0C8A9] text-xs">
          ({formatCurrency(activeAccount.balance || 0, activeAccount.currency)})
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
              Switch Account ({accounts.length} accounts)
            </div>
            {accounts.map((account) => {
              const isActive = account.account_uid === activeAccount.account_uid;
              return (
                <button
                  key={account.account_uid}
                  onClick={() => handleAccountSelect(account)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#A0C8A9]/20 border-2 border-[#A0C8A9]'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {formatAccountType(account.account_type)}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 bg-[#A0C8A9] text-[#0A2E1D] text-xs font-medium rounded">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Account: {account.account_uid}
                      </div>
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        Balance: {formatCurrency(account.balance || 0, account.currency)}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

