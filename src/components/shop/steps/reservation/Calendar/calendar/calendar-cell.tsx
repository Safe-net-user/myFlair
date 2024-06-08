import { cn } from '@/lib/utils';
import {
  type CalendarDate,
  getLocalTimeZone,
  isSameMonth,
  isToday,
} from '@internationalized/date';
import { useCalendarCell } from '@react-aria/calendar';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import type { CalendarState } from '@react-stately/calendar';
import { useRef } from 'react';

export function CalendarCell({
  state,
  date,
  currentMonth,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);

  const isOutsideMonth = !isSameMonth(currentMonth, date);

  const isDateToday = isToday(date, getLocalTimeZone());

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={cn('relative px-0.5 py-0.5', isFocusVisible ? 'z-10' : 'z-0')}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className="group size-14 rounded-md outline-none"
      >
        <div
          className={cn(
            'flex size-full items-center justify-center rounded-md',
            'text-gray-12 text-sm font-semibold',
            isDisabled
              ? isDateToday
                ? 'cursor-defaut'
                : 'text-gray-8 cursor-defaut'
              : 'cursor-pointer bg-gray-200',
            isFocusVisible &&
              'group-focus:z-2 ring-gray-12 ring-1 ring-offset-1',
            isSelected && 'bg-gray-300',
            !isSelected && !isDisabled && 'hover:ring-gray-12 hover:ring-2',
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              className={cn(
                'bg-gray-12 absolute bottom-4 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 transform rounded-full',
                isSelected && 'bg-neutral-950',
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
}
