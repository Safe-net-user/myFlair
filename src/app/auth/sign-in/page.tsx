'use client';

import * as z from 'zod';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2Icon, MailIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

import { deleteSession } from '@/actions/delete-session';
import { signIn } from '@/actions/sign-in';
import { signInSchema } from '@/schemas';

import { error, toastAction } from '@/components/toast';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function SignInPage() {
  const { toast } = useToast();

  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setLoading(true);

    const response = await signIn(values);

    setLoading(false);

    if (response.success) {
      window.location.href = '/';
    } else {
      error(toast, {
        description: response.error,
        action: toastAction(form.handleSubmit(onSubmit)),
      });
    }
  }

  useEffect(() => {
    deleteSession();
  });

  return (
    <main className="flex flex-col items-center justify-center space-y-8 py-16">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="flex h-9 w-[200px] rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <div className="flex items-center justify-center border-r px-3 py-1">
                        <MailIcon className="h-4 w-4" />
                      </div>

                      <Input
                        {...field}
                        className="rounded-none rounded-br-md rounded-tr-md border-none px-3 py-1 pl-1.5"
                        placeholder="E-mail"
                        type="email"
                      />
                    </div>
                    <FormMessage />
                  </>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    

                    <div className="flex h-9 w-[200px] rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <div className="flex items-center justify-center border-r px-3 py-1">
                        {hidden ? (
                          <EyeClosedIcon
                            className="h-4 w-4"
                            onClick={() => setHidden(false)}
                          />
                        ) : (
                          <EyeOpenIcon
                            className="h-4 w-4"
                            onClick={() => setHidden(true)}
                          />
                        )}
                      </div>

                      <Input
                        {...field}
                        className="rounded-none rounded-br-md rounded-tr-md border-none px-3 py-1 pl-1.5"
                        placeholder="Mot de passe"
                        type={hidden ? 'password' : 'text'}
                      />
                    </div>
                    <FormMessage />
                  </>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex w-[200px] flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <FormLabel className="text-xs">Se souvenir de moi</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button className="w-[200px]" type="submit">
            {loading ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              <>Se connecter</>
            )}
          </Button>
        </form>
      </Form>

      <p className="text-xs">
        Vous n&apos;avez pas de compte ?{' '}
        <Link href="/auth/sign-up">
          <Button className="h-0 p-0 text-xs" role="link" variant="link">
            S&apos;inscrire
          </Button>
        </Link>
      </p>
      <div className="flex justify-end">
                      <Link href="/auth/forgot-password">
                        <Button
                          className="h-0 p-0 text-right text-xs"
                          role="link"
                          variant="link"
                        >
                          Mot de passe oublié ?
                        </Button>
                      </Link>
                    </div>
    </main>
  );
}
