import AuthShell from '@/components/AuthShell';
import SignUpStepSix from '@/components/SignUpStepSix';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Step 6 - RAZ CAPITALS',
  description: 'Complete your RAZ CAPITALS account registration with OTP verification.',
};

export default function SignUpStepSixPage() {
  return (
    <AuthShell>
      <SignUpStepSix />
    </AuthShell>
  );
}
