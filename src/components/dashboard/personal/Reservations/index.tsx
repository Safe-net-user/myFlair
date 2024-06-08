'use client';

import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import type { Reservation } from '@prisma/client';

import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ReservationStatus } from '@prisma/client';
import 'react-quill/dist/quill.snow.css';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useUserContext } from '@/contexts/user';
import {
  getAllReservationsByPersonalId,
  updateReservationById,
} from '@/data/reservation';

import { DataTablePagination } from './data-table-pagination';

import { SubmitButton } from '@/components/button';
import { TabsContent } from '@/components/tabs';
import { error, success, toastAction } from '@/components/toast';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DataTableViewOptions } from './data-table-view-options';

const ActionCell = ({ row, table }: { row: any; table: any }) => {
  const { toast } = useToast();

  const [reason, setReason] = useState('');
  const [pending, setPending] = useState(false);

  const meta = table.options.meta;

  async function update() {
    setPending(true);

    const response = await updateReservationById(row.getValue('id'), {
      reason,
      status: ReservationStatus.CANCELED,
    });

    setPending(false);

    if (response) {
      success(toast, {
        description: 'Réservation annulée avec succès !',
      });

      meta?.updateData(row.index, 'status', ReservationStatus.CANCELED);
    } else {
      error(toast, {
        action: toastAction(update),
      });
    }
  }

  if (row.getValue('status') === ReservationStatus.CANCELED)
    return (
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Raison</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Raison de l&apos;annulation</DialogTitle>
          </DialogHeader>

          <p></p>
        </DialogContent>
      </Dialog>
    );

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-4">
        <Dialog>
          <DialogTrigger>
            <Button>Annuler</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Annuler une réservation</DialogTitle>
              <DialogDescription>
                Indiquez la raison de l&apos;annulation.
              </DialogDescription>
            </DialogHeader>

            <div>
              <ReactQuill
                value={reason}
                onChange={setReason}
                placeholder="Raison"
                theme="snow"
              />
            </div>

            <DialogFooter>
              <SubmitButton pending={pending} onClick={update}>
                Annuler
              </SubmitButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const columnHelper = createColumnHelper<Reservation>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: ({ getValue }) => <TableCell>{getValue()}</TableCell>,
  }),
  columnHelper.accessor('status', {
    header: 'Statut',
    cell: ({ getValue }) => (
      <TableCell>
        <Badge
          variant={
            getValue() === ReservationStatus.CANCELED
              ? 'destructive'
              : 'outline'
          }
        >
          {getValue() === ReservationStatus.CANCELED ? 'Annulé' : 'En cours'}
        </Badge>
      </TableCell>
    ),
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: ({ getValue }) => (
      <TableCell>{format(getValue(), 'dd LLL y', { locale: fr })}</TableCell>
    ),
  }),
  columnHelper.accessor('price', {
    header: 'Prix',
    cell: ({ getValue }) => <TableCell>{getValue()}</TableCell>,
  }),
  columnHelper.display({
    id: 'action',
    cell: ActionCell,
  }),
];

export default function OrdersTab() {
  const { user } = useUserContext();

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [editedRows, setEditedRows] = useState({});
  const [data, setData] = useState<Reservation[]>([]);

  useEffect(() => {
    (async () => {
      const x = await getAllReservationsByPersonalId(user?.id!);
      setData(x);
    })();
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      editedRows,
      setEditedRows,
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
  });

  return (
    <TabsContent title="Réservations" value="reservations">
      <div className="space-y-4">
        <DataTableViewOptions table={table} />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Aucune réservation.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </TabsContent>
  );
}
