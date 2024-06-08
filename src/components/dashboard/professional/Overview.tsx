'use client';

import { useUserContext } from '@/contexts/user';
import { signOut } from 'next-auth/react';
import { TabsContent } from '@/components/tabs';

export default function OverviewTab() {
  const { user } = useUserContext();

  return (
    <TabsContent title="Tableau de bord" value="overview">
      <div>
        Bonjour <b>{user?.firstName}</b> !<br />
      (vous n’êtes pas {user?.firstName} ? <button onClick={() =>signOut({redirect: true, callbackUrl: '/auth/sign-in'})}><u>Déconnexion</u></button>)<br/>
        Bienvenue chez Flair !
        <br/>
        Vous pouvez dès à présent réserver votre poste de travail , vous inscrire à votre future formation et souscrire à notre outil de gestion de planning !
      </div>
    </TabsContent>
  );
}
