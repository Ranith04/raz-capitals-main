import type {
    SignUpStep1Data,
    SignUpStep2Data,
    SignUpStep3Data,
    SignUpStep4Data,
    SignUpStep5Data
} from '@/types/user';
import { useEffect, useState } from 'react';

export const useSignupFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<SignUpStep1Data | null>(null);
  const [step2Data, setStep2Data] = useState<SignUpStep2Data | null>(null);
  const [step3Data, setStep3Data] = useState<SignUpStep3Data | null>(null);
  const [step4Data, setStep4Data] = useState<SignUpStep4Data | null>(null);
  const [step5Data, setStep5Data] = useState<SignUpStep5Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user has started signup process
  useEffect(() => {
    const userUuid = sessionStorage.getItem('signup_user_uuid');
    if (userUuid) {
      // User has started signup, determine current step
      if (sessionStorage.getItem('signup_step2')) setCurrentStep(2);
      if (sessionStorage.getItem('signup_step3')) setCurrentStep(3);
      if (sessionStorage.getItem('signup_step4')) setCurrentStep(4);
      if (sessionStorage.getItem('signup_step5')) setCurrentStep(5);
    }
  }, []);

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const resetSignupFlow = () => {
    setCurrentStep(1);
    setStep1Data(null);
    setStep2Data(null);
    setStep3Data(null);
    setStep4Data(null);
    setStep5Data(null);
    setError(null);
    
    // Clear sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('signup_user_uuid');
      sessionStorage.removeItem('signup_email');
      sessionStorage.removeItem('signup_step2');
      sessionStorage.removeItem('signup_step3');
      sessionStorage.removeItem('signup_step4');
      sessionStorage.removeItem('signup_step5');
    }
  };

  const canProceedToStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return !!step1Data;
      case 3:
        return !!step1Data && !!step2Data;
      case 4:
        return !!step1Data && !!step2Data && !!step3Data;
      case 5:
        return !!step1Data && !!step2Data && !!step3Data && !!step4Data;
      default:
        return false;
    }
  };

  const getStepProgress = (): number => {
    return (currentStep / 5) * 100;
  };

  return {
    currentStep,
    step1Data,
    step2Data,
    step3Data,
    step4Data,
    step5Data,
    isLoading,
    error,
    setStep1Data,
    setStep2Data,
    setStep3Data,
    setStep4Data,
    setStep5Data,
    setIsLoading,
    setError,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    resetSignupFlow,
    canProceedToStep,
    getStepProgress,
  };
};
