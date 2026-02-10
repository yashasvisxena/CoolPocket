import { useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WizardLayout } from "@/components/wizard";
import {
  Button,
  SelectableCard,
  SelectableCardGroup,
  Slider,
} from "@/components/ui";
import { useWizardStore } from "@/store/wizardStore";
import { step2Schema, type Step2FormData } from "@/schemas/wizardSchemas";
import type { AccountType, ProductGoal, Step2Data } from "@/types/wizard";
import { useAutoSave } from "@/hooks/useAutoSave";

export default function Step2AccountSetup() {
  const { formData, updateStep2, nextStep, prevStep } = useWizardStore();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      accountType: formData.step2.accountType || undefined,
      productGoal: formData.step2.productGoal || undefined,
      monthlyVolume: formData.step2.monthlyVolume,
    },
    mode: "onSubmit",
  });

  // Sync form with store on mount only (auto-save keeps them in sync afterward)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    reset({
      accountType: formData.step2.accountType || undefined,
      productGoal: formData.step2.productGoal || undefined,
      monthlyVolume: formData.step2.monthlyVolume,
    });
  }, []);

  // Auto-save form values to store on change (survives reload)
  const handleAutoSave = useCallback(
    (values: Step2FormData) => updateStep2(values as Step2Data),
    [updateStep2],
  );
  useAutoSave(watch, handleAutoSave);

  const accountType = watch("accountType");
  const productGoal = watch("productGoal");

  const onSubmit = (data: Step2FormData) => {
    updateStep2(data as Step2Data);
    nextStep();
  };

  return (
    <WizardLayout
      currentStep={2}
      title="Account setup"
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
          <Button type="submit" form="step2-form" className="flex-1">
            Next
          </Button>
        </div>
      }
    >
      <form
        id="step2-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <SelectableCardGroup
          label="Account type"
          error={errors.accountType?.message}
          horizontal
        >
          <SelectableCard
            selected={accountType === "individual"}
            onSelect={() =>
              setValue("accountType", "individual" as AccountType, {
                shouldValidate: true,
              })
            }
          >
            <span className="font-medium">Individual</span>
          </SelectableCard>
          <SelectableCard
            selected={accountType === "business"}
            onSelect={() =>
              setValue("accountType", "business" as AccountType, {
                shouldValidate: true,
              })
            }
          >
            <span className="font-medium">Business</span>
          </SelectableCard>
        </SelectableCardGroup>

        <SelectableCardGroup
          label="Product goal"
          error={errors.productGoal?.message}
        >
          <SelectableCard
            selected={productGoal === "spend"}
            onSelect={() =>
              setValue("productGoal", "spend" as ProductGoal, {
                shouldValidate: true,
              })
            }
          >
            <span className="font-medium">Spend</span>
          </SelectableCard>
          <SelectableCard
            selected={productGoal === "save"}
            onSelect={() =>
              setValue("productGoal", "save" as ProductGoal, {
                shouldValidate: true,
              })
            }
          >
            <span className="font-medium">Save</span>
          </SelectableCard>
          <SelectableCard
            selected={productGoal === "invest"}
            onSelect={() =>
              setValue("productGoal", "invest" as ProductGoal, {
                shouldValidate: true,
              })
            }
          >
            <span className="font-medium">Invest</span>
          </SelectableCard>
        </SelectableCardGroup>

        <Controller
          name="monthlyVolume"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Slider
              label="Monthly volume"
              min={0}
              max={100}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              {...field}
            />
          )}
        />
      </form>
    </WizardLayout>
  );
}
