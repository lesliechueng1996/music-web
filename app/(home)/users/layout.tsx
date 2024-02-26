import { ReactNode } from 'react';
import UserSelect from './_components/UserSelect';
import { getUserOptions } from '@/services/user-service';
import { Separator } from '@/components/ui/separator';

type Props = {
  children: ReactNode;
};

const UsersLayout = async ({ children }: Props) => {
  const userOptions = await getUserOptions();

  return (
    <div className="space-y-5">
      <UserSelect userList={userOptions} />
      <Separator />
      {children}
    </div>
  );
};

export default UsersLayout;
