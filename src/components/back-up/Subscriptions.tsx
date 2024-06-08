'use client';

import type { Subscription } from '@prisma/client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';


import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const types = {
  MONTHLY: 'mois',
  YEARLY: 'an',
};

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

 
  return (
    <section className="px-6 py-8 text-center lg:px-24">
      <h2 className="text-3xl font-bold tracking-tight">
        Nos abonnements <b className="italic">PRO</b>
      </h2>
      <p className="pb-16 pt-1 text-xs sm:text-sm">
        Découvrez l&apos;abonnement qui s&apos;aligne parfaitement sur votre
        profession
      </p>
      <div className="grid grid-cols-1 gap-4 px-16 lg:grid-cols-2 lg:px-24">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id}>
            <CardHeader>
              <CardTitle className="text-xl">{subscription.title}</CardTitle>
              <h2 className="text-3xl font-bold tracking-tight">
                <b>
                  {subscription.price}/{types[subscription.type]}
                </b>
              </h2>
              <CardDescription>{subscription.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <ul>
                {subscription.arguments &&
                  subscription.arguments.map((argument: any) => (
                    <li
                      className="flex items-center justify-center"
                      key={argument.title}
                    >
                      {argument.type === 'POSITIVE' ? (
                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <Cross2Icon className="mr-2 h-4 w-4 text-red-500" />
                      )}
                      {argument.title}
                    </li>
                  ))}
              </ul>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2">
              <Link
                className="w-full"
                href={`/back-up/subscriptions/payment?type=${subscription.type.toLowerCase()}`}
              >
                <Button className="w-full" role="link" size="lg">
                  Acheter
                </Button>
              </Link>
              <div className="text-sm text-muted-foreground">
                Abonnement sans engagement et résiliable sans frais
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
