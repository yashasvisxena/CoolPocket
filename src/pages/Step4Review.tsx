import { useState } from "react";
import { WizardLayout } from "@/components/wizard";
import { Button } from "@/components/ui";
import { useWizardStore } from "@/store/wizardStore";
import {
  COUNTRIES,
  US_STATES,
  PRODUCT_FEATURES,
  type ProductGoal,
} from "@/types/wizard";

function ReviewCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[var(--color-border)] rounded-lg p-4">
      <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[var(--color-text-secondary)]">{label}:</span>
      <span className="text-[var(--color-text)] font-medium">{value}</span>
    </div>
  );
}

function AccountPreview({
  accountType,
  productGoal,
}: {
  accountType: string;
  productGoal: ProductGoal;
}) {
  const features = PRODUCT_FEATURES[productGoal] || [];
  const typeLabel = accountType === "individual" ? "Individual" : "Business";
  const goalLabel = productGoal.charAt(0).toUpperCase() + productGoal.slice(1);

  return (
    <div className="bg-[var(--color-primary)] text-white rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-2">Account preview</h3>
      <p className="text-base font-medium mb-3">
        CoolPockett {goalLabel} ({typeLabel})
      </p>
      <ul className="space-y-1.5">
        {features.map((feature, index) => (
          <li key={index} className="text-sm flex items-start gap-2">
            <span className="text-green-400">•</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] p-4">
      <div className="text-center max-w-md animate-slideUp">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-2">
          Application Submitted!
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Thank you for applying to CoolPockett. We'll review your application
          and get back to you within 24 hours.
        </p>
        <Button onClick={onReset} variant="outline">
          Start New Application
        </Button>
      </div>
    </div>
  );
}

export default function Step4Review() {
  const { formData, prevStep, setSubmitted, isSubmitted, resetWizard } =
    useWizardStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { step1, step2, step3 } = formData;

  const getCountryLabel = (code: string) => {
    const country = COUNTRIES.find((c) => c.value === code);
    return country ? country.label : code;
  };

  const getStateLabel = (code: string) => {
    const state = US_STATES.find((s) => s.value === code);
    return state ? state.label : code;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (isSubmitted) {
    return <SuccessState onReset={resetWizard} />;
  }

  return (
    <WizardLayout
      currentStep={4}
      title="Review"
      onBack={prevStep}
      footer={
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <ReviewCard title="Account basics">
          <ReviewItem label="Name" value={step1.fullName} />
          <ReviewItem label="Email" value={step1.email} />
          <ReviewItem label="Phone" value={step1.phone} />
          <ReviewItem label="Country" value={getCountryLabel(step1.country)} />
        </ReviewCard>

        <ReviewCard title="Account setup">
          <ReviewItem
            label="Type"
            value={
              step2.accountType === "individual" ? "Individual" : "Business"
            }
          />
          <ReviewItem
            label="Goal"
            value={
              step2.productGoal.charAt(0).toUpperCase() +
              step2.productGoal.slice(1)
            }
          />
        </ReviewCard>

        <ReviewCard title="Details">
          {step2.accountType === "individual" && step3.individual && (
            <>
              <ReviewItem label="DOB" value={step3.individual.dob} />
              <ReviewItem label="City" value={step3.individual.city} />
            </>
          )}
          {step2.accountType === "business" && step3.business && (
            <>
              <ReviewItem
                label="Business"
                value={step3.business.businessLegalName}
              />
              <ReviewItem label="Role" value={step3.business.role} />
            </>
          )}
          {step1.country === "US" && step3.usFields && (
            <ReviewItem
              label="State"
              value={getStateLabel(step3.usFields.state)}
            />
          )}
        </ReviewCard>

        {step2.productGoal && (
          <AccountPreview
            accountType={step2.accountType}
            productGoal={step2.productGoal as ProductGoal}
          />
        )}
      </div>
    </WizardLayout>
  );
}
