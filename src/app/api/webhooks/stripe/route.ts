import { NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe';

import { prisma } from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as Stripe.Event;

  switch (body.type) {
    case 'checkout.session.completed': {
      const session = body.data.object as Stripe.Checkout.Session;
      const stripeCustomerId = session.customer;

      let user = null;
      if (stripeCustomerId) {
        user = await prisma.user.findFirst({
          where: {
            stripeCustomerId: stripeCustomerId as string,
          },
        });
      }

      if (!user?.id) break;

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          subscription: SubscriptionType.MONTHLY,
        },
      });
      break;
    }

    case 'invoice.paid': {
      const invoice = body.data.object as Stripe.Invoice;
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = body.data.object as Stripe.Invoice;
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = body.data.object as Stripe.Subscription;
      break;
    }

    default:
      break;
  }

  return NextResponse.json({
    success: true,
  });
};

const findUserFromCustomer = async (stripeCustomerId: unknown) => {
  if (typeof stripeCustomerId !== 'string') return null;

  return prisma.user.findFirst({
    where: {
      stripeCustomerId,
    },
  });
};
