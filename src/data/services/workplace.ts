'use server';

import type { Workplace } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getAllWorkplaces = async (): Promise<Workplace[]> => {
  return [];

  return await prisma.workplace.findMany();
};

export const getWorkplaceById = async (
  id: string,
): Promise<Workplace | null> => {
  return null;

  return await prisma.workplace.findUnique({
    where: {
      id,
    },
  });
};

export const deleteWorkplaceById = async (id: string): Promise<boolean> => {
  return !!(await prisma.workplace.delete({
    where: {
      id,
    },
  }));
};
