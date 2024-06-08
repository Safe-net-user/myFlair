'use client';

import { useUserContext } from '@/contexts/user';
import { signOut } from 'next-auth/react';
import { TabsContent } from '@/components/tabs';

export default function OverviewTab() {
  const { user } = useUserContext();

  return (
    <TabsContent title="Tableau de bord" value="overview">
      <div>
       
      </div>
      <div style={{lineHeight:'2'}}>
      Bonjour <b>{user?.firstName}</b> !<br/>(vous n’êtes pas Miss kitty ?  <button onClick={() =>signOut({redirect: true, callbackUrl: '/auth/sign-in'})}><u>Déconnexion</u></button>)
À partir du tableau de bord de votre compte, vous pouvez visualiser vos commandes récentes, gérer vos réservations  ainsi que changer votre mot de passe et les détails de votre compte.
      </div>
    </TabsContent>
  );
}
