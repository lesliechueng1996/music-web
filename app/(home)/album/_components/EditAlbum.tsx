'use client';

import { useEffect, useState, useTransition } from 'react';
import { useModalDialog } from '@/components/ModalDialog';
import { toast } from 'sonner';
import AlbumForm, { type FormData } from './AlbumForm';
import { getAlbumInfo, updateAlbumInfo } from '@/actions/album-action';

type Props = {
  id: string;
};

const EditAlbum = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { closeDialog } = useModalDialog();
  const [album, setAlbum] = useState<FormData | null>(null);

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      const album = await getAlbumInfo(id);
      if (!album) {
        toast.error('专辑不存在');
        closeDialog();
        return;
      }
      setAlbum(album);
    };

    fetchAlbumInfo();
  }, [id, closeDialog]);

  const handleCreateAlbum = (data: FormData) => {
    startTransition(async () => {
      try {
        await updateAlbumInfo(id, data);
        closeDialog();
        toast.success('创建成功');
      } catch (e) {
        toast.error('创建失败');
      }
    });
  };

  return album ? <AlbumForm initData={album} isLoading={isPending} onSubmit={handleCreateAlbum} /> : null;
};

export default EditAlbum;
