'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

function TradeAccountDetailsContent() {
  const router = useRouter();
  const params = useSearchParams();

  const accountId = params.get('id');

  useEffect(() => {
    document.title = 'Trade Account Details - RAZ CAPITALS';
  }, []);

  // Placeholder account data. In a real implementation, fetch using accountId
  const account = {
    login: '7785642832',
    createdOn: '5/3/2025',
    name: 'Aslah',
    type: 'Diamond',
    leverage: '500',
    passwords: {
      trade: 'Forex@2255',
      investor: 'hjebcbnern@',
    },
    totals: {
      deposit: 6352.0,
      withdraw: 0,
      creditIn: 0,
      creditOut: 0,
    },
    funds: {
      balance: 5957.23,
      equity: 5957.23,
      credit: 5957.23,
      freeMargin: 5957.23,
    },
  };

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="live-accounts" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2E1D] p-4 flex justify-between items-center">
          <div
            className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            onClick={() => router.push('/admin/trade-accounts/live-accounts')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <div className="flex items-center space-x-1">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0A2E1D] font-bold text-sm">A</span>
            </div>
            <span className="text-white font-medium">Admin</span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-[#0A2E1D] text-3xl font-semibold mb-3">Trade Account Details{accountId ? ` #${accountId}` : ''}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-2">
            {/* Account Details (left, tall) */}
            <div className="bg-[#0B2417] text-white rounded-lg lg:row-span-2">
                <div className="px-2 py-0.5 bg-[#0A2E1D] rounded-t-lg font-semibold text-sm">Account Details</div>
                <div className="px-2 py-1.5">
                  <div className="h-px bg-white/10 mb-1" />
                  <div className="space-y-3 text-xl">
                    <div className="flex justify-between"><span className="opacity-80">Login</span><span>{account.login}</span></div>
                    <div className="flex justify-between"><span className="opacity-80">Account Created On</span><span>{account.createdOn}</span></div>
                    <div className="flex justify-between"><span className="opacity-80">Account Name</span><span>{account.name}</span></div>
                    <div className="flex justify-between"><span className="opacity-80">Account Type</span><span>{account.type}</span></div>
                    <div className="flex items-center justify-between">
                      <span className="opacity-80">Leverage</span>
                      <span className="flex items-center gap-1.5">
                        {account.leverage}
                        <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                          <path d="M19.4 15a1 1 0 00.2-1.1l-.6-1.1a8.1 8.1 0 000-2.6l.6-1.1a1 1 0 00-.2-1.1l-1.1-1.1a1 1 0 00-1.1-.2l-1.1.6a8.1 8.1 0 00-2.6 0l-1.1-.6a1 1 0 00-1.1.2L8.5 6.4a1 1 0 00-.2 1.1l.6 1.1a8.1 8.1 0 000 2.6l-.6 1.1a1 1 0 00.2 1.1l1.1 1.1a1 1 0 001.1.2l1.1-.6a8.1 8.1 0 002.6 0l1.1.6a1 1 0 001.1-.2l1.1-1.1z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
            </div>

            {/* Account Passwords (middle, top) */}
            <div className="bg-[#0B2417] text-white rounded-lg">
                <div className="px-2 py-1 bg-[#0A2E1D] rounded-t-lg font-semibold">Account Passwords</div>
                <div className="px-2 py-2">
                  <div className="h-px bg-white/10 mb-1" />
                  <div className="space-y-0.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="opacity-80">Trade Password</span>
                      <span className="flex items-center gap-1.5">{account.passwords.trade}
                        <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                          <path d="M19.4 15a1 1 0 00.2-1.1l-.6-1.1a8.1 8.1 0 000-2.6l.6-1.1a1 1 0 00-.2-1.1l-1.1-1.1a1 1 0 00-1.1-.2l-1.1.6a8.1 8.1 0 00-2.6 0l-1.1-.6a1 1 0 00-1.1.2L8.5 6.4a1 1 0 00-.2 1.1l.6 1.1a8.1 8.1 0 000 2.6l-.6 1.1a1 1 0 00.2 1.1l1.1 1.1a1 1 0 001.1.2l1.1-.6a8.1 8.1 0 002.6 0l1.1.6a1 1 0 001.1-.2l1.1-1.1z" />
                        </svg>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="opacity-80">Investor Password</span>
                      <span className="flex items-center gap-1.5">{account.passwords.investor}
                        <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                          <path d="M19.4 15a1 1 0 00.2-1.1l-.6-1.1a8.1 8.1 0 000-2.6l.6-1.1a1 1 0 00-.2-1.1l-1.1-1.1a1 1 0 00-1.1-.2l-1.1.6a8.1 8.1 0 00-2.6 0l-1.1-.6a1 1 0 00-1.1.2L8.5 6.4a1 1 0 00-.2 1.1l.6 1.1a8.1 8.1 0 000 2.6l-.6 1.1a1 1 0 00.2 1.1l1.1 1.1a1 1 0 001.1.2l1.1-.6a8.1 8.1 0 002.6 0l1.1.6a1 1 0 001.1-.2l1.1-1.1z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
            </div>

            {/* Account Funds Summary (right, tall) */}
            <div className="bg-[#0B2417] text-white rounded-lg lg:row-span-2">
                <div className="px-2 py-0.5 bg-[#0A2E1D] rounded-t-lg font-semibold text-sm">Account Funds</div>
                <div className="px-2 py-1.5">
                  <div className="h-px bg-white/10 mb-1" />
                  <div className="space-y-3 text-xl">
                    <div className="flex justify-between"><span className="opacity-80">Total Deposit</span><span className="font-medium">{account.totals.deposit.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="opacity-80">Total Withdraw</span><span>{account.totals.withdraw}</span></div>
                    <div className="flex justify-between"><span className="opacity-80">Total Credit In</span><span>{account.totals.creditIn}</span></div>
                    <div className="flex justify-between"><span className="opacity-80">Total Credit Out</span><span>{account.totals.creditOut}</span></div>
                  </div>
                </div>
              </div>

            {/* Trade Account Funds (middle, bottom) */}
            <div className="bg-[#0B2417] text-white rounded-lg">
                <div className="px-2 py-1 bg-[#0A2E1D] rounded-t-lg font-semibold">Trade Account Funds</div>
                <div className="px-2 py-2">
                  <div className="h-px bg-white/10 mb-1" />
                  <div className="grid grid-cols-2 gap-y-1 text-xs">
                    <div className="font-medium">Balance</div>
                    <div className="text-right">{account.funds.balance.toFixed(2)}</div>
                    <div className="font-medium">Equity</div>
                    <div className="text-right">{account.funds.equity.toFixed(2)}</div>
                    <div className="font-medium">Credit</div>
                    <div className="text-right">{account.funds.credit.toFixed(2)}</div>
                    <div className="font-medium">Free Margin</div>
                    <div className="text-right">{account.funds.freeMargin.toFixed(2)}</div>
                  </div>
                </div>
              </div>
          </div>

          {/* Scroll to top button */}
          <button
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#0A2E1D] text-white flex items-center justify-center shadow-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TradeAccountDetailsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <TradeAccountDetailsContent />
    </ProtectedRoute>
  );
}
