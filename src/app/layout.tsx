import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { Poppins } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';

import { UserContextProvider } from '@/components/providers';

import { Toaster } from '@/components/ui/toaster';

import '@/app/globals.css';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'MyFlair',
    template: '%s - MyFlair',
  },
  description: 'Le réseau des coiffeurs',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <UserContextProvider session={session}>
        <html lang="fr">
          <body className={poppins.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </UserContextProvider>
    </SessionProvider>
  );
}
