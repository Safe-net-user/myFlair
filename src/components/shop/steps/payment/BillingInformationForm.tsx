'use client';

import fr from 'react-phone-number-input/locale/fr';
import { Building2Icon, MailIcon } from 'lucide-react';
import { UserRole } from '@prisma/client';

import { useUserContext } from '@/contexts/user';
import { usePaymentFormContext } from '@/contexts/payment-form';

import { PhoneInput } from '@/components/phone-input';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function BillingInformationForm() {
  const { user } = useUserContext();
  const form = usePaymentFormContext();

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="mb-4 text-lg font-medium">Détails de facturation</h3>
      <div className="flex flex-col rounded-lg border p-3 shadow-sm">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[200px]"
                      placeholder="Nom"
                      type="text"
                    />
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
                      className="w-[200px]"
                      placeholder="Prénom"
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {user?.role === UserRole.PROFESSIONAL && (
              <FormField
                control={form.control}
                name="enterprise"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex h-9 w-[200px] rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <div className="flex items-center justify-center border-r px-3 py-1">
                          <Building2Icon className="h-4 w-4" />
                        </div>

                        <Input
                          {...field}
                          className="rounded-none rounded-br-md rounded-tr-md border-none px-3 py-1 pl-1.5"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[200px]"
                      placeholder="Adresse"
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[200px]"
                      placeholder="Code postal"
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="town"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[200px]"
                      placeholder="Ville"
                      type="text"
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
                    <>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
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
                          </TooltipTrigger>
                          <TooltipContent>exemple@myflair.fr</TooltipContent>
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <PhoneInput
                              {...field}
                              className="w-[200px]"
                              defaultCountry="FR"
                              labels={fr}
                              placeholder="Numéro de téléphone"
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
          </form>
        </Form>
      </div>
    </div>
  );
}
