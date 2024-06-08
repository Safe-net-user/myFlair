'use server';

import type { AdditionalService } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getAllAdditionalServices = async (): Promise<
  AdditionalService[]
> => {
  return [];

  return await prisma.additionalService.findMany();
};

export const getAdditionalService = async (
  id: string,
): Promise<AdditionalService | null> => {
  return null;

  return await prisma.additionalService.findUnique({
    where: {
      id,
    },
  });
};

export const deleteAdditionalServiceById = async (
  id: string,
): Promise<boolean> => {
  return !!(await prisma.additionalService.delete({
    where: {
      id,
    },
  }));
};
