'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function DepositFundContent() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'Deposit Fund - RAZ CAPITALS';
  }, []);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="deposit-fund" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2E1D] p-4 flex justify-between items-center">
          <div 
            className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            onClick={() => router.push('/admin/dashboard')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0A2E1D] font-bold text-sm">A</span>
            </div>
            <span className="text-white font-medium">Admin</span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Deposit Fund Content (Live Account style) */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="bg-[#E5E7EB] rounded-xl p-6 shadow-sm border border-black/10">
            <h2 className="text-[#0A2E1D] text-2xl font-semibold mb-6">Deposit Finance</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">ID</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Tr.ID</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Date</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">User Name</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Email</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Payment Method</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Amount</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Currency</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Tr. Doc</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Status</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[#0A2E1D]">
                  {[
                    { id: 1, trId: 'TR-5JJEBPZ8G', date: '3/5/2025', name: 'Als6561', email: 'jhbeuc@gmail.com', method: 'USDT Deposit', amount: '681.00', currency: 'usd', doc: '-', status: 'Rejected' },
                    { id: 2, trId: 'TR-5JJEBPZ8G', date: '3/5/2025', name: 'jihadd651', email: 'bdbcu@gmail.com', method: 'USDT Deposit', amount: '66565', currency: 'usd', doc: '-', status: 'Approved' },
                    { id: 3, trId: 'TR-5JJEBPZ8G', date: '3/5/2025', name: 'hcbh6555', email: 'jwdsdchb@gmail.com', method: 'USDT Deposit', amount: '664684', currency: 'usd', doc: 'wert5rdgtrd', status: 'Approved' },
                    { id: 4, trId: 'TR-5JJEBPZ8G', date: '3/5/2025', name: 'Hisham7', email: 'kjidwnci@gmail.com', method: 'USDT Deposit', amount: '6516.0', currency: 'usd', doc: 'Cash Deposit to P2P', status: 'Approved' },
                    { id: 5, trId: 'TR-5JJEBPZ8G', date: '3/5/2025', name: 'Adam848', email: 'jhwdbe@gmail.com', method: 'USDT Deposit', amount: '681.00', currency: 'usd', doc: '123456789', status: 'Approved' },
                    { id: 6, trId: 'TR-5JJEBPZ8G', date: '3/5/2025', name: 'jihadd651', email: 'bdbcu@gmail.com', method: 'USDT Deposit', amount: '66565', currency: 'usd', doc: '-', status: 'Approved' },
                    { id: 7, trId: 'TR-5JJEBPZ8G', date: '3/5/2025', name: 'hcbh6555', email: 'jwdsdchb@gmail.com', method: 'USDT Deposit', amount: '664684', currency: 'usd', doc: 'wert5rdgtrd', status: 'Approved' },
                    { id: 8, trId: 'TR-5JJEBPZ8G', date: '3/5/2025', name: 'Hisham7', email: 'kjidwnci@gmail.com', method: 'USDT Deposit', amount: '6516.0', currency: 'usd', doc: 'Cash Deposit to P2P', status: 'Approved' },
                  ].map((row) => (
                    <tr key={row.id} className="border-b border-black/10 last:border-b-0">
                      <td className="py-4 pr-4">{row.id}</td>
                      <td className="py-4 pr-4">{row.trId}</td>
                      <td className="py-4 pr-4">{row.date}</td>
                      <td className="py-4 pr-4">{row.name}</td>
                      <td className="py-4 pr-4 text-[#0A2E1D] underline"><a href={`mailto:${row.email}`}>{row.email}</a></td>
                      <td className="py-4 pr-4">{row.method}</td>
                      <td className="py-4 pr-4">{row.amount}</td>
                      <td className="py-4 pr-4">{row.currency}</td>
                      <td className="py-4 pr-4">{row.doc}</td>
                      <td className="py-4 pr-4">
                        {row.status === 'Approved' ? (
                          <span className="inline-block bg-[#16a34a]/10 text-[#16a34a] text-xs px-3 py-1 rounded font-semibold">Approved</span>
                        ) : (
                          <span className="inline-block bg-[#dc2626]/10 text-[#dc2626] text-xs px-3 py-1 rounded font-semibold">Rejected</span>
                        )}
                      </td>
                      <td className="py-4 pr-4">
                        <button
                          aria-label="Settings"
                          className="h-8 w-8 rounded-full border border-[#0A2E1D] text-[#0A2E1D] flex items-center justify-center hover:bg-[#0A2E1D] hover:text-white transition-colors"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scroll to top button (bottom-right) */}
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

export default function DepositFundPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DepositFundContent />
    </ProtectedRoute>
  );
}