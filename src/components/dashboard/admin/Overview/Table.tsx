'use client';

import { useEffect, useState } from 'react';
import { BarChart2Icon } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getAllAdditionalServicesBySales } from '@/data/dashboard/admin';
import { AdditionalService } from '@prisma/client';

export default function OverviewTable() {
  const [additionalServices, setAdditionalServices] = useState<
    AdditionalService[]
  >([]);

  useEffect(() => {
    (async () =>
      setAdditionalServices(await getAllAdditionalServicesBySales()))();
  });

  return (
    <Table>
      <TableCaption>
        <div className="flex flex-row items-center justify-center gap-2">
          <BarChart2Icon className="h-4 w-4" />
          Articles les plus vendus.
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Classement</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead className="text-right">Quantité</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {additionalServices.map((additionalService, index) => (
          <TableRow key={additionalService.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{additionalService.title}</TableCell>
            <TableCell className="text-right">
              {additionalService.sales}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">
            {additionalServices.reduce((a, b) => a + b.sales, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
