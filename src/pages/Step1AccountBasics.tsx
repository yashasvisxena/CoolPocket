import { useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WizardLayout } from "@/components/wizard";
import { Input, Select, PasswordInput, Button } from "@/components/ui";
import { useWizardStore } from "@/store/wizardStore";
import { step1Schema, type Step1FormData } from "@/schemas/wizardSchemas";
import { COUNTRIES, type Step1Data } from "@/types/wizard";
import { useAutoSave } from "@/hooks/useAutoSave";

export default function Step1AccountBasics() {
  const { formData, updateStep1, nextStep } = useWizardStore();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData.step1,
    mode: "onSubmit",
  });

  // Sync form with store on mount only (not on every store change,
  // since useAutoSave already keeps them in sync and reset() clears validation state)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset(formData.step1), []);

  // Auto-save form values to store on change (survives reload)
  const handleAutoSave = useCallback(
    (values: Step1FormData) => updateStep1(values as Step1Data),
    [updateStep1],
  );
  useAutoSave(watch, handleAutoSave);

  const onSubmit = (data: Step1FormData) => {
    updateStep1(data as Step1Data);
    nextStep();
  };

  return (
    <WizardLayout
      currentStep={1}
      title="Account basics"
      footer={
        <Button type="submit" form="step1-form" fullWidth>
          Next
        </Button>
      }
    >
      <form
        id="step1-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Input
          label="Full name"
          placeholder="Enter name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Phone"
          type="tel"
          placeholder="Enter phone"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              label="Country of residency"
              placeholder="Select country"
              options={COUNTRIES}
              error={errors.country?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="Password"
              placeholder=""
              error={errors.password?.message}
              {...field}
            />
          )}
        />
      </form>
    </WizardLayout>
  );
}
