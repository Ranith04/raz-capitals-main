'use client';

import { logger } from '@/utils/logger';
import { sessionManager } from '@/utils/sessionManager';
import { useState } from 'react';

export default function TestLoggingPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [sessionStatus, setSessionStatus] = useState<string>('Unknown');

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testLogging = async () => {
    addResult('Starting logging tests...');
    
    try {
      // Test different log levels
      await logger.info('This is an info message');
      addResult('Info log sent');
      
      await logger.success('This is a success message');
      addResult('Success log sent');
      
      await logger.warn('This is a warning message');
      addResult('Warning log sent');
      
      await logger.error('This is an error message');
      addResult('Error log sent');
      
      // Test query logging
      await logger.query(1, 'users', 'created_at >= today', { count: 5, error: null });
      addResult('Query log sent');
      
      addResult('All logging tests completed!');
      
    } catch (error) {
      addResult(`Error during testing: ${error}`);
    }
  };

  const testSessionManagement = async () => {
    addResult('Starting session management tests...');
    
    try {
      // Check current session
      addResult('Checking current session...');
      const currentSession = await sessionManager.getCurrentSession();
      
      if (currentSession.success && currentSession.session) {
        setSessionStatus('Active');
        addResult(`✅ Session found: ${currentSession.user?.email}`);
      } else {
        setSessionStatus('None');
        addResult('⚠️ No active session found');
      }

      // Try to initialize a test session
      addResult('Initializing test session...');
      const testUser = {
        email: 'test@example.com',
        password: 'testpassword123',
        name: 'Test User'
      };

      const sessionResult = await sessionManager.initializeTestSession(testUser);
      
      if (sessionResult.success) {
        setSessionStatus('Active');
        addResult(`✅ Test session initialized: ${sessionResult.user?.email}`);
      } else {
        addResult(`❌ Session initialization failed: ${sessionResult.error}`);
      }

      // Check session again
      addResult('Re-checking session status...');
      const newSessionCheck = await sessionManager.getCurrentSession();
      
      if (newSessionCheck.success && newSessionCheck.session) {
        setSessionStatus('Active');
        addResult(`✅ Session confirmed: ${newSessionCheck.user?.email}`);
      } else {
        setSessionStatus('None');
        addResult('⚠️ Still no active session');
      }

    } catch (error) {
      addResult(`Error during session testing: ${error}`);
    }
  };

  const signOut = async () => {
    addResult('Signing out...');
    
    try {
      const result = await sessionManager.signOut();
      
      if (result.success) {
        setSessionStatus('None');
        addResult('✅ Signed out successfully');
      } else {
        addResult(`❌ Sign out failed: ${result.error}`);
      }
    } catch (error) {
      addResult(`Error during sign out: ${error}`);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">🔍 Logging & Session Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Session Status</h2>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              sessionStatus === 'Active' ? 'bg-green-100 text-green-800' : 
              sessionStatus === 'None' ? 'bg-red-100 text-red-800' : 
              'bg-gray-100 text-gray-800'
            }`}>
              {sessionStatus}
            </span>
            <button
              onClick={() => sessionManager.getCurrentSession().then(result => 
                addResult(`Session check: ${result.success ? 'Active' : 'None'}`)
              )}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              🔍 Check Session
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">How to Test</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">1. Browser Console (F12)</h3>
              <p className="text-gray-600">Open Developer Tools → Console tab to see browser logs</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">2. Server Terminal</h3>
              <p className="text-gray-600">Check the terminal where you ran `npm run dev` for server logs</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">3. Test the Systems</h3>
              <p className="text-gray-600">Click the buttons below to test logging and session management</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <button
              onClick={testLogging}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🧪 Test Logging
            </button>
            
            <button
              onClick={testSessionManagement}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🔐 Test Session
            </button>
            
            <button
              onClick={signOut}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🚪 Sign Out
            </button>
            
            <button
              onClick={clearResults}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🗑️ Clear Results
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Test Results:</h3>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-gray-500 italic">No tests run yet. Click the buttons above to start testing.</p>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono text-gray-700 bg-white px-2 py-1 rounded border">
                    {result}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">📋 What You Should See</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-green-600">✅</span>
              <div>
                <strong>Browser Console:</strong> All log messages with emojis
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-blue-600">📱</span>
              <div>
                <strong>Server Terminal:</strong> Timestamped log messages from the API
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-purple-600">🔗</span>
              <div>
                <strong>Network Tab:</strong> POST requests to /api/log endpoint
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-orange-600">🔐</span>
              <div>
                <strong>Session Status:</strong> Real-time session state updates
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              <strong>Note:</strong> If you don't see logs in the server terminal, check that:
            </p>
            <ul className="list-disc list-inside mt-2 text-yellow-700 space-y-1">
              <li>Your Next.js dev server is running (`npm run dev`)</li>
              <li>The /api/log endpoint is accessible</li>
              <li>No CORS or network errors in the browser console</li>
              <li>Supabase authentication is properly configured</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
