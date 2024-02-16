'use client';

import { useTransition } from 'react';
import UserForm, { type FormData } from './UserForm';
import { useModalDialog } from '@/components/ModalDialog';
import { toast } from 'sonner';
import { createUser } from '@/actions/user-action';

const CreateUser = () => {
  const [isPending, startTransition] = useTransition();
  const { closeDialog } = useModalDialog();

  const handleCreateUser = (data: FormData) => {
    startTransition(async () => {
      try {
        await createUser(data);
        closeDialog();
        toast.success('创建成功');
      } catch (e) {
        toast.error('创建失败');
      }
    });
  };

  return <UserForm isLoading={isPending} onSubmit={handleCreateUser} />;
};

export default CreateUser;
