'use client';

import { useEffect, useState } from 'react';
import { EuroIcon } from 'lucide-react';

import { getTurnoverIncludingTaxByDateRange } from '@/data/dashboard/admin';
import { useUserContext } from '@/contexts/user';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TurnoverIncludingTax() {
  const { user } = useUserContext();

  const [turnoverIncludingTax, setTurnoverIncludingTax] = useState(0);

  useEffect(() => {
    (async () =>
      setTurnoverIncludingTax(
        await getTurnoverIncludingTaxByDateRange(user?.preferences?.dateRange),
      ))();
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Chiffre d&apos;affaire (TTC)
        </CardTitle>
        <EuroIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
          }).format(turnoverIncludingTax)}
        </div>
      </CardContent>
    </Card>
  );
}
