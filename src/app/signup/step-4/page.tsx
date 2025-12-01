import AuthShell from '@/components/AuthShell';
import SignUpStepFour from '@/components/SignUpStepFour';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Step 4 - RAZ CAPITALS',
  description: 'Complete your RAZ CAPITALS account registration with your address details.',
};

export default function SignUpStepFourPage() {
  return (
    <AuthShell>
      <SignUpStepFour />
    </AuthShell>
  );
}
