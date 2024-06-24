'use client';

import type { DateRange } from 'react-day-picker';

import { Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar as UiCalendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const Calendar = ({
  dateRange,
  setDateRange,
}: Readonly<{
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
}>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="" variant="outline">
          {dateRange?.from ? (
            dateRange?.to ? (
              <>
                {format(dateRange.from, 'dd LLL y', { locale: fr })} -{' '}
                {format(dateRange.to, 'dd LLL y', { locale: fr })}
              </>
            ) : (
              format(dateRange.from, 'LLL dd y', { locale: fr })
            )
          ) : (
            <span>Choisir une date</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="center">
        <UiCalendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          locale={fr}
        />
      </PopoverContent>
    </Popover>
  );
};
