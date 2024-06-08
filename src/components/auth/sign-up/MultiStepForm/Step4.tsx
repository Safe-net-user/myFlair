'use client';

import { useEffect, useState } from 'react';

import { emailVerification } from '@/actions/email-verification';
import { useSignUpFormContext } from '@/contexts/sign-up-form';

import { SubmitButton } from '@/components/button';
import { error } from '@/components/toast';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useToast } from '@/components/ui/use-toast';

export default function Step4() {
  const form = useSignUpFormContext();
  const { toast } = useToast();

  const [pending, setPending] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientOtp, setClientOtp] = useState('');
  const [serverOtp, setServerOtp] = useState('');

  async function send(email: string) {
    const otp = Math.floor(100_000 + Math.random() * 900_000).toString();

    const response = await emailVerification(email, otp);

    if (response.success) {
      setServerOtp(otp);
    } else {
      error(toast, {
        /* @ts-ignore */
        action: () => send(email),
        description: response.error,
      });
    }
  }

  async function handleOnComplete(otp: string) {
    setDisabled(!(clientOtp === serverOtp));
  }

  useEffect(() => {
    (async () => {
      await send(form.getValues('email'));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-8 py-16">
        Entrez le code que vous avez reçu par e-mail.
        <InputOTP
          maxLength={6}
          onChange={setClientOtp}
          onComplete={handleOnComplete}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <SubmitButton pending={pending} disabled={disabled}>
        S&apos;inscrire
      </SubmitButton>
    </>
  );
}
