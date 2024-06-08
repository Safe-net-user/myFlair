import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';

export const TextInput = ({
  register,
  placeholder,
}: {
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  placeholder: string;
}) => (
  <Input
    {...register}
    className="w-[200px]"
    placeholder={placeholder}
    type="text"
  />
);
