'use client';

import type { Notification } from '@prisma/client';

import { useEffect, useState } from 'react';
import { BellIcon } from '@radix-ui/react-icons';

import { getNotificationsByUserId } from '@/data/user';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession } from 'next-auth/react';
import { useUserContext } from '@/contexts/user';

export default function Notifications() {
  const user = useUserContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async () => {
      // let _notifications = await getNotificationsByUserId(user.id);
      /*       let _notifications = [];

      /* @ts-ignore *
      _notifications = _notifications.map((notification) => (
        <DropdownMenuItem key={notification.id} className="block">
          <DropdownMenuGroup>
            <p className="block">{notification?.title}</p>
          </DropdownMenuGroup>
        </DropdownMenuItem>
      ));

      /* @ts-ignore *
      _notifications = _notifications.flatMap((a: JSX.Element, b: number) =>
        b + 1 < _notifications.length
          ? [a, <DropdownMenuSeparator key={a.key} />]
          : a,
      );

      setNotifications(_notifications); */
    };
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <BellIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-w-96" align="end">
        <DropdownMenuLabel className="font-semibold">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* @ts-ignore */}
          {notifications.length > 0 ? (
            notifications.map((notification) => notification)
          ) : (
            <DropdownMenuItem>
              Vous n&apos;avez pas de notifications.
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
