import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exploration',
};

export default function ExploreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
