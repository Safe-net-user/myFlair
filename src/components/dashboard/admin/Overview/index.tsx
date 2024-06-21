'use client';

import type { DateRange } from 'react-day-picker';

import { useState } from 'react';

import { updateUserDatePreferencesByUserId } from '@/data/user';
import { useUserContext } from '@/contexts/user';


import {
  TransactionsCount,
  TurnoverExcludingTax,
  TurnoverIncludingTax,
} from './Cards';

import { SubmitButton } from '@/components/button';
import { Calendar } from '@/components/calendar';
import { error, success } from '@/components/toast';

import { TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

export default function Overview() {
  const { toast } = useToast();
  const { user } = useUserContext();

  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    user?.preferences?.dateRange,
  );

  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);

    const response = await updateUserDatePreferencesByUserId(
      user?.id!,
      dateRange,
    );

    setLoading(false);

    if (response) {
      success(toast, {
        description: 'Préférences mises à jour avec succès !',
      });
    } else {
      error(toast, {
        /* @ts-ignore */
        action: onSubmit,
      });
    }
  }

  return (
    <TabsContent value="overview">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Aperçu</h2>
        <div className="flex items-center space-x-2">
          <div className="grid gap-2">
            <Calendar dateRange={dateRange} setDateRange={setDateRange} />
          </div>
          <SubmitButton pending={loading} onClick={onSubmit}>
            Mettre à jour
          </SubmitButton>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <TransactionsCount />
          <TurnoverExcludingTax />
          <TurnoverIncludingTax />
        </div>
      </div>

    
    </TabsContent>
  );
}
