'use server';

import { UserRole, type User } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getAllServices = async () => {
  return [];

  return await prisma.service.findMany();
};

export const getProfessionalsByTown = async (town: string): Promise<User[]> => {
  return await prisma.user.findMany({
    where: {
      role: UserRole.PROFESSIONAL,
      address: {
        path: ['town'],
        equals: town,
      },
    },
  });
};

export const getProfessionalsByService = async (
  service: string,
): Promise<User[]> => {
  return await prisma.user.findMany({
    where: {
      service,
    },
  });
};
