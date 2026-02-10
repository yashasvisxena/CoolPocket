import type { ReactNode } from "react";
import { ProgressDots } from "@/components/ui";
import { TOTAL_STEPS } from "@/types/wizard";

interface WizardLayoutProps {
  currentStep: number;
  title: string;
  onBack?: () => void;
  children: ReactNode;
  footer: ReactNode;
}

export function WizardLayout({
  currentStep,
  title,
  onBack,
  children,
  footer,
}: WizardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <header className="sticky top-0 z-10 bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="flex items-center justify-center h-14 px-4 relative">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="absolute left-4 p-2 -ml-2 text-[var(--color-text)] hover:text-[var(--color-text-secondary)]"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-base font-medium text-[var(--color-text)]">
            {title}
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="mb-6">
            <ProgressDots totalSteps={TOTAL_STEPS} currentStep={currentStep} />
          </div>

          <div className="animate-fadeIn">{children}</div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="text-center text-xs text-[var(--color-text-secondary)] mb-3">
            Step {currentStep} of {TOTAL_STEPS}
          </div>
          {footer}
        </div>
      </footer>
    </div>
  );
}
