'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  userList: Array<{
    id: string;
    username: string;
  }>;
};

const UserSelect = ({ userList }: Props) => {
  const params = useParams<{
    userId: string;
  }>();
  const router = useRouter();
  const query = useSearchParams();

  const userId = params.userId;

  const handleUserChange = (value: string) => {
    router.push(`/users/${value}/${query.get('target')}`);
  };

  return (
    <Select value={userId} onValueChange={handleUserChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="请选择用户" />
      </SelectTrigger>
      <SelectContent>
        {userList.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.username}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserSelect;
