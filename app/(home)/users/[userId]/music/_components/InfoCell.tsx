'use client';

import { Music } from './data-type';
import { CellContext } from '@tanstack/react-table';

const InfoCell = <TValue,>(data: CellContext<Music, TValue>) => {
  const {
    row: { original },
  } = data;

  return (
    <div className="space-y-2">
      <p>Path: {original.filePath}</p>
      <p>Hash: {original.fileHash}</p>
    </div>
  );
};

export default InfoCell;
