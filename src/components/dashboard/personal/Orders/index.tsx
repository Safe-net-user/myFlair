'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
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

import {
  Table,
  TableBody,
  TableCell as UiTableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TabsContent } from '@/components/tabs';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import React from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

type Option = {
  label: string;
  value: string;
};

type Student = {
 
  orderID: number;
  prix: number;
  dateOfBirth: string;
  
};

const TableCell = ({
  
  getValue,
  row,
  column,
  table,
}: {
  getValue: any;
  row: any;
  column: any;
  table: any;
}) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  const formattedValue =
    column.id === 'dateOfBirth' && value
      ? format(parseISO(value), 'dd MMMM yyyy', { locale: fr })
      : value;

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === 'select' ? (
      <UiTableCell>
        <select onChange={onSelectChange} value={initialValue}>
          {(columnMeta?.options as Option[])?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </UiTableCell>
    ) : (
      <UiTableCell>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          type={columnMeta?.type || 'text'}
        />
      </UiTableCell>
    );
  }
  return <UiTableCell>{formattedValue}</UiTableCell>;
};

const columnHelper = createColumnHelper<Student>();

const columns = [
  columnHelper.accessor('orderID', {
    header: 'Commandes',
    cell: TableCell,
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('dateOfBirth', {
    header: 'Date',
    cell: TableCell,
    meta: {
      type: 'date',
    },
  }),
  columnHelper.accessor('prix', {
    header: 'Prix',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.display({
    id: 'action',
    header: 'Actions',
    cell: ({ row }) => (
      <Link href={`/dashboard/personal/orders/${row.original.orderID}`}>
        <Button>Voir</Button>
      </Link>
    ),
  }),
];

const defaultData: Student[] = [
  {
  
    orderID: 1111,
    prix: 19967,
    dateOfBirth: '1984-01-04',
  },
  {
   
    orderID: 2222,
    prix: 45650,
    dateOfBirth: '1961-05-10',
  },
  {
    
    orderID: 3333,
    prix: 2354,
    dateOfBirth: '1991-10-12',
  },
  {

    orderID: 4444,
    prix: 12460,
    dateOfBirth: '1978-09-24',
  },
];



export const FooterCell = ({ table }: { table: any }) => {
  const meta = table.options.meta;

  const removeRows = () => {
    meta.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row: any) => row.index),
    );
    table.resetRowSelection();
  };
  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="footer-buttons">
      {selectedRows.length > 0 ? (
        <button className="remove-button" onClick={removeRows}>
          Remove Selected x
        </button>
      ) : null}
      <br />
      <button className="add-button" onClick={meta?.addRow}>
        Ajouter +
      </button>
    </div>
  );
};

export default function OrdersTab() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [editedRows, setEditedRows] = useState({});
  const [data, setData] = useState(defaultData);

  const [originalData, setOriginalData] = useState(() => [...defaultData]);

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
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row,
            ),
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) =>
              index === rowIndex ? data[rowIndex] : row,
            ),
          );
        }
      },
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
      addRow: () => {
        const newRow: Student = {
          orderID: Math.floor(Math.random() * 100000),
          prix: 0,
          dateOfBirth: '',
    
      
          
        };
        const setFunc = (old: Student[]) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: Student[]) =>
          old.filter((_row: Student, index: number) => index !== rowIndex);
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
      removeSelectedRows: (selectedRows: number[]) => {
        const setFilterFunc = (old: Student[]) =>
          old.filter((_row, index) => !selectedRows.includes(index));
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
  });
  
  return (
    <TabsContent title="Commandes" value="orders">
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.getContext()} />
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <UiTableCell colSpan={table.getCenterLeafColumns().length} className="h-24 text-center">
                    Aucun résultat.
                  </UiTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </th>
          </tr>
        </tfoot>
      </div>
    </TabsContent>
  );

}
