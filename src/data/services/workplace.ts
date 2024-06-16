'use server';

import type { Post } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getAllWorkplaces = async (): Promise<Post[]> => {
  return await prisma.post.findMany();
};

export const getWorkplaceById = async (
  id: number,
): Promise<Post | null> => {

  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
};


export const deleteWorkplaceById = async (id: number): Promise<void> => {
  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    console.log(`Poste de travail avec l'ID ${id} supprimé avec succès.`);
  } catch (error) {
    console.error(`Erreur lors de la suppression du poste de travail avec l'ID ${id}:`, error);
    throw new Error(`Erreur lors de la suppression du poste de travail avec l'ID ${id}`);
  }
};