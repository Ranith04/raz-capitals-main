import AuthShell from '@/components/AuthShell';
import SignUpStepThree from '@/components/SignUpStepThree';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Step 3 - RAZ CAPITALS',
  description: 'Complete your RAZ CAPITALS account registration with additional details.',
};

export default function SignUpStepThreePage() {
  return (
    <AuthShell>
      <SignUpStepThree />
    </AuthShell>
  );
}
