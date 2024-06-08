'use client';

import * as z from 'zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

import { updateUserByUserForgotPassword } from '@/data/user';
import { passwordSchema } from '@/schemas';

import { error, toastAction } from '@/components/toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SubmitButton } from '@/components/button';

const resetPasswordSchema = z.object({
  first: passwordSchema,
  second: passwordSchema,
});

export default function ProfessionalPage({
  params: { slug },
}: Readonly<{ params: { slug: string } }>) {
  const { toast } = useToast();

  const [pending, setPending] = useState(false);
  const [hiddenFirst, setHiddenFirst] = useState(true);
  const [hiddenSecond, setHiddenSecond] = useState(true);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      first: '',
      second: '',
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    if (values.first !== values.second) {
      error(toast, {
        description: 'Les mots de passe sont différents !',
      });
      return;
    }

    setPending(true);

    const response = await updateUserByUserForgotPassword(slug, values.second);

    setPending(false);

    if (response) {
      window.location.href = '/auth/sign-in';
    } else {
      error(toast, {
        action: toastAction(form.handleSubmit(onSubmit)),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center justify-center space-y-12 py-16"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="first"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex h-9 w-[200px] rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                          <div className="flex items-center justify-center border-r px-3 py-1">
                            {hiddenFirst ? (
                              <EyeClosedIcon
                                className="h-4 w-4"
                                onClick={() => setHiddenFirst(false)}
                              />
                            ) : (
                              <EyeOpenIcon
                                className="h-4 w-4"
                                onClick={() => setHiddenFirst(true)}
                              />
                            )}
                          </div>

                          <Input
                            {...field}
                            className="rounded-none rounded-br-md rounded-tr-md border-none px-3 py-1 pl-1.5"
                            placeholder="Mot de passe"
                            type={hiddenFirst ? 'password' : 'text'}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>&gt;= 8 caractères</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <FormMessage />
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="second"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex h-9 w-[200px] rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                          <div className="flex items-center justify-center border-r px-3 py-1">
                            {hiddenSecond ? (
                              <EyeClosedIcon
                                className="h-4 w-4"
                                onClick={() => setHiddenSecond(false)}
                              />
                            ) : (
                              <EyeOpenIcon
                                className="h-4 w-4"
                                onClick={() => setHiddenSecond(true)}
                              />
                            )}
                          </div>

                          <Input
                            {...field}
                            className="rounded-none rounded-br-md rounded-tr-md border-none px-3 py-1 pl-1.5"
                            placeholder="Mot de passe"
                            type={hiddenSecond ? 'password' : 'text'}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>&gt;= 8 caractères</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <FormMessage />
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <SubmitButton pending={pending}>Réinitialiser</SubmitButton>
      </form>
    </Form>
  );
}
