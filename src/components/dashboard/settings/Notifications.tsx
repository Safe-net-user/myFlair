'use client';

import * as z from 'zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateUserByUserId } from '@/data/user';
import { useUserContext } from '@/contexts/user';
import { notificationsSchema } from '@/schemas';

import { SubmitButton } from '@/components/button';
import { TabsContent } from '@/components/tabs';
import { error, success, toastAction } from '@/components/toast';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

export default function NotificationsTab() {
  const { user } = useUserContext();

  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof notificationsSchema>>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      inApp: {
        general: user?.preferences?.notifications?.inApp.general,
        reservations: user?.preferences?.notifications?.inApp.reservations,
      },
      email: {
        general: user?.preferences?.notifications?.email.general,
        reservations: user?.preferences?.notifications?.email.reservations,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof notificationsSchema>) {
    setPending(true);

    const response = await updateUserByUserId(user?.id!, {
      preferences: {
        notifications: values,
      },
    });

    setPending(false);

    if (response) {
      success(toast, {
        description: 'Notifications mises à jour avec succès !',
      });
    } else {
      error(toast, {
        action: toastAction(form.handleSubmit(onSubmit)),
      });
    }
  }

  return (
    <TabsContent title="Notifications" value="notifications">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div>
            <h3 className="mb-4 text-lg font-medium">Notifications in-app</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="inApp.general"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Notifications générales</FormLabel>
                      <FormDescription>
                        Vous recevrez toutes les notifications nécessaires.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inApp.reservations"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Notifications de réservations</FormLabel>
                      <FormDescription>
                        Vous recevrez toutes les notifications concernant des
                        réservations.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">
              Notifications par e-mail
            </h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email.general"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Notifications générales</FormLabel>
                      <FormDescription>
                        Vous recevrez toutes les notifications nécessaires.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email.reservations"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Notifications de réservations</FormLabel>
                      <FormDescription>
                        Vous recevrez toutes les notifications concernant des
                        réservations.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <SubmitButton pending={pending}>Sauvegarder</SubmitButton>
        </form>
      </Form>
    </TabsContent>
  );
}
