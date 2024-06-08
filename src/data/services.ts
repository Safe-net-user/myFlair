'use server';

import type {
  AdditionalService,
  BusinessBooster,
  Subscription,
  Training,
  Post,
} from '@prisma/client';

import * as z from 'zod';

import { prisma } from '@/lib/prisma';
import { businessBoosterSchema } from '@/schemas';

export const getAllWorkplaces = async (): Promise<Post[]> => {
  return [];

  return await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getAllBusinessBoosters = async (): Promise<BusinessBooster[]> => {
  return [];

  return await prisma.businessBooster.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getBusinessBoosterById = async (
  id: string,
): Promise<BusinessBooster | null> => {
  return null;

  return await prisma.businessBooster.findUnique({
    where: {
      id,
    },
  });
};

export const createBusinessBooster = async (
  data: z.infer<typeof businessBoosterSchema>,
): Promise<boolean> => {
  let success;

  try {
    success = await prisma.businessBooster.create({ data });
  } catch (_) {
    return false;
  }

  return !!success;
};

export const updateBusinessBoosterById = async (
  id: string,
  data: z.infer<typeof businessBoosterSchema>,
): Promise<boolean> => {
  let success;

  try {
    /*     success = await prisma.businessBooster.update({
      where: {
        id,
      },
      data,
    }); */
  } catch (_) {
    return false;
  }

  return !!success;
};

export const deleteBusinessBoostersById = async (
  ids: string[],
): Promise<boolean> => {
  let success;

  try {
    success = await prisma.businessBooster.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  } catch (_) {
    return false;
  }

  return !!success;
};

export const getAllAdditionalServices = async (): Promise<
  AdditionalService[]
> => {
  return [];

  return await prisma.additionalService.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getAllTrainings = async (): Promise<Training[]> => {
  return [];

  return await prisma.training.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getAllSubscriptions = async (): Promise<Subscription[]> => {
  return [];

  return await prisma.subscription.findMany({
    cacheStrategy: {
      swr: 60 * 60,
      ttl: 60 * 60,
    },
  });
};



