'use client';

import * as z from 'zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUserContext } from '@/contexts/user';
import { updatePasswordByUserId } from '@/data/user';
import { updatePasswordSchema } from '@/schemas';

import { SubmitButton } from '@/components/button';
import { error, success, toastAction } from '@/components/toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

export default function UpdatePassword() {
  const { user } = useUserContext();
  const { toast } = useToast();

  const [pending, setPending] = useState(false);
  const [hiddenCurrent, setHiddenCurrent] = useState(true);
  const [hiddenNew, setHiddenNew] = useState(true);

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      current: '',
      new: '',
    },
  });

  async function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
    setPending(true);

    const response = await updatePasswordByUserId(user?.id!, values);

    setPending(false);

    if (response) {
      success(toast, {
        description: 'Mot de passe mis à jour avec succès !',
      });
    } else {
      error(toast, {
        action: toastAction(form.handleSubmit(onSubmit)),
      });
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="w-[300px]" size="lg">
            Modifier mon mot de passe
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[350px]">
          <DialogHeader>
            <DialogTitle>Modifier mon mot de passe</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="current"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex h-9  rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                <div className="flex items-center justify-center border-r px-3 py-1">
                                  {hiddenCurrent ? (
                                    <EyeClosedIcon
                                      className="h-4 w-4"
                                      onClick={() => setHiddenCurrent(false)}
                                    />
                                  ) : (
                                    <EyeOpenIcon
                                      className="h-4 w-4"
                                      onClick={() => setHiddenCurrent(true)}
                                    />
                                  )}
                                </div>

                                <Input
                                  {...field}
                                  className="rounded-none rounded-br-md rounded-tr-md border-none px-3 py-1 pl-1.5"
                                  placeholder="Mot de passe actuel"
                                  type={hiddenCurrent ? 'password' : 'text'}
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>Plus de 7 caractères</TooltipContent>
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
                name="new"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex h-9 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                <div className="flex items-center justify-center border-r px-3 py-1">
                                  {hiddenNew ? (
                                    <EyeClosedIcon
                                      className="h-4 w-4"
                                      onClick={() => setHiddenNew(false)}
                                    />
                                  ) : (
                                    <EyeOpenIcon
                                      className="h-4 w-4"
                                      onClick={() => setHiddenNew(true)}
                                    />
                                  )}
                                </div>

                                <Input
                                  {...field}
                                  className="rounded-none rounded-br-md rounded-tr-md border-none px-3 py-1 pl-1.5"
                                  placeholder="Nouveau mot de passe"
                                  type={hiddenNew ? 'password' : 'text'}
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>Plus de 7 caractères</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <FormMessage />
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <SubmitButton pending={pending}>Sauvegarder</SubmitButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
