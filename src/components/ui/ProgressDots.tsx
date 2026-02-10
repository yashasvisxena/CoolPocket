interface ProgressDotsProps {
  totalSteps: number;
  currentStep: number;
}

export function ProgressDots({ totalSteps, currentStep }: ProgressDotsProps) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={`
            w-2.5 h-2.5 rounded-full transition-all duration-300
            ${step === currentStep 
              ? 'bg-[var(--color-primary)] scale-110' 
              : step < currentStep
                ? 'bg-[var(--color-primary)] opacity-60'
                : 'bg-gray-300'
            }
          `}
        />
      ))}
    </div>
  );
}
