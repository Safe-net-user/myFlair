'use client';

import type { Row, Table } from '@tanstack/react-table';

import * as z from 'zod';

import { useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { fr } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';

import {
  updateBusinessBoosterById,
  deleteBusinessBoostersById,
} from '@/data/services';
import { businessBoosterSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const { toast } = useToast();
  const [date, setDate] = useState(
    format(row.getValue('date'), 'dd LLL y', { locale: fr }),
  );
  const form = useForm<z.infer<typeof businessBoosterSchema>>({
    resolver: zodResolver(businessBoosterSchema),
    defaultValues: {
      title: row.getValue('titre'),
      price: row.getValue('prix'),
      // date: row.getValue('date'),
    },
  });

  async function onSubmit(values: z.infer<typeof businessBoosterSchema>) {
    const success = await updateBusinessBoosterById(row.getValue('id'), values);

    if (success) {
      toast({
        title: 'Succès',
        description: 'Business booster mis à jour avec succès !',
        duration: 3000,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Mince...',
        description: 'Une erreur est survenue !',
        action: (
          <ToastAction
            altText="Réessayer"
            onClick={() => deleteOneOrManyBusinessBoosters(row)}
          >
            Réessayer
          </ToastAction>
        ),
      });
    }
  }

  async function deleteOneOrManyBusinessBoosters<TData>(row: Row<TData>) {
    const selectedRows: string[] = table
      .getSelectedRowModel()
      .rows.map((row) => row.getValue('id'));

    const rows =
      selectedRows.length > 0 ? selectedRows : [row.getValue('id') as string];

    const success = await deleteBusinessBoostersById(rows);

    const description =
      rows.length > 0
        ? 'Les business boosters ont été supprimé avec succès !'
        : 'Le business booster à été supprimé avec succès !';

    if (success) {
      toast({
        title: 'Succès',
        description: description,
        duration: 3000,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Mince...',
        description: 'Une erreur est survenue !',
        action: (
          <ToastAction
            altText="Réessayer"
            onClick={() => deleteOneOrManyBusinessBoosters(row)}
          >
            Réessayer
          </ToastAction>
        ),
      });
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Ouvrir le menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer !bg-destructive !text-destructive-foreground hover:!bg-destructive/90"
            onClick={() => deleteOneOrManyBusinessBoosters(row)}
          >
            Annuler
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
