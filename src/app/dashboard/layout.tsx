'use client';

import { ActiveAccountProvider } from '@/contexts/ActiveAccountContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ActiveAccountProvider>
      {children}
    </ActiveAccountProvider>
  );
}

