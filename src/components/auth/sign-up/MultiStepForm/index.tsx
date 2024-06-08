'use client';

import Link from 'next/link';
import { useState } from 'react';
import { UserRole } from '@prisma/client';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

import { SubmitButton } from '@/components/button';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSignUpFormContext } from '@/contexts/sign-up-form';

const steps = [
  <Step1 key={0} />,
  <Step2 key={1} />,
  <Step3 key={2} />,
  <Step4 key={3} />,
];

export default function MutliStepForm({
  pending,
}: Readonly<{ pending: boolean }>) {
  const form = useSignUpFormContext();

  const [step, setStep] = useState(0);

  function validateStep(step: number) {
    switch (step) {
      case 0:
        if (form.getValues('role')) {
          return true;
        } else {
          return false;
        }
      case 1:
        if (form.getValues('role') === UserRole.PROFESSIONAL) {
          if (
            form.getValues('image') &&
            form.getValues('enterprise') &&
            form.getValues('firstName') &&
            form.getValues('lastName') &&
            form.getValues('username') &&
            form.getValues('email') &&
            form.getValues('password') &&
            form.getValues('phone')
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          if (
            form.getValues('image') &&
            form.getValues('firstName') &&
            form.getValues('lastName') &&
            form.getValues('username') &&
            form.getValues('email') &&
            form.getValues('password') &&
            form.getValues('phone')
          ) {
            return true;
          } else {
            return false;
          }
        }
      case 2:
        if (
          form.getValues('address.street') &&
          form.getValues('address.postalCode') &&
          form.getValues('address.town')
        ) {
          return true;
        } else {
          return false;
        }
      default:
        break;
    }
  }

  return (
    <>
      <Progress
        className="w-full rounded-none"
        value={((step + 1) / steps.length) * 100}
      />

      <div className="flex flex-col items-center justify-center space-y-12 py-16">
        {steps[step]}

        <p className="text-xs">
          Vous avez déjà un compte ?{' '}
          <Link href="/auth/sign-in">
            <Button className="h-0 p-0 text-xs" role="link" variant="link">
              Se connecter
            </Button>
          </Link>
        </p>

        <div className="flex justify-between gap-28">
          <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Précédent
          </Button>
          {step < steps.length - 1 && (
            <div
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:cursor-pointer hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              onClick={() => {
                if (validateStep(step)) {
                  setStep(step + 1);
                }
              }}
            >
              Suivant
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
