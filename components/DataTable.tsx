'use client';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTablePagination } from './DataTablePagination';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type PaginationAndOrderUrl = {
  pageIndex?: string;
  pageSize?: string;
  sortField?: string;
  isDesc?: string;
};

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
};

function DataTable<TData, TValue>({ data, columns, total }: Props<TData, TValue>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Number(searchParams.get('pageIndex')) || 0,
    pageSize: Number(searchParams.get('pageSize')) || 10,
  });
  const [sorting, setSorting] = useState<SortingState>(() => {
    const sortField = searchParams.get('sortField');
    const isDesc = searchParams.get('isDesc');

    if (sortField && isDesc) {
      return [
        {
          id: sortField,
          desc: isDesc === 'true',
        },
      ];
    }

    return [];
  });

  const pageCount = Math.ceil(total / pagination.pageSize);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    meta: {
      total,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('pageIndex', String(pagination.pageIndex));
    params.set('pageSize', String(pagination.pageSize));

    if (sorting && sorting.length > 0) {
      const sortedField = sorting[0];
      params.set('sortField', sortedField.id);
      params.set('isDesc', String(sortedField.desc));
    } else {
      params.delete('sortField');
      params.delete('isDesc');
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, [pagination, searchParams, pathname, router, sorting]);

  return (
    <div className="space-y-5">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={typeof header.column.columnDef.header === 'function' ? 'px-0' : ''}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                暂无数据
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;
