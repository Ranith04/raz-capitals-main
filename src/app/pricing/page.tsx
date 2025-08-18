import Navbar from '@/components/Navbar';
import TradingAccounts from '@/components/TradingAccounts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - RAZ CAPITALS',
  description: 'Choose the perfect trading plan for your needs. Compare our pricing options and start trading today.',
};

export default function PricingPage() {
  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-[#0A2E1D] text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 sm:mb-6">
            <span className="bg-[#A0C8A9] text-[#0A2E1D] px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold inline-block">
              🚀 Award-winning Platform
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Choose Your Trading Plan
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Select the perfect trading account that matches your investment goals and trading style. All plans include our award-winning platform and professional tools.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <TradingAccounts />

      {/* FAQ Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Get answers to common questions about our pricing and plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Can I upgrade my account later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade your account type at any time. Simply contact our support team or log into your account dashboard. We'll help you transition to a higher tier with all your trading history and settings preserved.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Are there any hidden fees?
              </h3>
              <p className="text-gray-600">
                No hidden fees whatsoever. We believe in complete transparency. All costs including spreads, commissions, overnight fees, and withdrawal charges are clearly outlined for each account type.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept bank transfers, credit cards, debit cards, and digital wallets including PayPal and Skrill. Deposits are processed securely and funds are typically available for trading within 24 hours.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Is there a demo account available?
              </h3>
              <p className="text-gray-600">
                Yes, all account types come with access to our full-featured demo account. Practice your strategies with $10,000 virtual funds and experience our platform risk-free before going live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A2E1D] text-white py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-tight">Ready to Start Trading?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/80 leading-relaxed max-w-3xl mx-auto">
            Choose your account type and start trading gold with competitive spreads. Open your account today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <button className="bg-[#A0C8A9] text-[#0A2E1D] hover:bg-[#8FB89A] px-6 py-3 sm:px-8 rounded-lg font-semibold transition-colors duration-200 text-base">
              Open Account Now
            </button>
            <button className="border-2 border-[#A0C8A9] text-[#A0C8A9] hover:bg-[#A0C8A9] hover:text-[#0A2E1D] px-6 py-3 sm:px-8 rounded-lg font-semibold transition-colors duration-200 text-base">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 