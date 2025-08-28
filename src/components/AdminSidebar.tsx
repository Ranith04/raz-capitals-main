'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AdminSidebarProps {
  currentPage?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function AdminSidebar({ currentPage = '', isMobileOpen = false, onMobileClose }: AdminSidebarProps) {
  const router = useRouter();
  const [isClientOperationExpanded, setIsClientOperationExpanded] = useState(false);
  const [isTradeAccountsExpanded, setIsTradeAccountsExpanded] = useState(false);
  const [isFundOperationExpanded, setIsFundOperationExpanded] = useState(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

  const toggleClientOperation = () => {
    setIsClientOperationExpanded(!isClientOperationExpanded);
  };

  const toggleTradeAccounts = () => {
    setIsTradeAccountsExpanded(!isTradeAccountsExpanded);
  };

  const toggleFundOperation = () => {
    setIsFundOperationExpanded(!isFundOperationExpanded);
  };

  const toggleSettings = () => {
    setIsSettingsExpanded(!isSettingsExpanded);
  };

  // Close mobile sidebar when clicking on a link
  const handleLinkClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#0A2E1D] flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Profile Section */}
        <div className="p-6 border-b border-[#9BC5A2]/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0A2E1D] font-bold text-lg">A</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Admin Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            <a 
              href="/admin/dashboard" 
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'dashboard' 
                  ? 'text-white bg-[#9BC5A2]/10' 
                  : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-medium">Dashboard</span>
            </a>
            
            <div className="space-y-1">
              <div 
                className="flex items-center space-x-3 px-4 py-3 text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10 rounded-lg transition-colors cursor-pointer"
                onClick={toggleClientOperation}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Client Operation</span>
                <svg 
                  className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                    isClientOperationExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Submenu with smooth transition */}
              <div 
                className={`ml-8 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  isClientOperationExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <a 
                  href="/admin/client-operations/new-client-list" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'new-client-list'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>New Client List</span>
                </a>
                <a 
                  href="/admin/client-operations/client-list" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'client-list'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>Client List</span>
                </a>
              </div>
            </div>

            <div className="space-y-1">
              <div 
                className="flex items-center space-x-3 px-4 py-3 text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10 rounded-lg transition-colors cursor-pointer"
                onClick={toggleTradeAccounts}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Trade Accounts</span>
                <svg 
                  className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                    isTradeAccountsExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Trade Accounts Submenu */}
              <div 
                className={`ml-8 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  isTradeAccountsExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <a 
                  href="/admin/trade-accounts/live-accounts" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'live-accounts'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>Live Accounts</span>
                </a>
                <a 
                  href="/admin/trade-accounts/demo-accounts" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'demo-accounts'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>Demo Accounts</span>
                </a>
              </div>
            </div>
            
            <div className="space-y-1">
              <div 
                className="flex items-center space-x-3 px-4 py-3 text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10 rounded-lg transition-colors cursor-pointer"
                onClick={toggleFundOperation}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Fund Operation</span>
                <svg 
                  className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                    isFundOperationExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Fund Operation Submenu */}
              <div 
                className={`ml-8 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  isFundOperationExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <a 
                  href="/admin/fund-operations/deposit-fund" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'deposit-fund'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>Deposit Fund</span>
                </a>
                <a 
                  href="/admin/fund-operations/withdraw-fund" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'withdraw-fund'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>Withdraw Fund</span>
                </a>
              </div>
            </div>
            
            <a 
              href="/admin/support-tickets" 
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'support-tickets'
                  ? 'text-white bg-[#9BC5A2]/10'
                  : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Support Tickets</span>
            </a>
            
            <div className="space-y-1">
              <div 
                className="flex items-center space-x-3 px-4 py-3 text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10 rounded-lg transition-colors cursor-pointer"
                onClick={toggleSettings}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
                <svg 
                  className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                    isSettingsExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Settings Submenu */}
              <div 
                className={`ml-8 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  isSettingsExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <a 
                  href="/admin/settings/add-leverage" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'add-leverage'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>Add Leverage</span>
                </a>
                <a 
                  href="/admin/settings/add-ticket-type" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'add-ticket-type'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>Add Ticket Type</span>
                </a>
                <a 
                  href="/admin/settings/add-amount-demo" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'add-amount-demo'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>Add Amount in Demo</span>
                </a>
                <a 
                  href="/admin/settings/add-bank" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'add-bank'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>Add Bank</span>
                </a>
                <a 
                  href="/admin/settings/add-crypto" 
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'add-crypto'
                      ? 'text-white bg-[#9BC5A2]/10'
                      : 'text-[#9BC5A2]/70 hover:text-white hover:bg-[#9BC5A2]/10'
                  }`}
                >
                  <span>Add Crypto</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
