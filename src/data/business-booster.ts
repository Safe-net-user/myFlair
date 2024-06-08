'use server';

import type { BusinessBooster } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getAllBusinessBoosters = async (): Promise<BusinessBooster[]> =>
  await prisma.businessBooster.findMany();

export const getBusinessBoosterById = async (
  id: string,
): Promise<BusinessBooster | null> =>
  await prisma.businessBooster.findFirst({
    where: { id },
  });

export const updateBusinessBoosterById = async (
  id: string,
  data: any, // TODO: Replace by a true type
): Promise<boolean> =>
  !!(await prisma.businessBooster.update({
    where: { id },
    data,
  }));

export const deleteBusinessBoosterById = async (id: string): Promise<boolean> =>
  !!(await prisma.businessBooster.delete({
    where: { id },
  }));
