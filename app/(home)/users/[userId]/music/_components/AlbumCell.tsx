'use client';

import { Music } from './data-type';
import { CellContext } from '@tanstack/react-table';
import { badgeVariants } from '@/components/ui/badge';
import Link from 'next/link';

const AlbumCell = <TValue,>(data: CellContext<Music, TValue>) => {
  const {
    row: { original },
  } = data;

  if (!original || !original.album) {
    return null;
  }

  const { name } = original.album;

  return (
    <Link href={`/album?name=${name}`} className={badgeVariants({ variant: 'outline' })}>
      {name}
    </Link>
  );
};

export default AlbumCell;
