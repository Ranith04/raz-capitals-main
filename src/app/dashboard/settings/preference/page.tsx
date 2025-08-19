export default function PreferencePage() {
  return (
    <div className="min-h-screen bg-[#B8D4C1] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0A2E1D] mb-6">User Preferences</h1>
        
        {/* Theme Section */}
        <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 mb-6">
          <h2 className="text-xl font-semibold text-[#0A2E1D] mb-2">Theme</h2>
          <p className="text-gray-600 mb-4">Select your preferred theme</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Light Mode */}
            <div className="border-2 border-[#A0C8A9] rounded-lg p-4 bg-[#A0C8A9]/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-[#0A2E1D]">Light Mode</h3>
                <span className="text-[#A0C8A9] font-medium">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#A0C8A9] rounded-full"></div>
                <span className="text-sm text-gray-600">Default light theme</span>
              </div>
            </div>
            
            {/* Dark Mode */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">Dark Mode</h3>
                <span className="text-gray-500 font-medium">Select</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">Dark theme option</span>
              </div>
            </div>
          </div>
        </div>

        {/* Communication Section */}
        <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
          <h2 className="text-xl font-semibold text-[#0A2E1D] mb-2">Communication</h2>
          <p className="text-gray-600 mb-4">Select your preferred language</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* English */}
            <div className="border-2 border-[#A0C8A9] rounded-lg p-4 bg-[#A0C8A9]/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-[#0A2E1D]">English</h3>
                <span className="text-[#A0C8A9] font-medium">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#A0C8A9] rounded-full"></div>
                <span className="text-sm text-gray-600">Primary language</span>
              </div>
            </div>
            
            {/* French */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">French</h3>
                <span className="text-gray-500 font-medium">Select</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">Français</span>
              </div>
            </div>
            
            {/* Spanish */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">Spanish</h3>
                <span className="text-gray-500 font-medium">Select</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">Español</span>
              </div>
            </div>
            
            {/* Chinese */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">Chinese</h3>
                <span className="text-gray-500 font-medium">Select</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">中文</span>
              </div>
            </div>
            
            {/* Arabic */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">Arabic</h3>
                <span className="text-gray-500 font-medium">Select</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">العربية</span>
              </div>
            </div>
            
            {/* Hindi */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">Hindi</h3>
                <span className="text-gray-500 font-medium">Select</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">हिन्दी</span>
              </div>
            </div>
            
            {/* Urdu */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#A0C8A9]/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">Urdu</h3>
                <span className="text-gray-500 font-medium">Select</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">اردو</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
