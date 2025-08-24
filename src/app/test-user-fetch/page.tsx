'use client';

import { UserService } from '@/lib/userService';
import { EnhancedClientUser } from '@/types';
import { useState } from 'react';

export default function TestUserFetchPage() {
  const [userData, setUserData] = useState<EnhancedClientUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputUuid, setInputUuid] = useState('');

    // Use UserService formatDate method for consistent date formatting
  const formatDate = (dateString: string) => {
    return UserService.formatDate(dateString);
  };

  const fetchUserData = async (uuid: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🧪 [TEST PAGE] ==========================================');
      console.log('🧪 [TEST PAGE] Fetching user data for UUID:', uuid);
      
      const response = await fetch(`/api/users/${uuid}`);
      const data = await response.json();
      
      console.log('🧪 [TEST PAGE] API Response received');
      
      if (response.ok && data.success) {
        console.log('🧪 [TEST PAGE] User data received successfully');
        console.log('🧪 [TEST PAGE] KYC Status:', data.user?.status);
        console.log('🧪 [TEST PAGE] Account Status:', data.user?.account_status);
        console.log('🧪 [TEST PAGE] Account Type:', data.user?.account_type);
        console.log('🧪 [TEST PAGE] Phone Number:', data.user?.phone_number);
        console.log('🧪 [TEST PAGE] Country:', data.user?.country_of_birth);
        console.log('🧪 [TEST PAGE] Residential Address:', data.user?.residential_address);
        console.log('🧪 [TEST PAGE] Date of Birth:', data.user?.dob);
        console.log('🧪 [TEST PAGE] Middle Name:', data.user?.middle_name);
        console.log('🧪 [TEST PAGE] Complete user data:', data.user);
        setUserData(data.user);
      } else {
        console.log('🧪 [TEST PAGE] API Error:', data.error);
        setError(data.error || 'Failed to fetch user data');
        setUserData(null);
      }
      
      console.log('🧪 [TEST PAGE] ==========================================');
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUuid.trim()) {
      fetchUserData(inputUuid.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Test User Data Fetching by UUID
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Fetch User Data by UUID</h2>
          
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputUuid}
                onChange={(e) => setInputUuid(e.target.value)}
                placeholder="Enter user UUID (e.g., a5d49c61-2f38-4d08-a5b3-9b9427d44cb)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                disabled={loading || !inputUuid.trim()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Fetching...' : 'Fetch'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {userData && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">User Profile Data</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-lg font-semibold text-gray-800">
                    {`${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'N/A'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg font-semibold text-gray-800">{userData.email}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-lg font-semibold text-gray-800">{userData.phone_number || 'N/A'}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Country</label>
                  <p className="text-lg font-semibold text-gray-800">{userData.country_of_birth || 'N/A'}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Residential Address</label>
                  <p className="text-lg font-semibold text-gray-800">{userData.residential_address || 'N/A'}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                  <p className="text-lg font-semibold text-gray-800">
                    {userData.dob ? formatDate(userData.dob) : 'N/A'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-600">Registration Date</label>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(userData.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-600">User UUID</label>
                <p className="text-sm font-mono text-gray-600 break-all">{userData.user_uuid}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-600">KYC Status</label>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  userData.status === 'verified' 
                    ? 'bg-green-100 text-green-800'
                    : userData.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : userData.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {userData.status || 'pending'}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-600">Account Status</label>
                <p className="text-lg font-semibold text-gray-800">{userData.account_status || 'Active'}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-600">Account Type</label>
                <p className="text-lg font-semibold text-gray-800">{userData.account_type || 'Demo'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sample UUIDs from your database:</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Record 170:</strong> a5d49c61-2f38-4d08-a5b3-9b9427d44cb</p>
            <p><strong>Record 171:</strong> e0adc7cd-5197-49df-8978-614bd95ddf54</p>
            <p><strong>Record 172:</strong> 055f5abc-e003-4e3c-897d-45fb8e8b3d3</p>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Copy any of these UUIDs above to test the data fetching functionality.
          </p>
        </div>
      </div>
    </div>
  );
}
