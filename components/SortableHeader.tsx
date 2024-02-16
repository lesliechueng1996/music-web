'use client';

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { HeaderContext } from '@tanstack/react-table';

type Meta = {
  label: string;
};

function SortableHeader<TData>(data: HeaderContext<TData, unknown>) {
  const { column } = data;
  const meta = column.columnDef.meta as Meta;
  const sorted = column.getIsSorted();

  const sortedIcon =
    sorted === false ? (
      <ArrowUpDown className="ml-2 h-4 w-4" />
    ) : sorted === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );

  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(sorted === 'asc')}>
      {meta.label ?? '未定义'}
      {sortedIcon}
    </Button>
  );
}

export default SortableHeader;
