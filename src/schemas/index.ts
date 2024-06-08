import * as z from 'zod';

import { UserRole } from '@prisma/client';

/* Generic schemas */
const emailSchema = z.string().email({
  message: 'E-mail invalide !',
});

export const passwordSchema = z.string().min(8, {
  message: 'Mot de passe invalide !',
});

const phoneSchema = z
  .string()
  .refine(
    (a) =>
      a.match(
        /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/,
      ),
    {
      message: 'Numéro de téléphone invalide !',
    },
  );

const addressSchema = z.object({
  street: z.string(),
  postalCode: z
    .string()
    .length(5, {
      message: 'Code postal invalide !',
    })
    .refine((a) => a.match(/^\d+$/), {
      message: 'Code postal invalide !',
    }),
  town: z.string(),
});

const dateRangeSchema = z.object({
  from: z.union([z.date(), z.undefined()]),
  to: z.union([z.date(), z.undefined()]),
});

/* Auth Schemas */
export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  remember: z.boolean().or(
    z
      .string()
      .toLowerCase()
      .transform((a) => a === 'true')
      .pipe(z.boolean()),
  ),
  redirect: z.boolean().optional(),
  callbackUrl: z.string().optional(),
});

export const signUpSchema = z.object({
  image: z.string(),
  role: z.enum([
    UserRole.PERSONAL,
    UserRole.PROFESSIONAL,
    UserRole.ADMINISTRATOR,
  ]),
  username: z.string(),
  lastName: z.string(),
  firstName: z.string(),
  enterprise: z.string().optional(),
  email: emailSchema,
  password: passwordSchema,
  phone: z.string(),
  address: addressSchema,
});

/*** Update Schemas ***/
export const updatePasswordSchema = z.object({
  current: passwordSchema,
  new: passwordSchema,
});

export const updatePhoneSchema = z.object({
  current: phoneSchema,
  new: phoneSchema,
});

/*  */
export const businessBoosterSchema = z.object({
  image: z.string().url(),
  alt: z.string(),
  title: z.string(),
  description: z.string(),
  quantity: z.number(),
  price: z.number(),
  dates: dateRangeSchema.array(),
});

export const paymentSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  enterprise: z.string(),
  street: z.string(),
  postalCode: z
    .string()
    .length(5, {
      message: 'Code postal invalide !',
    })
    .refine((a) => a.match(/^\d+$/), {
      message: 'Code postal invalide !',
    }),
  town: z.string(),
  email: emailSchema,
  phone: z.string(),
});

export const notificationsSchema = z.object({
  email: z.object({
    general: z.boolean().optional(),
    reservations: z.boolean().optional(),
  }),
  inApp: z.object({
    general: z.boolean().optional(),
    reservations: z.boolean().optional(),
  }),
});
