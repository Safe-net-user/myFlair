'use client';

import { useState } from 'react';
import { MailIcon } from 'lucide-react';

import { forgotPassword } from '@/actions/forgot-password';

import { SubmitButton } from '@/components/button';
import { error, success, toastAction } from '@/components/toast';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const [value, setValue] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit() {
    setPending(true);

    const response = await forgotPassword(value);

    setPending(false);

    if (response.success) {
      success(toast, {
        description: 'E-mail envoyé avec succès !',
      });
    } else {
      error(toast, {
        description: response.error,
        action: toastAction(onSubmit),
      });
    }
  }

  return (
    <main className="flex flex-col items-center justify-center space-y-8 py-16">
      <p>Renseignez votre e-mail et regardez dans votre boîte</p>

      <div className="flex flex-row gap-x-2">
        <div className="flex h-9 w-[200px] rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <div className="flex items-center justify-center border-r px-3 py-1">
            <MailIcon className="h-4 w-4" />
          </div>

          <Input
            className="rounded-none rounded-br-md rounded-tr-md border-none px-3 py-1 pl-1.5"
            placeholder="E-mail"
            type="email"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>

        <SubmitButton pending={pending} onClick={onSubmit}>
          Envoyer
        </SubmitButton>
      </div>
    </main>
  );
}
