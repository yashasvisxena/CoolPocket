import { useEffect, useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WizardLayout } from "@/components/wizard";
import { Input, Select, Button, FileUpload } from "@/components/ui";
import { useWizardStore } from "@/store/wizardStore";
import { getStep3Schema } from "@/schemas/wizardSchemas";
import { COUNTRIES, US_STATES, type Step3Data } from "@/types/wizard";
import { useAutoSave } from "@/hooks/useAutoSave";

export default function Step3Details() {
  const { formData, updateStep3, nextStep, prevStep } = useWizardStore();

  const accountType = formData.step2.accountType;
  const country = formData.step1.country;

  const schema = useMemo(
    () => getStep3Schema(accountType, country),
    [accountType, country],
  );

  const getDefaultValues = (): Step3Data => {
    const defaults: Step3Data = {};

    if (accountType === "individual") {
      defaults.individual = formData.step3.individual || {
        dob: "",
        addressLine1: "",
        city: "",
        postalCode: "",
      };
    } else if (accountType === "business") {
      defaults.business = formData.step3.business || {
        businessLegalName: "",
        registrationCountry: "",
        role: "",
      };
    }

    if (country === "US") {
      defaults.usFields = formData.step3.usFields || {
        state: "",
        ssnLast4: "",
      };
    } else if (country === "IN") {
      defaults.inFields = formData.step3.inFields || {
        pan: "",
      };
    } else if (country && country !== ("" as string)) {
      defaults.otherFields = formData.step3.otherFields || {
        nationalId: "",
      };
    }

    return defaults;
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<Step3Data>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: getDefaultValues(),
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(getDefaultValues());
  }, [accountType, country]);

  const handleAutoSave = useCallback(
    (values: Step3Data) => updateStep3(values),
    [updateStep3],
  );
  useAutoSave(watch, handleAutoSave);

  const onSubmit = (data: Step3Data) => {
    updateStep3({
      ...data,
      documentFileName: formData.step3.documentFileName,
    });
    nextStep();
  };

  const handleFileSelect = (fileName: string) => {
    updateStep3({ documentFileName: fileName });
  };

  const getCountryLabel = () => {
    const countryObj = COUNTRIES.find((c) => c.value === country);
    return countryObj ? countryObj.label : country;
  };

  return (
    <WizardLayout
      currentStep={3}
      title="Details"
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
          <Button type="submit" form="step3-form" className="flex-1">
            Next
          </Button>
        </div>
      }
    >
      <div className="mb-6 p-3 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Based on: {accountType === "individual" ? "Individual" : "Business"} +{" "}
          {getCountryLabel()}
        </p>
      </div>

      <form
        id="step3-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {accountType === "individual" && (
          <>
            <Input
              label="Date of birth"
              placeholder="MM/DD/YYYY"
              error={errors.individual?.dob?.message}
              {...register("individual.dob")}
            />
            <Input
              label="Address line 1"
              placeholder="Enter address"
              error={errors.individual?.addressLine1?.message}
              {...register("individual.addressLine1")}
            />
            <Input
              label="City"
              placeholder="Enter city"
              error={errors.individual?.city?.message}
              {...register("individual.city")}
            />
            <Input
              label="Postal code"
              placeholder="Enter ZIP"
              error={errors.individual?.postalCode?.message}
              {...register("individual.postalCode")}
            />
          </>
        )}

        {accountType === "business" && (
          <>
            <Input
              label="Business legal name"
              placeholder="Enter business name"
              error={errors.business?.businessLegalName?.message}
              {...register("business.businessLegalName")}
            />
            <Controller
              name="business.registrationCountry"
              control={control}
              render={({ field }) => (
                <Select
                  label="Registration country"
                  placeholder="Select country"
                  options={COUNTRIES}
                  error={errors.business?.registrationCountry?.message}
                  {...field}
                />
              )}
            />
            <Input
              label="Your role"
              placeholder="e.g., CEO, Director"
              error={errors.business?.role?.message}
              {...register("business.role")}
            />
          </>
        )}

        {country === "US" && (
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
            <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">
              US-specific
            </p>
            <div className="flex flex-col gap-4">
              <Controller
                name="usFields.state"
                control={control}
                render={({ field }) => (
                  <Select
                    label="State"
                    placeholder="Select state"
                    options={US_STATES}
                    error={errors.usFields?.state?.message}
                    {...field}
                  />
                )}
              />
              <Input
                label="SSN last 4"
                placeholder="••••"
                maxLength={4}
                error={errors.usFields?.ssnLast4?.message}
                {...register("usFields.ssnLast4")}
              />
            </div>
          </div>
        )}

        {country === "IN" && (
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
            <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">
              India-specific
            </p>
            <Input
              label="PAN"
              placeholder="ABCDE1234F"
              maxLength={10}
              error={errors.inFields?.pan?.message}
              {...register("inFields.pan")}
            />
          </div>
        )}

        {country && country !== "US" && country !== "IN" && (
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
            <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">
              Identification
            </p>
            <Input
              label="National ID"
              placeholder="Enter national ID"
              error={errors.otherFields?.nationalId?.message}
              {...register("otherFields.nationalId")}
            />
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
          <FileUpload
            label="Upload document"
            fileName={formData.step3.documentFileName}
            onFileSelect={handleFileSelect}
          />
        </div>
      </form>
    </WizardLayout>
  );
}
