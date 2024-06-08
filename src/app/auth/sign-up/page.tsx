'use client';

import * as z from 'zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserRole } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

import { signUp } from '@/actions/sign-up';
import { SignUpFormContext } from '@/contexts/sign-up-form';
import { signUpSchema } from '@/schemas';

import MultiStepForm from '@/components/auth/sign-up/MultiStepForm';
import { error, toastAction } from '@/components/toast';

import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

export default function SignUpPage() {
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: UserRole.PERSONAL,
      email: '',
      password: '',
      phone: '',
      address: {
        postalCode: '',
      },
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setPending(true);

    const response = await signUp(values);

    setPending(false);

    if (response.success) {
      window.location.href = '/auth/sign-in';
    } else {
      error(toast, {
        action: toastAction(form.handleSubmit(onSubmit)),
      });
    }
  }

  return (
    <SignUpFormContext.Provider value={form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MultiStepForm pending={pending} />
        </form>
      </Form>
    </SignUpFormContext.Provider>
  );
}
