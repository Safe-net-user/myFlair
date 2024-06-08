'use client';

import type { Training } from '@prisma/client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getAllTrainings } from '@/data/training';

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

export default function Trainings() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    (async () => setTrainings(await getAllTrainings()))();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trainings?.map((training) => (
        <Dialog key={training.id}>
          <Card>
            <CardHeader>
              <Image
                className="w-full rounded-md"
                src={training.image}
                alt={training.alt}
                width={1000}
                height={1000}
              />
            </CardHeader>

            <CardContent>
              <CardTitle>{training.title}</CardTitle>
              <CardDescription>
                A partir de{' '}
                {Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(training.price)}
                /jour
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
              <DialogTitle>{training.title}</DialogTitle>
            </DialogHeader>

            <div
              dangerouslySetInnerHTML={{ __html: training.description }}
            ></div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
