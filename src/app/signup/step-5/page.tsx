import AuthShell from '@/components/AuthShell';
import SignUpStepFive from '@/components/SignUpStepFive';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Step 5 - RAZ CAPITALS',
  description: 'Complete your RAZ CAPITALS account registration with identity verification.',
};

export default function SignUpStepFivePage() {
  return (
    <AuthShell>
      <SignUpStepFive />
    </AuthShell>
  );
}
