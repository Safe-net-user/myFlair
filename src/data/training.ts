'use server';

import type { Training } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getAllTrainings = async (): Promise<Training[]> =>
  await prisma.training.findMany({
    cacheStrategy: {
      ttl: 60 * 60,
    },
  });
