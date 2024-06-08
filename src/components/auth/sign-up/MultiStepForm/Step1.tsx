'use client';

import { UserRole } from '@prisma/client';

import { useSignUpFormContext } from '@/contexts/sign-up-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const roles = [
  {
    title: 'Particulier',
    value: UserRole.PERSONAL,
  },
  {
    title: 'Professionel',
    value: UserRole.PROFESSIONAL,
  },
];

export default function Step1() {
  const form = useSignUpFormContext();

  return (
    <div className="flex flex-row items-center gap-2">
      <p>Je suis un</p>

      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
