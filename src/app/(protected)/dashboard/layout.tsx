import type { Metadata } from 'next';

import { Fragment } from 'react';

import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer variant="dashboard" />
    </Fragment>
  );
}
