'use client';

import { Music } from './data-type';
import { CellContext } from '@tanstack/react-table';
import { badgeVariants } from '@/components/ui/badge';
import Link from 'next/link';

const SingersCell = <TValue,>(data: CellContext<Music, TValue>) => {
  const {
    row: { original },
  } = data;

  if (!original || !original.singers) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      {original.singers.map((singer) => (
        <Link key={singer.id} href={`/singer?name=${singer.name}`} className={badgeVariants({ variant: 'secondary' })}>
          {singer.name}
        </Link>
      ))}
    </div>
  );
};

export default SingersCell;
