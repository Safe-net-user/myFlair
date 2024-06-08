'use client';

import { useEffect, useState } from 'react';
import { ArrowRightLeftIcon } from 'lucide-react';

import { getTransactionCountByDateRange } from '@/data/dashboard/admin';
import { useUserContext } from '@/contexts/user';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TransactionsCount() {
  const { user } = useUserContext();

  const [transactionsCount, setTransactionsCount] = useState(0);

  useEffect(() => {
    (async () =>
      setTransactionsCount(
        await getTransactionCountByDateRange(user?.preferences?.dateRange),
      ))();
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Nombre de transactions
        </CardTitle>
        <ArrowRightLeftIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{transactionsCount}</div>
      </CardContent>
    </Card>
  );
}
