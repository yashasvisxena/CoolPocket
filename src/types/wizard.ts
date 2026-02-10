export type AccountType = 'individual' | 'business';
export type ProductGoal = 'spend' | 'save' | 'invest';
export type Country = 'US' | 'IN' | 'UK' | 'CA' | 'AU' | 'DE' | 'FR' | 'OTHER';

export interface Step1Data {
  fullName: string;
  email: string;
  phone: string;
  country: Country | '';
  password: string;
}

export interface Step2Data {
  accountType: AccountType | '';
  productGoal: ProductGoal | '';
  monthlyVolume: number;
}

export interface IndividualDetails {
  dob: string;
  addressLine1: string;
  city: string;
  postalCode: string;
}

export interface BusinessDetails {
  businessLegalName: string;
  registrationCountry: Country | '';
  role: string;
}

export interface USFields {
  state: string;
  ssnLast4: string;
}

export interface INFields {
  pan: string;
}

export interface OtherCountryFields {
  nationalId: string;
}

export interface Step3Data {
  individual?: IndividualDetails;
  business?: BusinessDetails;
  usFields?: USFields;
  inFields?: INFields;
  otherFields?: OtherCountryFields;
  documentFileName?: string;
}

export interface WizardFormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

export interface WizardState {
  currentStep: number;
  formData: WizardFormData;
  isSubmitted: boolean;
}

export const TOTAL_STEPS = 4;

export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
] as const;

export const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'IN', label: 'India' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'OTHER', label: 'Other' },
] as const;

export const PRODUCT_FEATURES: Record<ProductGoal, string[]> = {
  spend: [
    'Instant spending notifications',
    'Budgeting tools included',
    'No monthly fees',
  ],
  save: [
    'High-yield savings account',
    'Automated savings rules',
    'Goal tracking',
  ],
  invest: [
    'Commission-free trading',
    'Fractional shares',
    'Portfolio insights',
  ],
};
