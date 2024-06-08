'use server';

import type { ServerActionReturn } from '@/types';

import * as z from 'zod';

import { addDays } from 'date-fns';

import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { signUpSchema } from '@/schemas';
import { CREDENTIALS_SIGNUP_ERROR, DEFAULT_ERROR, hash } from '@/lib/utils';

export const signUp = async (
  credentials: Readonly<z.infer<typeof signUpSchema>>,
): Promise<ServerActionReturn> => {
  const parsedCredentials = signUpSchema.safeParse(credentials);

  if (parsedCredentials.success) {
    try {
      const { id, email } = await prisma.user.create({
        data: {
          ...parsedCredentials.data,
          password: hash(parsedCredentials.data.password),
          preferences: {
            dates: {
              from: new Date(),
              to: addDays(new Date(), 30),
            },
            notifications: {
              inApp: {
                general: false,
                reservations: false,
              },
              email: {
                general: false,
                reservations: false,
              },
            },
          },
        },
      });

      const stripeCustomer = await stripe.customers.create({
        email,
      });

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          stripeCustomerId: stripeCustomer.id,
        },
      });
    } catch (_) {
      console.log('ERROR : ', _);
      return {
        success: false,
        error: DEFAULT_ERROR,
      };
    }

    return { success: true };
  }

  return {
    success: false,
    error: CREDENTIALS_SIGNUP_ERROR,
  };
};
