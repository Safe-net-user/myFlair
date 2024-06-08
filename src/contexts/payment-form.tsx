'use client';

import * as z from 'zod';

import { createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { paymentSchema } from '@/schemas';

export const PaymentFormContext = createContext(
  {} as UseFormReturn<z.infer<typeof paymentSchema>>,
);
PaymentFormContext.displayName = 'PaymentFormContext';

export const usePaymentFormContext = () => {
  const context = useContext(PaymentFormContext);

  if (!context)
    throw new Error(
      'usePaymentFormContext must be used within a PaymentFormContext.Provider.',
    );

  return context;
};
