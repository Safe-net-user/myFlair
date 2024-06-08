'use client';

import type { Review } from '@prisma/client';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<Review>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    id: 'titre',
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
    cell: ({ row }) => row.getValue('titre'),
    enableSorting: false,
  },
  {
    id: 'prix',
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
    cell: ({ row }) =>
      Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(row.getValue('prix')),
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {format(row.getValue('date'), 'MMMM', { locale: fr })}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
    enableHiding: false,
    enableSorting: false,
  },
];
