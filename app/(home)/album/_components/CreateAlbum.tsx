'use client';

import { useTransition } from 'react';
import { useModalDialog } from '@/components/ModalDialog';
import { toast } from 'sonner';
import AlbumForm, { type FormData } from './AlbumForm';
import { createAlbum } from '@/actions/album-action';

const CreateAlbum = () => {
  const [isPending, startTransition] = useTransition();
  const { closeDialog } = useModalDialog();

  const handleCreateAlbum = (data: FormData) => {
    startTransition(async () => {
      try {
        await createAlbum(data);
        closeDialog();
        toast.success('创建成功');
      } catch (e) {
        toast.error('创建失败');
      }
    });
  };

  return <AlbumForm isLoading={isPending} onSubmit={handleCreateAlbum} />;
};

export default CreateAlbum;
