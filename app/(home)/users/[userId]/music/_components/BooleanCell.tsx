'use client';

import { CellContext } from '@tanstack/react-table';

const BooleanCell = <TValue,>(data: CellContext<any, TValue>) => {
  const {
    row: { original },
  } = data;
  const key = data.column.id;

  const value = original[key];

  const text = value ? '是' : '否';

  return <span>{text}</span>;
};

export default BooleanCell;
