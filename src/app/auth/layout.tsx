import type { Metadata } from 'next';

import { Fragment } from 'react';

import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Authentification',
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <Header variant="auth" />
      {children}
      <Footer />
    </Fragment>
  );
}
