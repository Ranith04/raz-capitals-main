import AuthShell from '@/components/AuthShell';
import SignUpStepSixSelfie from '@/components/SignUpStepSixSelfie';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Step 6 - RAZ CAPITALS',
  description: 'Take a selfie for identity verification.',
};

export default function SignUpStepSixPage() {
  return (
    <AuthShell>
      <SignUpStepSixSelfie />
    </AuthShell>
  );
}
