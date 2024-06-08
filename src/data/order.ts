'use server';

import type { Order } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getOrderById = async (id: string): Promise<Order | null> =>
  await prisma.order.findFirst({
    where: {
      id,
    },
    cacheStrategy: {
      ttl: 60,
    },
  });
