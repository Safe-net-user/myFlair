'use server';

import type { Reservation } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getAllReservationsByPersonalId = async (
  personalId: string,
): Promise<Reservation[]> =>
  await prisma.reservation.findMany({
    where: { personalId },
  });

export const getAllReservationsByProfessionalId = async (
  professionalId: string,
): Promise<Reservation[]> =>
  await prisma.reservation.findMany({
    where: { professionalId },
  });

export const updateReservationById = async (
  id: string,
  data: Partial<Reservation>,
) =>
  await prisma.reservation.update({
    where: { id },
    data,
  });
