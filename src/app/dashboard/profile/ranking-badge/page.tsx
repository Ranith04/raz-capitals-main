import { Metadata } from 'next';
import ProfileLayout from '../components/ProfileLayout';

export const metadata: Metadata = {
  title: 'Ranking Badge - RAZ CAPITALS',
  description: 'View your ranking and achievements',
};

export default function RankingBadgePage() {
  return (
    <ProfileLayout 
      title="Ranking Badge" 
      description="Track your trading performance and achievements."
    >
      {/* Current Rank */}
      <div className="bg-[#2D4A35] rounded-lg p-6">
        <h3 className="text-white text-lg font-medium mb-4">Current Rank</h3>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div>
            <h4 className="text-white text-xl font-bold">Gold Trader</h4>
            <p className="text-[#A0C8A9]">Level 3 - Advanced Trader</p>
            <p className="text-[#A0C8A9] text-sm">Points: 2,450 / 3,000</p>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-[#2D4A35] rounded-lg p-6">
        <h3 className="text-white text-lg font-medium mb-4">Achievement Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#A0C8A9] rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-8 h-8 text-[#1E2E23]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <p className="text-white text-sm font-medium">First Trade</p>
            <p className="text-[#A0C8A9] text-xs">Completed</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#A0C8A9] rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-8 h-8 text-[#1E2E23]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <p className="text-white text-sm font-medium">10 Trades</p>
            <p className="text-[#A0C8A9] text-xs">Completed</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <p className="text-gray-300 text-sm font-medium">100 Trades</p>
            <p className="text-gray-400 text-xs">Locked</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <p className="text-gray-300 text-sm font-medium">Profit Master</p>
            <p className="text-gray-400 text-xs">Locked</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-[#2D4A35] rounded-lg p-6">
        <h3 className="text-white text-lg font-medium mb-4">Trading Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[#B8D4C1] rounded-lg">
            <h4 className="text-[#1E2E23] text-lg font-bold">47</h4>
            <p className="text-[#2D4A35] text-sm">Total Trades</p>
          </div>
          <div className="text-center p-4 bg-[#B8D4C1] rounded-lg">
            <h4 className="text-[#1E2E23] text-lg font-bold">73%</h4>
            <p className="text-[#2D4A35] text-sm">Win Rate</p>
          </div>
          <div className="text-center p-4 bg-[#B8D4C1] rounded-lg">
            <h4 className="text-[#1E2E23] text-lg font-bold">$12,450</h4>
            <p className="text-[#2D4A35] text-sm">Total Profit</p>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
