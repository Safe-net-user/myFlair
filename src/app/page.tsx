import Link from 'next/link';
import { Fragment } from 'react';
import { MouseIcon } from 'lucide-react';

import { Header, Footer } from '@/components/layout/index';
import { HeaderSection } from '@/components/shop/layout';


import Trainings from '@/components/shop/sections/Trainings';
import AdditionalServices from '@/components/shop/sections/AdditionalServices';

import { Button } from '@/components/ui/button';
import { DoubleArrowDownIcon } from '@radix-ui/react-icons';
import Workplaces from '@/components/shop/sections/Workplaces';


const links = [
  {
    title: 'Réserver un poste',
    value: '#workplaces',
  },
  {
    title: 'Business boosters',
    value: '/shop/business-boosters',
  },
  {
    title: 'Réserver une formation',
    value: '#trainings',
  },
];

const sections = [
  {
    id: 'workplaces',
    title: 'Nos postes à louer',
    value: <Workplaces />,
  },
  {
    id: 'trainings',
    title: 'Nos formations',
    value: <Trainings />,
  },
  {
    id: 'additional-services',
    title: 'Nos services additionels',
    value: <AdditionalServices />,
  },
];

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main>
        <HeaderSection title="Boutique MyFlair">
          {links.map((link) => (
            <Link href={link.value} key={link.value}>
              <Button>{link.title}</Button>
            </Link>
          ))}
        </HeaderSection>

        <div className="flex flex-col items-center justify-center space-y-2 pt-16">
          <MouseIcon />
          <DoubleArrowDownIcon className="animate-bounce" />
        </div>

        <div className="flex flex-col gap-y-16 py-16">
          {sections.map((section) => (
            <section className="px-6 lg:px-24" id={section.id} key={section.id}>
              <h2 className="pb-16 text-center text-[32px] font-bold tracking-tight">
                {section.title}
              </h2>
              {section.value}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}
