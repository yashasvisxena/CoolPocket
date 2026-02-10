import { lazy, Suspense } from "react";
import { useWizardStore } from "@/store/wizardStore";

// Lazy load step pages for code splitting
const Step1AccountBasics = lazy(() => import("@/pages/Step1AccountBasics"));
const Step2AccountSetup = lazy(() => import("@/pages/Step2AccountSetup"));
const Step3Details = lazy(() => import("@/pages/Step3Details"));
const Step4Review = lazy(() => import("@/pages/Step4Review"));

const stepComponents = [
  Step1AccountBasics,
  Step2AccountSetup,
  Step3Details,
  Step4Review,
];

function App() {
  const currentStep = useWizardStore((state) => state.currentStep);

  const StepComponent = stepComponents[currentStep - 1];

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-[var(--color-text-secondary)]">
            Loading...
          </div>
        </div>
      }
    >
      <StepComponent />
    </Suspense>
  );
}

export default App;
