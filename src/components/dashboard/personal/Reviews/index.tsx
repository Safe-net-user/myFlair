'use client';

import type { Review } from '@prisma/client';

import { useEffect, useState } from 'react';

import { columns } from './columns';
import { DataTable } from './data-table';

import { useUserContext } from '@/contexts/user';
import { getReviewsByUserId } from '@/data/user';

import { TabsContent } from '@/components/tabs';

export default function ReservationsTab() {
  const { user } = useUserContext();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    (async () => setReviews(await getReviewsByUserId(user?.id!)))();
  });

  return (
    <TabsContent title="Avis" value="reviews">
      <DataTable data={reviews} columns={columns} />
    </TabsContent>
  );
}
