import Link from 'next/link';
import { Fragment } from 'react';

import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Fragment>
      <Header />
      <main className="grid min-h-full place-items-center px-6 py-16 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page non trouvée
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-500">
            Désolé, nous n&apos;avons pas trouvé la page que vous recherchez.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Link href="/">
              <Button>Aller à la boutique</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}
