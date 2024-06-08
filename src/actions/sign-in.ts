'use server';

import type { ServerActionReturn } from '@/types';

import * as z from 'zod';

import { AuthError } from 'next-auth';

import { signInSchema } from '@/schemas';
import { signIn as nextAuthSignIn } from '@/auth';
import { CREDENTIALS_SIGNIN_ERROR, DEFAULT_ERROR } from '@/lib/utils';

export const signIn = async (
  credentials: Readonly<z.infer<typeof signInSchema>>,
): Promise<ServerActionReturn> => {
  const parsedCredentials = signInSchema.safeParse(credentials);

  if (parsedCredentials.success) {
    try {
      await nextAuthSignIn('credentials', {
        ...parsedCredentials.data,
        redirect: false,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        if (error.type === 'CredentialsSignin')
          return {
            success: false,
            error: CREDENTIALS_SIGNIN_ERROR,
          };
      }
    }

    return { success: true };
  }

  return {
    success: false,
    error: DEFAULT_ERROR,
  };
};
