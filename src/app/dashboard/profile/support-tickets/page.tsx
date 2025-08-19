import { Metadata } from 'next';
import ProfileLayout from '../components/ProfileLayout';

export const metadata: Metadata = {
  title: 'Support Tickets - RAZ CAPITALS',
  description: 'Manage your support tickets and get help from our team',
};

export default function SupportTicketsPage() {
  return (
    <ProfileLayout 
      title="Support Tickets" 
      description="Get help from our support team and track your requests."
    >
      {/* Ticket Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Tickets', count: 0 },
          { title: 'Closed Tickets', count: 0 },
          { title: 'Open Tickets', count: 0 },
          { title: 'Resolved Tickets', count: 0 }
        ].map((card, index) => (
          <div key={index} className="bg-[#2D4A35] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
                <span className="text-[#1E2E23] font-bold text-lg">G</span>
              </div>
              <div>
                <h3 className="text-white font-medium">{card.title}</h3>
                <p className="text-2xl font-bold text-[#A0C8A9]">{card.count}</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-[#A0C8A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>

      {/* Create New Ticket */}
      <div className="bg-[#2D4A35] rounded-lg p-6">
        <h3 className="text-white text-lg font-medium mb-4">Create New Ticket</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Subject</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
              placeholder="Brief description of your issue"
            />
          </div>
          
          <div>
            <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Category</label>
            <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
              <option>Technical Issue</option>
              <option>Account Related</option>
              <option>Payment Issue</option>
              <option>General Inquiry</option>
            </select>
          </div>
          
          <div>
            <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Priority</label>
            <select className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Description</label>
            <textarea 
              rows={4}
              className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
              placeholder="Please provide detailed information about your issue..."
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button 
              type="submit"
              className="bg-[#A0C8A9] text-[#1E2E23] py-2 px-6 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors"
            >
              Submit Ticket
            </button>
            <button 
              type="button"
              className="border border-[#A0C8A9] text-[#A0C8A9] py-2 px-6 rounded-lg hover:bg-[#A0C8A9]/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Recent Tickets */}
      <div className="bg-[#2D4A35] rounded-lg p-6">
        <h3 className="text-white text-lg font-medium mb-4">Recent Tickets</h3>
        <div className="text-center py-8 text-[#A0C8A9]">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-lg">No tickets found</p>
          <p className="text-sm">Create your first support ticket above</p>
        </div>
      </div>
    </ProfileLayout>
  );
}
