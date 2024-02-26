'use client';

import { useState, useTransition } from 'react';
import { useModalDialog } from '@/components/ModalDialog';
import { toast } from 'sonner';
import MusicInfoForm, { type FormData } from './MusicInfoForm';
import MusicFileForm from './MusicFileForm';
import { createMusic } from '@/actions/music-action';
import { useParams } from 'next/navigation';

const CreateMusic = () => {
  const [musicInfo, setMusicInfo] = useState<FormData>();
  const [isPending, startTransition] = useTransition();
  const params = useParams<{ userId: string }>();
  const { closeDialog } = useModalDialog();

  const handleCreateMusic = (key: string, hash: string, durationSeconds: number) => {
    if (!musicInfo) {
      return;
    }
    startTransition(async () => {
      try {
        await createMusic({ ...musicInfo, filePath: key, fileHash: hash, durationSeconds, userId: params.userId });
        closeDialog();
        toast.success('创建成功');
      } catch (e) {
        toast.error('创建失败');
      }
    });
  };

  if (!musicInfo) {
    return <MusicInfoForm onSubmit={setMusicInfo} isLoading={false} />;
  }

  return <MusicFileForm name={musicInfo.name} key={null} isLoading={isPending} onUploadFinish={handleCreateMusic} />;
};

export default CreateMusic;
