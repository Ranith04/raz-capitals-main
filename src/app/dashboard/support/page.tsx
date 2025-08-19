import { Metadata } from 'next';
import SupportTicketsClient from './SupportTicketsClient';

export const metadata: Metadata = {
  title: 'Support Tickets - RAZ CAPITALS',
  description: 'Manage your support tickets and get help from our team',
};

export default function SupportTicketsPage() {
  return <SupportTicketsClient />;
}
