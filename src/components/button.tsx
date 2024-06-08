import type { ReactNode } from 'react';

import { Loader2Icon } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';

import { Button, buttonVariants } from '@/components/ui/button';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

type SubmitButtonProps = ButtonProps & {
  pending: boolean;
  children: ReactNode;
};

export const SubmitButton = (props: SubmitButtonProps) => (
  <Button disabled={props.pending} type="submit" {...props}>
    {props.pending ? (
      <Loader2Icon className="h-4 w-4 animate-spin" />
    ) : (
      <>{props.children}</>
    )}
  </Button>
);
