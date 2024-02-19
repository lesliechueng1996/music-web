'use client';

import { useTransition } from 'react';
import { useModalDialog } from '@/components/ModalDialog';
import { toast } from 'sonner';
import SingerForm, { type FormData } from './SingerForm';
import { createSinger } from '@/actions/singer-action';

const CreateSinger = () => {
  const [isPending, startTransition] = useTransition();
  const { closeDialog } = useModalDialog();

  const handleCreateAlbum = (data: FormData) => {
    startTransition(async () => {
      try {
        await createSinger(data);
        closeDialog();
        toast.success('创建成功');
      } catch (e) {
        toast.error('创建失败');
      }
    });
  };

  return <SingerForm isLoading={isPending} onSubmit={handleCreateAlbum} />;
};

export default CreateSinger;
