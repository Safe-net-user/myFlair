'use client';

import type { Service, User } from '@prisma/client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProfessionalsByTown, getAllServices } from '@/data/back-up';

import { HeaderSection } from '@/components/shop/layout';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserContext } from '@/contexts/user';
import Subscriptions from '@/components/back-up/Subscriptions';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';

export default function BackUpPage() {
  const { user } = useUserContext();

  const [service, setService] = useState('');
  const [options, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      setServices(await getAllServices());
      setProfessionals(
        await getProfessionalsByTown(user?.address?.town || 'Paris'),
      );
    })();
  }, []);

  const disabled = false;
  const handleSelect = (x: any) => setService(x);

  return (
    <main>
      <HeaderSection title="Trouvez le professionnel parfait">
        

        <Select onValueChange={(service: string) => setService(service)}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Sélectionner un service" />
          </SelectTrigger>
          <SelectContent>
            
          </SelectContent>
        </Select>
        <Button
          onClick={() =>
            (window.location.href = `/back-up/explore?service=${service}`)
          }
        >
          Explorer
        </Button>
      </HeaderSection>

      <div className="py-8">
        <section className="px-6 py-8 text-center lg:px-24">
          <h2 className="text-3xl font-bold tracking-tight">
            Que recherchez-vous ?
          </h2>
          <p className="pb-16 pt-1 text-xs text-muted-foreground sm:text-sm">
            Trouvez les services professionnels à proximité
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {options.map((service) => (
              <Link
                href="/"
                key={''}
                // href={`/back-up/explore?service=${service.value}`}
              >
                <Card className="flex flex-col items-center">
                  <CardHeader>
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={0}
                      height={0}
                      className="w-full"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mt-2">{service.title}</CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-6 py-8 text-center lg:px-24">
          <h2 className="text-3xl font-bold tracking-tight">
            Des professionnels à votre disposition
          </h2>
          <p className="pb-16 pt-1 text-xs sm:text-sm">
            Pour des solutions sur mesure
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {professionals.map((professional) => (
              <Card key={professional.id}>
                <CardHeader>
                  <Image
                    src={professional.image}
                    alt={professional.enterprise!}
                    width={0}
                    height={0}
                    className="h-16 w-16"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="mt-2">
                    {professional.enterprise}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex">La position</div>
                    <div className="flex justify-end">
                      <Link
                        href={`/back-up/professional/${professional.id}`}
                      >
                        <Button role="link">Réserver</Button>
                      </Link>
                    </div>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Subscriptions />
      </div>
    </main>
  );
}