import type { DateRange } from 'react-day-picker';
import type { SubscriptionArgumentType } from '@/prisma/client';

/* User */
export type Address = {
  street: string;
  postalCode: string;
  town: string;
};

export type Preferences = {
  dateRange: DateRange;
  notifications: {
    email: {
      general: boolean;
      reservations: boolean;
    };
    inApp: {
      general: boolean;
      reservations: boolean;
    };
  };
};

/* Server actions */
export type ServerActionReturn = {
  success: boolean;
  error?: string;
};

/*  */
export type Argument = {
  title: string;
  type: SubscriptionArgumentType;
};

export type ScheduleRange = {
  from: string;
  to: string;
};

export type Weekdays = {
  price: number;
  schedules: {};
};
