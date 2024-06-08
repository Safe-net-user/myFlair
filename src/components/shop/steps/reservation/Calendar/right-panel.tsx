import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import type { DateValue } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { availableTimes } from './available-times';

export function RightPanel({
  date,
  timeZone,
  weeksInMonth,
  handleChangeAvailableTime,
}: {
  date: DateValue;
  timeZone: string;
  weeksInMonth: number;
  handleChangeAvailableTime: (time: string) => void;
}) {
  const { locale } = useLocale();
  const [dayNumber, dayName] = date
    .toDate(timeZone)
    .toLocaleDateString(locale, {
      weekday: 'short',
      day: 'numeric',
    })
    .split(' ');
  return (
    <div
      defaultValue="24"
      className="flex w-[280px] flex-col gap-4 border-l pl-6"
    >
      <div className="flex items-center justify-between">
        <p
          aria-hidden
          className="align-center text-md text-gray-12 flex-1 font-bold"
        >
          {dayName} <span className="text-gray-11">{dayNumber}</span>
        </p>
      </div>
      <ScrollArea
        type="always"
        className="h-full"
        style={{
          maxHeight: weeksInMonth > 5 ? '380px' : '320px',
        }}
      >
        <div className="grid gap-2 pr-3">
          {availableTimes.map((availableTime) => (
            <Button
              variant="outline"
              onClick={() => handleChangeAvailableTime(availableTime['24'])}
              key={availableTime['24']}
            >
              {availableTime['24']}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
