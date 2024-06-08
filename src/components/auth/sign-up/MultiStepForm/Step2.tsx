'use client';

import fr from 'react-phone-number-input/locale/fr';
import { useState } from 'react';
import { BuildingIcon, MailIcon } from 'lucide-react';
import { UserRole } from '@prisma/client';
import { EyeClosedIcon, EyeOpenIcon, PersonIcon } from '@radix-ui/react-icons';

import { useSignUpFormContext } from '@/contexts/sign-up-form';

import { ImageUploader } from '@/components/image-uploader';
import { PhoneInput } from '@/components/phone-input';

import {
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

export default function Step2() {
  const form = useSignUpFormContext();

  const [hidden, setHidden] = useState(true);

  return (
    <>
      <ImageUploader callback={(url: string) => form.setValue('image', url)} />

      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <>
                <div className="flex h-9 w-[200px] rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <div className="flex items-center justify-center border-r px-3 py-1">
                    <PersonIcon className="h-4 w-4" />
                  </div>

                  <Input
                    {...field}
                    className="rounded-none rounded-br-md rounded-tr-md border-none px-3 py-1 pl-1.5"
                    placeholder="Nom d'utilisateur"
                    type="text"
                  />
                </div>
              </>
            </FormControl>
          </FormItem>
        )}
      />

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

      {form.getValues().role === UserRole.PROFESSIONAL && (
        <FormField
          control={form.control}
          name="enterprise"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex h-9 w-[200px] rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <div className="flex items-center justify-center border-r px-3 py-1">
                    <BuildingIcon className="h-4 w-4" />
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
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
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
    </>
  );
}
