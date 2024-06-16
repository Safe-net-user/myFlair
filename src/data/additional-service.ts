'use server';

import type { AdditionalService } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export const getAllAdditionalServices = async (): Promise<AdditionalService[]> => {
  try {
    const services = await prisma.additionalService.findMany({
      cacheStrategy: {
        ttl: 60 * 60, 
      },
    });
    return services;
  } catch (error) {
    console.error('Error fetching additional services:', error);
    throw error;
  }
};
