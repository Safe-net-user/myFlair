'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Workplace {
  id: number;
  image: string;
  title: string;
  description: string;
  durationWeekStartHour: number;
  durationWeekStartMinute: number;
  durationWeekEndHour: number;
  durationWeekEndMinute: number;
  durationSaturdayStartHour: number;
  durationSaturdayStartMinute: number;
  durationSaturdayEndHour: number;
  durationSaturdayEndMinute: number;
  weekPrice: string;
  saturdayPrice: string;
  stock: number;
  valide?: boolean;
  alt?: string;
}

const Workplaces = () => {
  const [workplaces, setWorkplaces] = useState<Workplace[]>([]);

  useEffect(() => {
    fetch('/api/post/get', {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Workplace[]) => {
        console.log('Services fetched:', data);
        setWorkplaces(data);
      })
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {workplaces.map((workplace) => (
        
        <Dialog key={workplace.id}>
          
          <Card style={{margin:0}}>
          <Image
                className="w-full rounded-md"
                src={workplace.image}
                alt={workplace.alt ?? ''}
                width={1000}
                height={1000}
              />
            <CardHeader>
              
            </CardHeader>

            <CardContent>
              <CardTitle>{workplace.title}</CardTitle>
              <CardDescription>
                A partir de{' '}
                {Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(parseFloat(workplace.weekPrice))}
                /jour
              </CardDescription>
            </CardContent>

            <CardFooter className="flex justify-between">
              <DialogTrigger>
                <Button variant="outline">Détails</Button>
              </DialogTrigger>
              <Link href={`/shop/steps/reservation/${workplace.id}`}>
                <Button>Réserver</Button>
              </Link>
            </CardFooter>
          </Card>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{workplace.title}</DialogTitle>
            </DialogHeader>

            <div dangerouslySetInnerHTML={{ __html: workplace.description }} />
      
            <div><span style={{fontWeight:'700'}}>Tarifs de réservation :</span></div>
            <div><li>Du Lundi au vendredi: <span style={{fontWeight:'700'}}>{workplace.weekPrice} € / JOUR</span></li></div>
            <div><li>Le Samedi: <span style={{fontWeight:'700'}}>{workplace.saturdayPrice} €</span></li></div>
            <div><span style={{fontWeight:'700'}}>Ouverture durant la semaine :</span><br /> De {workplace.durationWeekStartHour}heures {workplace.durationWeekStartMinute} à {workplace.durationWeekEndHour}heures {workplace.durationWeekEndMinute}</div>
            <div><span style={{fontWeight:'700'}}>Ouverture durant le Samedi :</span><br /> De {workplace.durationSaturdayStartHour}heures {workplace.durationSaturdayStartMinute} à {workplace.durationSaturdayEndHour}heures {workplace.durationSaturdayEndMinute}</div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

export default Workplaces;
