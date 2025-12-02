import SignUpSuccess from '@/components/SignUpSuccess';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registration Complete - RAZ CAPITALS',
  description: 'Your RAZ CAPITALS registration is complete. Save your trading credentials and proceed to login.',
};

export default function StepEightPage() {
  return <SignUpSuccess />;
}

