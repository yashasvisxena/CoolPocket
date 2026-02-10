import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WizardFormData, Step1Data, Step2Data, Step3Data } from '@/types/wizard';

const initialFormData: WizardFormData = {
  step1: {
    fullName: '',
    email: '',
    phone: '',
    country: '',
    password: '',
  },
  step2: {
    accountType: '',
    productGoal: '',
    monthlyVolume: 50,
  },
  step3: {},
};

interface WizardStore {
  currentStep: number;
  formData: WizardFormData;
  isSubmitted: boolean;
  
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateStep1: (data: Partial<Step1Data>) => void;
  updateStep2: (data: Partial<Step2Data>) => void;
  updateStep3: (data: Partial<Step3Data>) => void;
  setSubmitted: (submitted: boolean) => void;
  resetWizard: () => void;
}

export const useWizardStore = create<WizardStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: initialFormData,
      isSubmitted: false,

      setCurrentStep: (step) => set({ currentStep: step }),
      
      nextStep: () => set((state) => ({ 
        currentStep: Math.min(state.currentStep + 1, 4) 
      })),
      
      prevStep: () => set((state) => ({ 
        currentStep: Math.max(state.currentStep - 1, 1) 
      })),

      updateStep1: (data) => set((state) => ({
        formData: {
          ...state.formData,
          step1: { ...state.formData.step1, ...data },
        },
      })),

      updateStep2: (data) => set((state) => ({
        formData: {
          ...state.formData,
          step2: { ...state.formData.step2, ...data },
        },
      })),

      updateStep3: (data) => set((state) => ({
        formData: {
          ...state.formData,
          step3: { ...state.formData.step3, ...data },
        },
      })),

      setSubmitted: (submitted) => set({ isSubmitted: submitted }),

      resetWizard: () => set({
        currentStep: 1,
        formData: initialFormData,
        isSubmitted: false,
      }),
    }),
    {
      name: 'coolpockett-wizard',
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: state.formData,
        isSubmitted: state.isSubmitted,
      }),
    }
  )
);
