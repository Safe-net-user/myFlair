'use client';

import { type AdditionalService } from '@prisma/client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getAllAdditionalServices } from '@/data/additional-service';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const types = {
  PER_DAY: 'jour',
  PER_PAGE: '',
  PER_PIECE: 'pièce',
};

export default function AdditionalServices() {
  const [additionalServices, setAdditionalServices] = useState<
    AdditionalService[]
  >([]);

  useEffect(() => {
    (async () => setAdditionalServices(await getAllAdditionalServices()))();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {additionalServices?.map((additionalService) => (
        <Dialog key={additionalService.id}>
          <Card>
            <CardHeader>
              <Image
                className="w-full rounded-md"
                src={additionalService.image}
                alt={additionalService.alt}
                width={1000}
                height={1000}
              />
            </CardHeader>

            <CardContent>
              <CardTitle>{additionalService.title}</CardTitle>
              <CardDescription>
                A partir de{' '}
                {Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(additionalService.price)}
                /{types[additionalService.type]}
                <div className="flex items-center gap-x-2 pt-2">
                  Quantité:
                  <Input
                    className="w-[100px]"
                    defaultValue={additionalService.quantity}
                    max={additionalService.quantity}
                    placeholder="Quantité"
                    type="number"
                  />
                </div>
              </CardDescription>
            </CardContent>

            <CardFooter className="flex justify-between">
              <DialogTrigger>
                <Button variant="outline">Détails</Button>
              </DialogTrigger>
              <Button onClick={() => {}}>Réserver</Button>
            </CardFooter>
          </Card>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{additionalService.title}</DialogTitle>
            </DialogHeader>

            <div
              dangerouslySetInnerHTML={{
                __html: additionalService.description,
              }}
            ></div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
