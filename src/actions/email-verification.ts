'use server';

import { resend } from '@/lib/resend';
import { DEFAULT_ERROR } from '@/lib/utils';

import { EmailVerification } from '@/components/email';

export const emailVerification = async (to: string, otp: string) => {
  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject: 'Vérification par e-mail',
      react: EmailVerification(otp),
    });

    if (error) {
      console.log('email error : ', error);
      return {
        success: false,
        error: DEFAULT_ERROR,
      };
    }
  } catch (_) {
    console.log('email error from catch : ', _);
    return {
      success: false,
      error: DEFAULT_ERROR,
    };
  }

  return { success: true };
};
