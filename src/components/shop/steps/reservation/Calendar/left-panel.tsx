import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLocale } from '@react-aria/i18n';
import { CalendarIcon, Clock4 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { DrawingPinIcon } from '@radix-ui/react-icons';

export function LeftPanel({
  showForm,
}: {
  showForm: boolean | null;
  timeZone: string;
  setTimeZone: (timeZone: string) => void;
}) {
  const { locale } = useLocale();

  const searchParams = useSearchParams();
  const slotParam = searchParams.get('slot');

  return (
    <TooltipProvider>
      <div className="flex w-[280px] flex-col gap-4 border-r pr-6">
        <div className="grid gap-3">
          <p className="text-gray-12 text-2xl font-bold">Demo</p>
          {showForm && (
            <div className="text-gray-12 flex">
              <CalendarIcon className="mr-2 size-4" />
              <div className="flex flex-col text-sm font-semibold">
                <p>
                  {new Date(slotParam as string).toLocaleString(locale, {
                    dateStyle: 'full',
                  })}
                </p>
                <p>
                  {new Date(slotParam as string).toLocaleString(locale, {
                    timeStyle: 'short',
                  })}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center">
            <Clock4 className="mr-2 size-4" />
            <p className="text-sm font-semibold">15 mins</p>
          </div>
          <div className="flex items-center">
            <DrawingPinIcon className="mr-2 h-4 w-4" />
            15 Rue des bananes vertes
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
