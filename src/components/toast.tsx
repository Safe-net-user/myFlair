import {
  type ToastActionElement,
  type ToastProps,
} from '@/components/ui/toast';

import { ToastAction } from '@/components/ui/toast';

type Toast = Omit<
  ToastProps & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
  },
  'id'
>;

export const toastAction = (callback: () => void): ToastActionElement => (
  <ToastAction altText="Réessayer" onClick={callback}>
    Réessayer
  </ToastAction>
);

export const error = (
  toast: ({ ...props }: Toast) => void,
  { ...props }: Toast,
) =>
  toast({
    duration: 3000,
    title: 'Mince !',
    description: 'Une erreur est survenue !',
    variant: 'destructive',
    ...props,
  });

export const success = (
  toast: ({ ...props }: Toast) => void,
  { ...props }: Toast,
) =>
  toast({
    duration: 3000,
    title: 'Succès !',
    ...props,
  });
