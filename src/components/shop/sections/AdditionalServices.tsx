'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

interface AdditionalService {
  id: string,
  image: string;
  alt: string;
  title: string;
  description: string;
  price: number;
  type: string;
  sales: number | null; 
  quantity: number;
  [key: string]: string | boolean | number | undefined | null | Date; 
}

export default function AdditionalServices() {
  const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>([]);
  const [quantity, setQuantity] = useState<{ [id: string]: number }>({});
  const [buttonInvalid, setButtonInvalid] = useState<{ [id: string]: boolean }>({});

  const handleServiceChange = (id: string, value: number) => {
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  useEffect(() => {
    fetch('/api/serviceAdditionnel/get', {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: AdditionalService[]) => {
        console.log('Services fetched:', data);
        setAdditionalServices(data);
      })
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  useEffect(() => {
    const updatedButtonInvalid = { ...buttonInvalid };
    additionalServices.forEach((service) => {
      if (quantity[service.id] > service.quantity) {
        updatedButtonInvalid[service.id] = true;
      } else {
        updatedButtonInvalid[service.id] = false;
      }
    });
    setButtonInvalid(updatedButtonInvalid);
  }, [quantity, additionalServices]);

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
                /{additionalService.type}
                <div className="flex items-center gap-x-2 pt-2">
                  Quantité:
                  <Input
                    className="w-[100px]"
                    value={quantity[additionalService.id] || 1}
                    max={additionalService.quantity}
                    onChange={(e) => handleServiceChange(additionalService.id, Number(e.target.value))}
                    placeholder="Quantité"
                    type="number"
                  />
                  {quantity[additionalService.id] === additionalService.quantity &&(
                    <span style={{ color: 'orange' }}>Limite disponible atteinte</span>
                  )}
                  {quantity[additionalService.id] > additionalService.quantity && (
                    <span style={{ color: '#d50000' }}>Demande supérieure aux stocks</span>
                  )}
                </div>
              </CardDescription>
            </CardContent>

            <CardFooter className="flex justify-between">
              <DialogTrigger>
                <Button variant="outline">Détails</Button>
              </DialogTrigger>
              <Button disabled={buttonInvalid[additionalService.id]} onClick={() => {}}>Réserver</Button>
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
