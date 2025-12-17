'use client';

import { useEffect, useRef } from 'react';

interface TradingInstrumentCardProps {
  symbol: string;
  name: string;
  icon: React.ReactNode;
  currentValue: string;
  change?: string;
  changePercent?: string;
  isPositive?: boolean;
}

export default function TradingInstrumentCard({
  symbol,
  name,
  icon,
  currentValue,
  change,
  changePercent,
  isPositive = true,
}: TradingInstrumentCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: '100%',
      height: '100%',
      locale: 'en',
      dateRange: '12M',
      colorTheme: 'light',
      isTransparent: true,
      autosize: true,
      largeChartUrl: '',
    });

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header with Icon and Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{symbol}</div>
            <div className="text-xs text-gray-500">{name}</div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-md px-2 py-1 flex items-center space-x-1">
          <span className="text-xs font-medium text-gray-700">T</span>
          <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </div>

      {/* Current Value */}
      <div className="mb-4">
        <div className={`text-2xl font-bold ${isPositive ? 'text-gray-900' : 'text-red-600'}`}>
          {currentValue}
        </div>
        {(change || changePercent) && (
          <div className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {changePercent && `${changePercent} `}
            {change && `(${change})`}
          </div>
        )}
      </div>

      {/* TradingView Chart */}
      <div className="h-40 w-full rounded-lg overflow-hidden">
        <div ref={containerRef} className="tradingview-widget-container__widget w-full h-full"></div>
      </div>
    </div>
  );
}
