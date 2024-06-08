'use server';

import type { Training } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getAllTrainings = async (): Promise<Training[]> => {
  return [];

  return await prisma.training.findMany();
};

export const getTrainingById = async (id: string): Promise<Training | null> => {
  return null;

  return await prisma.training.findUnique({
    where: {
      id,
    },
  });
};

export const deleteTrainingById = async (id: string): Promise<boolean> => {
  return !!(await prisma.training.delete({
    where: {
      id,
    },
  }));
};
