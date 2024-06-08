'use client';

import type { Order } from '@prisma/client';

import { useEffect, useState } from 'react';
import { UserRole } from '@prisma/client';

import { useUserContext } from '@/contexts/user';
import { getOrderById } from '@/data/order';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Page({
  params: { slug },
}: Readonly<{ params: { slug: string } }>) {
  const { user } = useUserContext();

  const [order, setOrder] = useState<Order | null>();

  useEffect(() => {
    (async () => {
      const _order = await getOrderById(slug);

      if (!_order) window.location.href = '/';

      setOrder(_order);
    })();
  });

  if (order) {
    return (
      <main className="flex w-full flex-col justify-center space-y-16 p-24">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="text-center">
            Numéro de commande: <b>{order.id}</b>
          </div>
          <div className="text-center">
            Date: <b>{order.createdAt.toString()}</b>
          </div>
          <div>
            Total:{' '}
            <b>
              {Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }).format(0)}
            </b>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Produit</TableHead>
              <TableHead>Date de réservation</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead className="text-right">Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1241241234123</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div>
          <h3>Adresse de facturation</h3>
          {user?.role === UserRole.PROFESSIONAL && (
            <p>Nom de l&apos;entreprise: {user?.enterprise}</p>
          )}
          <p>
            Nom et prénom: {user?.lastName} {user?.firstName}
          </p>
          <p>
            Adresse: {user?.address.street}, {user?.address.town}
          </p>
          <p>Code postal: {user?.address.postalCode}</p>
          <p>Numéro de téléphone: {user?.phone}</p>
          <p>Adresse e-mail: {user?.email}</p>
        </div>
      </main>
    );
  }
}
