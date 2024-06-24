'use client';

import * as z from 'zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUserContext } from '@/contexts/user';
import { updateUserByUserId } from '@/data/user';

import { SubmitButton } from '@/components/button';
import { ImageUploader } from '@/components/image-uploader';
import { TabsContent } from '@/components/tabs';
import { error, success, toastAction } from '@/components/toast';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Divide } from 'lucide-react';

const schema = z.object({
  image: z.string(),
  lastName: z.string(),
  firstName: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.object({
    street: z.string(),
    postalCode: z.string().length(5),
    town: z.string(),
  }),
});

export default function GeneralTab() {
  const { user } = useUserContext();
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: user?.image!,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      email: user?.email ?? '',
      address: {
        street: user?.address?.street,
        postalCode: user?.address?.postalCode,
        town: user?.address?.town,
      },
      
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setPending(true);

    const response = await updateUserByUserId(user?.id!, values);

    setPending(false);

    if (response) {
      success(toast, {
        description: 'Profil mis à jour avec succès',
      });
    } else {
      error(toast, {
        action: toastAction(form.handleSubmit(onSubmit)),
      });
    }
  }

  return (
    
    <TabsContent title="Général" value="general" >
      <div style={{marginLeft:'1%'}}>
      <Form {...form}>
        <form className="space-y-4">
          <ImageUploader
            callback={(url: string) => form.setValue('image', url)}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="" placeholder="Nom" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className=""
                    placeholder="Prénom"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        
          <h3 className="mb-4 text-lg font-medium">Informations de l'Administrateur</h3>
          <div className="flex flex-col space-y-4 rounded-lg border p-3 shadow-sm">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className=""
                      placeholder="+330612345667"
                    />
                  </FormControl>
                </FormItem>
              
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                     
                      placeholder="Code postal"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

           
          </div>
         
          <SubmitButton pending={pending} onClick={form.handleSubmit(onSubmit)}>
            Sauvegarder
          </SubmitButton>
        </form>
      </Form>
      </div>
    </TabsContent>
   
  );
}
