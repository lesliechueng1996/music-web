'use client';

import { Music } from './data-type';
import { CellContext } from '@tanstack/react-table';
import { secondsToMinutes } from '@/lib/duration';

const DurationCell = <TValue,>(data: CellContext<Music, TValue>) => {
  const {
    row: { original },
  } = data;

  if (!original || !original.durationSeconds) {
    return null;
  }

  const durationText = secondsToMinutes(original.durationSeconds);

  return <span>{durationText}</span>;
};

export default DurationCell;
