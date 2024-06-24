'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Import Dispatch and SetStateAction from React
import type { Dispatch, SetStateAction } from 'react';

interface CalendarBusinessBoosterProps extends React.HTMLAttributes<HTMLDivElement> {
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
}

export const CalendarBusinessBooster: React.FC<CalendarBusinessBoosterProps> = ({
  dateRange,
  setDateRange,
  className,
}) => {
  
  const defaultDateRange = {
    from: new Date(),
    to: addDays(new Date(), 7),
  };

  return (
    <div className={cn('grid gap-2', className)}>
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
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from || defaultDateRange.from}
            selected={dateRange || defaultDateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
