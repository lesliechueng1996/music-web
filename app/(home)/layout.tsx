import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from './_components/navbar';
import Sidebar from './_components/sidebar';

type Props = {
  children: ReactNode;
};

const HomeLayout = async ({ children }: Props) => {
  const session = await auth();
  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className="bg-background flex h-screen flex-col">
      <nav className="shrink-0">
        <Navbar />
      </nav>
      <div className="grow flex">
        <aside className="shrink-0">
          <Sidebar />
        </aside>
        <main className="grow p-5">{children}</main>
      </div>
    </div>
  );
};

export default HomeLayout;
