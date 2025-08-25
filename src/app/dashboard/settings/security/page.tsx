export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#B8D4C1] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0A2E1D] mb-6">Security Settings</h1>
        
        {/* Security Description */}
        <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 mb-6">
          <h2 className="text-xl font-semibold text-[#0A2E1D] mb-2">Strengthen Your Online Security</h2>
          <p className="text-gray-600">It&apos;s your primary defense.</p>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#0A2E1D]">Security</h3>
          </div>
          
          <div className="mb-6">
            <h4 className="text-md font-medium text-[#0A2E1D] mb-2">Authorization</h4>
            <p className="text-gray-600 mb-4">Information for logging in to Raz Capitals.</p>
            <p className="text-gray-600 mb-4">Change your password whenever you think it might have been compromised.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">ranithkumar04@gmail.com</p>
                  <p className="text-sm text-gray-500">Email address</p>
                </div>
                <button className="px-4 py-2 bg-[#A0C8A9] text-[#0A2E1D] rounded-md hover:bg-[#8BBF9F] transition-colors font-medium">
                  Change
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">••••••••</p>
                  <p className="text-sm text-gray-500">Current password</p>
                </div>
                <button className="px-4 py-2 bg-[#A0C8A9] text-[#0A2E1D] rounded-md hover:bg-[#8BBF9F] transition-colors font-medium">
                  Change
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="px-6 py-2 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* 2-Step Verification Section */}
        <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#0A2E1D]">Security</h3>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-[#0A2E1D] mb-2">2-Step verification</h4>
            <p className="text-gray-600 mb-4">2-step verification ensures that all sensitive transactions are authorized by you.</p>
            <p className="text-gray-600 mb-4">We encourage you to enter verification codes to confirm these transactions.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Security type</p>
                  <p className="text-sm text-gray-500">ranithkumar04@gmail.com</p>
                </div>
                <button className="px-4 py-2 bg-[#A0C8A9] text-[#0A2E1D] rounded-md hover:bg-[#8BBF9F] transition-colors font-medium">
                  Change
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="px-6 py-2 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
