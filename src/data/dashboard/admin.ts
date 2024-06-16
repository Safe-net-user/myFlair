'use server';

import type { DateRange } from 'react-day-picker';

import { prisma } from '@/lib/prisma';

export const getTransactionCountByDateRange = async (
  dateRange: DateRange | undefined,
): Promise<number> => {
  return 0;

  if (!dateRange?.from) return await prisma.transaction.count();

  return await prisma.transaction.count({
    where: {
      createdAt: {
        lte: dateRange?.to,
        gte: dateRange?.from,
      },
    },
  });
};

export const getTurnoverExcludingTaxByDateRange = async (
  dateRange: DateRange | undefined,
): Promise<number> => {
  return 0;
  let transactions;

  if (!dateRange?.from) {
    transactions = await prisma.transaction.findMany();
  } else {
    transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          lte: dateRange?.to,
          gte: dateRange?.from,
        },
      },
    });
  }

  let sum = 0;

  transactions.forEach(
    (transaction: any) => (sum += transaction.amountExcludingTax),
  );

  return sum;
};

export const getTurnoverIncludingTaxByDateRange = async (
  dateRange: DateRange | undefined,
): Promise<number> => {
  return 0;

  let transactions;

  if (!dateRange?.from) {
    transactions = await prisma.transaction.findMany();
  } else {
    transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          lte: dateRange?.to,
          gte: dateRange?.from,
        },
      },
    });
  }

  let sum = 0;

  transactions.forEach(
    (transaction: any) => (sum += transaction.amountIncludingTax),
  );

  return sum;
};

