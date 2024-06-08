'use client';

import { useEffect, useState } from 'react';
import { ShoppingBagIcon } from 'lucide-react';

import { getCartByUserId } from '@/data/user';

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
import { Prisma } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useUserContext } from '@/contexts/user';

type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: true;
  };
}>;

export default function Notifications() {
  const user = useUserContext();
  const [items, setItems] = useState<CartItemWithProduct[]>([]);

  useEffect(() => {
    (async () => {
      //let _items = (await getCartByUserId(user.id))?.items;
      /* 
      let _items = [];
      if (typeof _items === 'object' && _items.length > 0) {
        /* @ts-ignore *
        _items = _items.map((item: CartItemWithProduct) => (
          <DropdownMenuItem key={item.id} className="block">
            <DropdownMenuGroup>
              <p className="block">{item?.product?.title}</p>
              <Input type="number" defaultValue={item?.quantity} />
            </DropdownMenuGroup>
          </DropdownMenuItem>
        ));

        /* @ts-ignore *
        _items = _items.flatMap((a: JSX.Element, b: number) =>
          b + 1 < _items!.length
            ? [a, <DropdownMenuSeparator key={a.key} />]
            : a,
        );

        setItems(_items!); */
      // }
    })();
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <ShoppingBagIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-w-96" align="end">
        <DropdownMenuLabel className="font-semibold">Panier</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* @ts-ignore */}
          {items.length > 0 ? (
            items.map((item) => item)
          ) : (
            <DropdownMenuItem>
              Vous n&apos;avez pas d&apos;articles.
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
