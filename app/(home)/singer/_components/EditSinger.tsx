'use client';

import { useEffect, useState, useTransition } from 'react';
import { useModalDialog } from '@/components/ModalDialog';
import { toast } from 'sonner';
import SingerForm, { type FormData } from './SingerForm';
import { getSingerInfo, updateSingerInfo } from '@/actions/singer-action';

type Props = {
  id: string;
};

const EditSinger = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { closeDialog } = useModalDialog();
  const [singer, setSinger] = useState<FormData | null>(null);

  useEffect(() => {
    const fetchSingerInfo = async () => {
      const singer = await getSingerInfo(id);
      if (!singer) {
        toast.error('歌手不存在');
        closeDialog();
        return;
      }
      setSinger(singer);
    };

    fetchSingerInfo();
  }, [id, closeDialog]);

  const handleEditSinger = (data: FormData) => {
    startTransition(async () => {
      try {
        await updateSingerInfo(id, data);
        closeDialog();
        toast.success('编辑成功');
      } catch (e) {
        toast.error('编辑失败');
      }
    });
  };

  return singer ? <SingerForm initData={singer} isLoading={isPending} onSubmit={handleEditSinger} /> : null;
};

export default EditSinger;
