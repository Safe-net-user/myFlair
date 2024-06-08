'use client';

import type { UseFormReturn } from 'react-hook-form';

import * as z from 'zod';

import { createContext, useContext } from 'react';

import { signUpSchema } from '@/schemas';

export const SignUpFormContext = createContext(
  {} as UseFormReturn<z.infer<typeof signUpSchema>>,
);
SignUpFormContext.displayName = 'SignUpFormContext';

export const useSignUpFormContext = () => {
  const context = useContext(SignUpFormContext);

  if (!context)
    throw new Error(
      'useSignUpFormContext must be used within a SignUpFormContext.Provider.',
    );

  return context;
};
