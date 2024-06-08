'use server';

import type { ServerActionReturn } from '@/types';

import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { DEFAULT_ERROR } from '@/lib/utils';

import { ForgotPassword } from '@/components/email';

export const forgotPassword = async (
  to: string,
): Promise<ServerActionReturn> => {
  const uuid = crypto.randomUUID();

  try {
    await prisma.user.update({
      where: {
        email: to,
      },
      data: {
        forgotPassword: uuid,
      },
    });

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject: 'Réinitialisation de mot de passe',
      react: ForgotPassword(uuid),
    });

    if (error)
      return {
        success: false,
        error: DEFAULT_ERROR,
      };
  } catch (_) {
    return {
      success: false,
      error: DEFAULT_ERROR,
    };
  }

  return { success: true };
};
