'use client';

import * as z from 'zod';

import fr from 'react-phone-number-input/locale/fr';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUserContext } from '@/contexts/user';
import { updatePhoneByUserId } from '@/data/user';
import { updatePhoneSchema } from '@/schemas';

import { SubmitButton } from '@/components/button';
import { PhoneInput } from '@/components/phone-input';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

export default function UpdatePhone() {
  const { user } = useUserContext();
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof updatePhoneSchema>>({
    resolver: zodResolver(updatePhoneSchema),
    defaultValues: {
      current: user?.phone,
      new: '',
    },
  });

  async function onSubmit(values: z.infer<typeof updatePhoneSchema>) {
    setPending(true);

    const response = await updatePhoneByUserId(user?.id!, values);

    setPending(false);

    if (response) {
      success(toast, {
        description: 'Numéro de téléphone mis à jour avec succès !',
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
            Modifier mon numéro de téléphone
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[350px]">
          <DialogHeader>
            <DialogTitle>Modifier mon numéro de téléphone</DialogTitle>
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
                              <PhoneInput
                                {...field}
                                className=""
                                defaultCountry="FR"
                                labels={fr}
                                placeholder="Actuel"
                              />
                            </TooltipTrigger>
                            <TooltipContent>01 23 45 67 89</TooltipContent>
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
                              <PhoneInput
                                {...field}
                                className=""
                                defaultCountry="FR"
                                labels={fr}
                                placeholder="Nouveau"
                              />
                            </TooltipTrigger>
                            <TooltipContent>01 23 45 67 89</TooltipContent>
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
