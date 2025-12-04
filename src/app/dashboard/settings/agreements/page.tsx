export default function AgreementsPage() {
  return (
    <div className="min-h-screen bg-[#B8D4C1] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0A2E1D] mb-6">Legal Agreements</h1>
        
        {/* Agreements Description */}
        <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 mb-6">
          <p className="text-gray-600">Stay informed and compliant; review all legal agreements linked to your profile.</p>
        </div>

        {/* Agreements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Terms & Conditions */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Terms & Conditions</h3>
            <p className="text-sm text-gray-500 font-medium">PDF</p>
          </div>

          {/* Cookies Policy */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🍪</span>
              </div>
              <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Cookies Policy</h3>
            <p className="text-sm text-gray-500 font-medium">PDF</p>
          </div>

          {/* Risk Disclosure */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Risk Disclosure</h3>
            <p className="text-sm text-gray-500 font-medium">PDF</p>
          </div>
        </div>
      </div>
    </div>
  );
}
