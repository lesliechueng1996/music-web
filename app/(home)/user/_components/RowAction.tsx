'use client';

import type { CellContext } from '@tanstack/react-table';
import type { User } from './data-type';
import { Button } from '@/components/ui/button';
import ConfirmDelete from '@/components/ConfirmDelete';
import { removeUser } from '@/actions/user-action';

function RowAction<TValue>(data: CellContext<User, TValue>) {
  const {
    row: { original },
  } = data;

  return (
    <div className="flex items-center space-x-2">
      <Button variant="secondary">编辑</Button>
      <ConfirmDelete
        onDeleteConfirm={async () => {
          await removeUser(original.id);
        }}
        description="是否确认此用户?"
      />
    </div>
  );
}

export default RowAction;
