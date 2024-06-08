import Image from 'next/image';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon } from 'lucide-react';

import { getAllBusinessBoosters } from '@/data/business-booster';


import { Button } from '@/components/ui/button';

import MyFlair from '@/../public/logos/myflair-white.png';

export default async function Footer({
  variant = 'default',
}: Readonly<{ variant?: 'default' | 'dashboard' }>) {
  if (variant === 'dashboard') {
    return (
      <footer className="flex h-12 items-center justify-center border-t px-4 text-xs">
        &copy; {new Date().getFullYear()} MyFlair - Propulsé par
        <Link href="https://webinflu.com" target="_blank">
          &nbsp;
          <Button variant="link" className="h-0 p-0 text-xs">
            Webinflu
          </Button>
        </Link>
      </footer>
    );
  }


  const businessBoosters = (await getAllBusinessBoosters()).slice(0, 4) || [];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-8 sm:px-6 lg:space-y-8 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Image alt="MyFlair" className="h-8 w-auto" src={MyFlair} width={0} />

          <ul className="mt-8 flex justify-start gap-6 text-lg sm:mt-0 sm:justify-end">
            <li>
              <Link href="https://facebook.com" target="_blank">
                <FacebookIcon className="h-4 w-4" />
              </Link>
            </li>

            <li>
              <Link
                href="https://instagram.com/myflair.coworking/"
                target="_blank"
              >
                <InstagramIcon className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-white pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
          <div>
            <h4 className="text-[20px] leading-[22px] tracking-tight">
              MyFlair
            </h4>

            <ul className="mt-6 space-y-4 text-sm text-neutral-500">
              <li>
                <Link href="/myflair/about/who-are-we">
                  <Button className="p-0 text-neutral-500" variant="link">
                    Qui sommes-nous ?
                  </Button>
                </Link>
              </li>

              <li>
                <Link href="/myflair/blog">
                  <Button className="p-0 text-neutral-500" variant="link">
                    Blog
                  </Button>
                </Link>
              </li>

              <li>
                <Link href="/myflair/contact">
                  <Button className="p-0 text-neutral-500" variant="link">
                    Contact
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[20px] leading-[22px] tracking-tight">
              Louer un poste
            </h4>

            <ul className="mt-6 space-y-4 text-sm text-neutral-500">
              
            </ul>
          </div>

          <div>
            <h4 className="text-[20px] leading-[22px] tracking-tight">
              Business boosters
            </h4>

            <ul className="mt-6 space-y-4 text-sm text-neutral-500">
              {businessBoosters.map((businessBooster) => (
                <li key={businessBooster.id}>
                  <Link href={`/shop/steps/reservation/${businessBooster.id}`}>
                    <Button
                      className="p-0 text-neutral-500"
                      role="link"
                      variant="link"
                    >
                      {businessBooster.title}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[20px] leading-[22px] tracking-tight">
              Informations
            </h4>

            <ul className="mt-6 space-y-4 text-sm text-neutral-500">
              <li>
                <Link
                  href="https://myflair.fr/mentions-legales"
                  target="_blank"
                >
                  <Button className="p-0 text-neutral-500" variant="link">
                    Mentions légales
                  </Button>
                </Link>
              </li>

              <li>
                <Link
                  href="https://myflair.fr/conditions-generales-de-vente"
                  target="_blank"
                >
                  <Button className="p-0 text-neutral-500" variant="link">
                    Conditions générales de vente
                  </Button>
                </Link>
              </li>

              <li>
                <Link
                  href="https://myflair.fr/conditions-generales-dutilisation"
                  target="_blank"
                >
                  <Button className="p-0 text-neutral-500" variant="link">
                    Conditions générales d&apos;utilisation
                  </Button>
                </Link>
              </li>

              <li>
                <Link
                  href="https://myflair.fr/politique-de-confidentialite"
                  target="_blank"
                >
                  <Button className="p-0 text-neutral-500" variant="link">
                    Politique de confidentialité
                  </Button>
                </Link>
              </li>

              <li>
                <Link
                  href="https://myflair.fr/foire-aux-questions/"
                  target="_blank"
                >
                  <Button className="p-0 text-neutral-500" variant="link">
                    FAQ
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs">
          &copy; {new Date().getFullYear()} MyFlair - Propulsé par
          <Link href="https://webinflu.com" target="_blank">
            {' '}
            Webinflu
          </Link>
        </p>
      </div>
    </footer>
  );
}
