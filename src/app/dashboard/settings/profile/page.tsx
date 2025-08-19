export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#B8D4C1] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0A2E1D] mb-6">Profile Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Summary - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-[#0A2E1D] rounded-lg shadow p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold">RANITH KUMAR</h2>
                <div className="w-8 h-8 bg-[#A0C8A9]/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#A0C8A9]/30 transition-colors">
                  <span className="text-[#A0C8A9] text-sm">✏️</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 bg-[#A0C8A9] text-[#0A2E1D] text-sm font-medium rounded-full">
                  Unverified
                </div>
                <p className="text-[#A0C8A9] font-medium">India</p>
                
                <div className="pt-4 space-y-2 text-sm text-gray-300">
                  <div>
                    <span className="text-gray-400">Member since:</span>
                    <p className="text-white">Mon, Aug 11, 2025 5:24 AM</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Customer Group:</span>
                    <p className="text-white">N/A</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Risk Profile:</span>
                    <p className="text-white">N/A</p>
                  </div>
                  <div>
                    <span className="text-gray-400">KYC Level:</span>
                    <p className="text-white">Level 1</p>
                  </div>
                  <div>
                    <span className="text-gray-400">IB Member:</span>
                    <p className="text-white">Unprocessed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information Form - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
              <h2 className="text-xl font-semibold text-[#0A2E1D] mb-6">Personal Information</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      placeholder="First Name"
                    />
                  </div>
                  
                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      placeholder="Last Name"
                    />
                  </div>
                  
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      placeholder="Username"
                    />
                  </div>
                  
                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                        placeholder="dd-mm-yyyy"
                      />
                    </div>
                  </div>
                  
                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      placeholder="Email Address"
                    />
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="flex">
                      <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                        <span className="text-sm text-gray-500">🇮🇳 +91</span>
                      </div>
                      <input 
                        type="tel" 
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  
                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      placeholder="Country"
                    />
                  </div>
                  
                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  
                  {/* Zip */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                      placeholder="Zip Code"
                    />
                  </div>
                </div>
                
                {/* Address - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea 
                    placeholder="Enter your full address"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                  />
                </div>
                
                {/* Save Button */}
                <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium text-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
