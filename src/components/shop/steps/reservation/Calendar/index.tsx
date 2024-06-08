'use client';

import type { BusinessBooster } from '@prisma/client';
import type { DateValue } from '@react-aria/calendar';
import { type CalendarDate } from '@internationalized/date';

import { useState } from 'react';
import {
  getLocalTimeZone,
  getWeeksInMonth,
  today,
} from '@internationalized/date';

import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar as TmpCalendar } from './calendar';
import { FormPanel } from './form-panel';
import { LeftPanel } from './left-panel';
import { RightPanel } from './right-panel';

import { useLocale } from '@react-aria/i18n';

export function Calendar() {
  const router = useRouter();
  const { locale } = useLocale();

  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');
  const slotParam = searchParams.get('slot');

  const [timeZone, setTimeZone] = useState('America/New_York');
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const [focusedDate, setFocusedDate] = useState<CalendarDate | null>(date);

  const weeksInMonth = getWeeksInMonth(focusedDate as DateValue, locale);

  const handleChangeDate = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set(
      'date',
      date.toDate(timeZone).toISOString().split('T')[0],
    );
    router.push(url.toString());
  };

  const handleChangeAvailableTime = (time: string) => {
    const timeValue = time.split(':').join(' ');

    const match = timeValue.match(/^(\d{1,2}) (\d{2})([ap]m)?$/i);
    if (!match) {
      console.error('Invalid time format');
      return null;
    }

    let hours = Number.parseInt(match[1]);
    const minutes = Number.parseInt(match[2]);
    const isPM = match[3] && match[3].toLowerCase() === 'pm';

    if (isPM && (hours < 1 || hours > 12)) {
      console.error('Time out of range (1-12) in 12-hour format');
      return null;
    }

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }

    const currentDate = date.toDate(timeZone);
    currentDate.setHours(hours, minutes);

    const url = new URL(window.location.href);
    url.searchParams.set('slot', currentDate.toISOString());
    router.push(url.toString());
  };

  const showForm = !!dateParam && !!slotParam;

  return (
    <div className="mx-auto w-full max-w-max rounded-md bg-neutral-100 px-8 py-6">
      <div className="flex gap-6">
        <LeftPanel
          showForm={showForm}
          timeZone={timeZone}
          setTimeZone={setTimeZone}
        />
        {!showForm ? (
          <>
            <TmpCalendar
              minValue={today(getLocalTimeZone())}
              defaultValue={today(getLocalTimeZone())}
              value={date}
              onChange={handleChangeDate}
              onFocusChange={(focused) => setFocusedDate(focused)}
            />
            <RightPanel
              {...{ date, timeZone, weeksInMonth, handleChangeAvailableTime }}
            />
          </>
        ) : (
          <FormPanel />
        )}
      </div>
    </div>
  );
}
