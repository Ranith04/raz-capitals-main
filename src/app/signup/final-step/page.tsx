import AuthShell from '@/components/AuthShell';
import SignUpFinalStep from '@/components/SignUpFinalStep';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Registration - RAZ CAPITALS',
  description: 'Complete your RAZ CAPITALS account registration and start trading.',
};

export default function FinalStepPage() {
  return (
    <AuthShell maxWidthClass="max-w-4xl">
      <SignUpFinalStep />
    </AuthShell>
  );
}
