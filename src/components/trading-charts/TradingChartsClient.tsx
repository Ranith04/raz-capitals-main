'use client';

import React, { useMemo, useState } from 'react';

import TradingViewLiveChart from './TradingViewLiveChart';

type SymbolOption = 'EURUSD' | 'USDJPY' | 'XAUUSD';

export default function TradingChartsClient() {
  const symbols: SymbolOption[] = useMemo(() => ['EURUSD', 'USDJPY', 'XAUUSD'], []);
  const [activeSymbol, setActiveSymbol] = useState<SymbolOption>('EURUSD');
  const tradingViewSymbol = useMemo(() => {
    switch (activeSymbol) {
      case 'EURUSD':
        return 'FX:EURUSD';
      case 'USDJPY':
        return 'FX:USDJPY';
      case 'XAUUSD':
        return 'OANDA:XAUUSD';
      default:
        return 'FX:EURUSD';
    }
  }, [activeSymbol]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-4">
        <aside className="lg:w-64">
          <div className="rounded-xl border border-[#A0C8A9]/15 bg-[#1E2E23] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white font-semibold tracking-wide">Symbols</div>
              <div className="text-xs text-white/60">View-only</div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {symbols.map((s) => {
                const isActive = s === activeSymbol;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActiveSymbol(s)}
                    className={[
                      'rounded-lg px-3 py-2 text-left transition-colors border',
                      isActive
                        ? 'bg-[#A0C8A9] text-[#0A2E1D] border-[#A0C8A9]'
                        : 'bg-transparent text-white/85 border-white/10 hover:border-[#A0C8A9]/40 hover:bg-white/5',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{s}</span>
                      {isActive ? <span className="text-xs font-semibold">Active</span> : null}
                    </div>
                    <div className="text-xs opacity-80 mt-0.5">
                      {s === 'EURUSD'
                        ? 'Euro / U.S. Dollar'
                        : s === 'USDJPY'
                          ? 'U.S. Dollar / Japanese Yen'
                          : 'Gold / U.S. Dollar'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="rounded-xl border border-[#A0C8A9]/15 bg-[#1E2E23] p-3 lg:p-4">
            <div className="flex items-center justify-between gap-4 px-1 pb-3">
              <div className="min-w-0">
                <div className="text-white font-semibold">{activeSymbol}</div>
                <div className="text-xs text-white/60 truncate">
                  Live chart • right price scale • bottom time scale
                </div>
              </div>
              <div className="text-xs text-white/60">Live via TradingView</div>
            </div>

            <div className="h-[520px] md:h-[620px] w-full rounded-lg overflow-hidden bg-[#0A2E1D]">
              <TradingViewLiveChart symbol={tradingViewSymbol} interval="60" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


