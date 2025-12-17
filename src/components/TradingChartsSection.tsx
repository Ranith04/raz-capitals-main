'use client';

import TradingInstrumentCard from './TradingInstrumentCard';

export default function TradingChartsSection() {
  const instruments = [
    {
      symbol: 'OANDA:XAUUSD',
      name: 'GOLD SPOT / U.S. DOLLAR',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
          <path d="M2 17L12 22L22 17" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
          <path d="M2 12L12 17L22 12" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
        </svg>
      ),
      currentValue: '4,280.685',
      isPositive: false,
    },
    {
      symbol: 'BINANCE:BTCUSDT',
      name: 'BITCOIN / TETHERUS',
      icon: (
        <div className="relative">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F7931A">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6 0 5.302-4.298 9.6-9.6 9.6-5.302 0-9.6-4.298-9.6-9.6 0-5.302 4.298-9.6 9.6-9.6z"/>
            <path d="M12.6 6v2.4h2.4v1.2H12.6v2.4h-1.2V9.6H9v-1.2h2.4V6h1.2zm-1.2 7.2v2.4h4.8v-1.2h-3.6v-1.2z"/>
          </svg>
        </div>
      ),
      currentValue: '86,476.22',
      isPositive: true,
    },
    {
      symbol: 'FX:EURUSD',
      name: 'EURO / U.S. DOLLAR',
      icon: (
        <div className="relative">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#003087">
            <circle cx="12" cy="12" r="10" fill="#003087"/>
            <path d="M12 6v12M6 12h12" stroke="#FFD700" strokeWidth="2"/>
          </svg>
        </div>
      ),
      currentValue: '1.17566',
      isPositive: true,
    },
    {
      symbol: 'TVC:USOIL',
      name: 'CFDS ON WTI CRUDE OIL',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#000"/>
          <path d="M12 8L8 12L12 16L16 12L12 8Z" fill="#fff"/>
        </svg>
      ),
      currentValue: '55.74',
      change: '-1.64%',
      changePercent: '0.93',
      isPositive: false,
    },
  ];

  return (
    <section className="py-20" style={{backgroundColor: '#F7F7F2'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Market Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Access real-time quotes across global financial markets. Monitor Forex, Gold, Cryptocurrencies, and Commodities using reliable market data from leading liquidity sources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instruments.map((instrument) => (
            <TradingInstrumentCard
              key={instrument.symbol}
              symbol={instrument.symbol}
              name={instrument.name}
              icon={instrument.icon}
              currentValue={instrument.currentValue}
              change={instrument.change}
              changePercent={instrument.changePercent}
              isPositive={instrument.isPositive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
