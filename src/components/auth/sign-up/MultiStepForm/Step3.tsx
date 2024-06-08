'use client';

import Link from 'next/link';

import { useSignUpFormContext } from '@/contexts/sign-up-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

export default function Step3() {
  const form = useSignUpFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="address.street"
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
        name="address.postalCode"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        {...field}
                        className="w-[200px]"
                        placeholder="Code postal"
                        type="text"
                      />
                    </TooltipTrigger>
                    <TooltipContent>13000</TooltipContent>
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
        name="address.town"
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

      <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
        <Checkbox required />
        <p className="text-xs">
          J&apos;ai lu et j&apos;accepte les{' '}
          <Link href="/">
            <Button className="h-0 p-0 text-xs" role="link" variant="link">
              conditions générales
            </Button>
          </Link>
          <br /> et la{' '}
          <Link href="/">
            <Button className="h-0 p-0 text-xs" role="link" variant="link">
              politique de confidentialité
            </Button>
          </Link>
        </p>
      </div>
    </>
  );
}
