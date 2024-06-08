'use client';

import { signOut } from 'next-auth/react';

import { useUserContext } from '@/contexts/user';
import { deleteUserById } from '@/data/user';

import { error } from '@/components/toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function DeleteAccount() {
  const { user } = useUserContext();

  const { toast } = useToast();

  async function deleteAccount() {
    const response = await deleteUserById(user?.id!);

    if (response) {
      signOut({
        redirect: true,
        callbackUrl: '/auth/sign-in',
      });
    } else {
      error(toast, {});
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-[300px]" size="lg" variant="destructive">
          Supprimer mon compte
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Vous êtes <b>vraiment</b> sûr(e) ? :(
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est <b>irréversible</b>. Si vous cliquez sur
            &quot;Supprimer&quot;, votre compte ne sera plus accessible et ceux
            de manière définitive.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
            onClick={deleteAccount}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
