'use server';

import type { AdditionalService } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getAllAdditionalServices = async (): Promise<
  AdditionalService[]
> =>
  await prisma.additionalService.findMany({
    cacheStrategy: {
      ttl: 60 * 60,
    },
  });
