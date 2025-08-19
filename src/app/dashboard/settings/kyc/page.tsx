export default function KYCPage() {
  return (
    <div className="min-h-screen bg-[#B8D4C1] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0A2E1D] mb-6">KYC Verification Center</h1>
        
        {/* KYC Description */}
        <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 mb-6">
          <p className="text-gray-600 mb-4">To maintain a secure and compliant trading environment, identity verification is required.</p>
          <p className="text-gray-600">Complete your KYC steps to unlock full access including deposits, trading, and withdrawals.</p>
        </div>

        {/* Step 1: Confirm Email */}
        <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#A0C8A9] rounded-full flex items-center justify-center text-[#0A2E1D] font-bold">1</div>
              <h3 className="text-lg font-semibold text-[#0A2E1D]">Confirm Email</h3>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Verified</span>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-900 font-medium mb-2">ranithkumar04@gmail.com</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="text-md font-medium text-[#0A2E1D] mb-3">Privileges of Account Verification</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Update your full profile securely.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Deposit funds without restrictions.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Open demo and real trading accounts.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Transfer funds internally.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Create support ticket for assistance.</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Completed</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Automated</span>
          </div>
        </div>

        {/* Step 2: Verify Identity */}
        <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#A0C8A9] rounded-full flex items-center justify-center text-[#0A2E1D] font-bold">2</div>
              <h3 className="text-lg font-semibold text-[#0A2E1D]">Verify your identity using Sumsub</h3>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Automated</span>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Provide a document confirming your name</p>
            <p className="text-gray-600">Verify your details please</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="text-md font-medium text-[#0A2E1D] mb-3">Privileges of Profile Verification</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span>Withdraw funds from verified accounts.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span>Make external transfers securely.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span>Get approved for higher trading limits.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span>Unlock advanced account features.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span>Faster processing of requests and reviews.</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-3 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium">
              Go to Sumsub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
