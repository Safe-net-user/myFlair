'use client';

import { useEffect } from 'react';

import { getBusinessBoosterById } from '@/data/business-booster';

import { Calendar } from '@/components/shop/steps/reservation/Calendar';

export default function ReservationStep({
  params: { slug },
}: Readonly<{ params: { slug: string } }>) {
  useEffect(() => {
    (async () => {
      const _businessBooster = await getBusinessBoosterById(slug);

      if (_businessBooster) {
        window.location.href = '/';
      } else {
      }
    })();
  });

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <Calendar />
    </main>
  );
}
