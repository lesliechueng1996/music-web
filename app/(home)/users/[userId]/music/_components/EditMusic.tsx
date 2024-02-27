'use client';

import { useModalDialog } from '@/components/ModalDialog';
import { useEffect, useState, useTransition } from 'react';
import MusicInfoForm, { type FormData } from './MusicInfoForm';
import { getMusicInfo, updateMusicInfo } from '@/actions/music-action';
import { toast } from 'sonner';

type Props = {
  id: string;
};

const EditMusic = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { closeDialog } = useModalDialog();
  const [musicInfo, setMusicInfo] = useState<FormData | null>(null);

  useEffect(() => {
    getMusicInfo(id).then((musicInfo) => {
      if (!musicInfo) {
        toast.error('歌曲不存在');
        closeDialog();
        return;
      }
      setMusicInfo(musicInfo);
    });
  }, [id, closeDialog]);

  const handleEditMusicInfo = (data: FormData) => {
    startTransition(async () => {
      try {
        await updateMusicInfo(id, data);
        closeDialog();
        toast.success('编辑成功');
      } catch (e) {
        toast.error('编辑失败');
      }
    });
  };

  return musicInfo ? <MusicInfoForm initData={musicInfo} isLoading={isPending} onSubmit={handleEditMusicInfo} /> : null;
};

export default EditMusic;
