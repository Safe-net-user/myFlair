'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const buy = async () => {
  const user = (await auth())?.user;

  const session = await stripe.checkout.sessions.create({
    customer: user?.stripeCustomerId,
    mode: 'payment',
  });
};
