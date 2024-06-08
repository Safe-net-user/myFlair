import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { Fragment } from 'react';

import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Back up',
};

export default function BackUpLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
