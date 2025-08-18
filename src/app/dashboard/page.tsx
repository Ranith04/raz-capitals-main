import ProtectedRoute from '@/components/ProtectedRoute';
import { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard - RAZ CAPITALS',
  description: 'Your trading dashboard - monitor your portfolio, track performance, and manage your investments.',
};

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRole="user">
      <DashboardClient />
    </ProtectedRoute>
  );
}