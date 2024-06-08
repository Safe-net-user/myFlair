'use client';

import type { User } from '@prisma/client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { getProfessionalsByService } from '@/data/back-up';

import { HeaderSection } from '@/components/shop/layout';

import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const [professionals, setProfessionals] = useState<User[]>([]);

  useEffect(() => {
    async () =>
      setProfessionals(
        await getProfessionalsByService(searchParams.get('service')!),
      );
  });

  return (
    <main>
      <HeaderSection title="Explorez les professionnels de la beauté" />

      {professionals.map((professional) => (
        <Card key={professional.id}>
          <CardHeader>
            <AspectRatio ratio={16 / 9}>
              <Image alt="" src={`${professional.image}`} fill />
            </AspectRatio>
          </CardHeader>
        </Card>
      ))}
    </main>
  );
}
