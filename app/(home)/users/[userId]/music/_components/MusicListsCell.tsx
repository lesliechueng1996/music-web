'use client';

import { Music } from './data-type';
import { CellContext } from '@tanstack/react-table';
import { badgeVariants } from '@/components/ui/badge';
import Link from 'next/link';

const MusicListsCell = <TValue,>(data: CellContext<Music, TValue>) => {
  const {
    row: { original },
  } = data;

  if (!original || !original.musicLists) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      {original.musicLists.map((list) => (
        <Link key={list.id} href={`/singer?name=${list.name}`} className={badgeVariants({ variant: 'default' })}>
          {list.name}
        </Link>
      ))}
    </div>
  );
};

export default MusicListsCell;
