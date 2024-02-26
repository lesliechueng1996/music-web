'use client';

import { getUploadMusicToken } from '@/actions/music-action';
import DialogForm from '@/components/DialogForm';
import InputWithLabel from '@/components/InputWithLabel';
import LoadingButton from '@/components/LoadingButton';
import { FormEventHandler } from 'react';
import * as qiniu from 'qiniu-js';
import { toast } from 'sonner';
import { getAudioDuration } from '@/lib/music';

type Props = {
  name: string;
  isLoading: boolean;
  key: string | null;
  onUploadFinish: (key: string, hash: string, durationSeconds: number) => void;
};

const MusicFileForm = ({ name, key, onUploadFinish, isLoading }: Props) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    const formElm = e.target as HTMLFormElement;
    const formData = new FormData(formElm);
    const file = formData.get('file') as File;
    const suffix = file.name.split('.').pop();
    const fileName = `${name}.${suffix}`;
    const token = await getUploadMusicToken(fileName);

    const observable = qiniu.upload(file, key, token, {
      fname: fileName,
    });
    observable.subscribe({
      error: () => {
        toast.error('上传失败');
      },
      complete: async (res) => {
        const { key, hash } = res;
        const duration = await getAudioDuration(file);
        onUploadFinish(key, hash, duration);
      },
    });
  };

  return (
    <DialogForm onSubmit={handleSubmit}>
      <InputWithLabel name="file" label="歌曲文件" accept="audio/*" required />
      <div className="text-right">
        <LoadingButton text="保存" isLoading={isLoading} type="submit" />
      </div>
    </DialogForm>
  );
};

export default MusicFileForm;
