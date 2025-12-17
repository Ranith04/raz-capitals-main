import Navbar from '@/components/Navbar';
import TradingChartsClient from '@/components/trading-charts/TradingChartsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trading Charts - RAZ CAPITALS',
  description:
    'Explore interactive trading charts, switch symbols, and analyze price action with a clean dark interface.',
};

export default function TradingChartsPage() {
  return (
    <div className="bg-[#0A2E1D] min-h-screen overflow-x-hidden">
      <Navbar />
      <section className="py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="inline-flex items-center rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/85">
              Trading Charts
            </div>
            <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Interactive Candlestick Chart
            </h1>
            <p className="mt-2 text-white/70 max-w-3xl">
              Switch symbols and explore price action with a clean, dark interface.
            </p>
          </div>

          <TradingChartsClient />
        </div>
      </section>
    </div>
  );
}


