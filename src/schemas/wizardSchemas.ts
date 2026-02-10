import { z } from 'zod';

export const step1Schema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[\d\s()-]{10,}$/, 'Please enter a valid phone number'),
  country: z
    .string()
    .min(1, 'Please select a country'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const step2Schema = z.object({
  accountType: z
    .enum(['individual', 'business'], {
      errorMap: () => ({ message: 'Please select an account type' }),
    }),
  productGoal: z
    .enum(['spend', 'save', 'invest'], {
      errorMap: () => ({ message: 'Please select a product goal' }),
    }),
  monthlyVolume: z.number().min(0).max(100),
});

const individualSchema = z.object({
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Please use MM/DD/YYYY format'),
  addressLine1: z
    .string()
    .min(1, 'Address is required')
    .max(200, 'Address must be less than 200 characters'),
  city: z
    .string()
    .min(1, 'City is required')
    .max(100, 'City must be less than 100 characters'),
  postalCode: z
    .string()
    .min(1, 'Postal code is required')
    .max(20, 'Postal code must be less than 20 characters'),
});

const businessSchema = z.object({
  businessLegalName: z
    .string()
    .min(1, 'Business legal name is required')
    .max(200, 'Business name must be less than 200 characters'),
  registrationCountry: z
    .string()
    .min(1, 'Please select a registration country'),
  role: z
    .string()
    .min(1, 'Role is required')
    .max(100, 'Role must be less than 100 characters'),
});

const usFieldsSchema = z.object({
  state: z.string().min(1, 'Please select a state'),
  ssnLast4: z
    .string()
    .length(4, 'SSN last 4 must be exactly 4 digits')
    .regex(/^\d{4}$/, 'SSN last 4 must be 4 digits'),
});

const inFieldsSchema = z.object({
  pan: z
    .string()
    .length(10, 'PAN must be exactly 10 characters')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN format'),
});

const otherFieldsSchema = z.object({
  nationalId: z
    .string()
    .min(1, 'National ID is required')
    .max(50, 'National ID must be less than 50 characters'),
});

export function getStep3Schema(accountType: string, country: string) {
  let schema = z.object({});

  if (accountType === 'individual') {
    schema = schema.extend({
      individual: individualSchema,
    });
  } else if (accountType === 'business') {
    schema = schema.extend({
      business: businessSchema,
    });
  }

  if (country === 'US') {
    schema = schema.extend({
      usFields: usFieldsSchema,
    });
  } else if (country === 'IN') {
    schema = schema.extend({
      inFields: inFieldsSchema,
    });
  } else if (country && country !== '') {
    schema = schema.extend({
      otherFields: otherFieldsSchema,
    });
  }

  return schema;
}

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
