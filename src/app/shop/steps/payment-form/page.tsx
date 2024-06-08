'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PaymentFormContext } from '@/contexts/payment-form';
import { useUserContext } from '@/contexts/user';
import { paymentSchema } from '@/schemas';

import {
  BillingInformationForm,
  Cart,
  BankCardInformationForm,
} from '@/components/shop/steps/payment';

export default function PaymentStep() {
  const { user } = useUserContext();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      lastName: user?.lastName,
      firstName: user?.firstName,
    },
  });

  return (
    <PaymentFormContext.Provider value={form}>
      <div className="flex flex-col space-y-16 py-16">
        <BillingInformationForm />
        <Cart />
        <BankCardInformationForm />
      </div>
    </PaymentFormContext.Provider>
  );
}
