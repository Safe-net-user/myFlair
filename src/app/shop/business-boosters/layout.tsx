import type { Metadata } from 'next';

import { Fragment } from 'react';

import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Boutique',
};

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
