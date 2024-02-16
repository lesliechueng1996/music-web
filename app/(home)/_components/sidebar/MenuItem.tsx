'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  label: string;
  icon: ReactNode;
  href: string;
};

function MenuItem({ label, icon, href }: Props) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-5 px-2 py-3 hover:bg-secondary rounded-sm transition duration-300 ${
        isActive ? 'bg-secondary' : ''
      }`}
    >
      {icon}
      <p>{label}</p>
    </Link>
  );
}

export default MenuItem;
