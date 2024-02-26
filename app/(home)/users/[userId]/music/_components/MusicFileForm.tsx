'use client';

import { getUploadMusicToken } from '@/actions/music-action';
import DialogForm from '@/components/DialogForm';
import InputWithLabel from '@/components/InputWithLabel';
import LoadingButton from '@/components/LoadingButton';
import { FormEventHandler } from 'react';
import * as qiniu from 'qiniu-js';
import { toast } from 'sonner';
import { getAudioDuration } from '@/lib/music';

export type MusicFileProps = {
  key: string;
  hash: string;
  duration: number;
};

type Props = {
  name: string;
  isLoading: boolean;
  key: string | null;
  onUploadFinish: (uploadMusicFn: () => Promise<MusicFileProps>) => void;
};

const MusicFileForm = ({ name, key, onUploadFinish, isLoading }: Props) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    const formElm = e.target as HTMLFormElement;
    const formData = new FormData(formElm);
    const file = formData.get('file') as File;
    const suffix = file.name.split('.').pop();
    const fileName = `${name}.${suffix}`;

    const uploadMusic = async () => {
      const token = await getUploadMusicToken(key);
      return new Promise<MusicFileProps>((resolve, reject) => {
        const observable = qiniu.upload(file, key, token, {
          fname: fileName,
        });
        observable.subscribe({
          error: () => {
            toast.error('上传失败');
            reject();
          },
          complete: async (res) => {
            const { key, hash } = res;
            const duration = await getAudioDuration(file);
            resolve({
              key,
              hash,
              duration,
            });
          },
        });
      });
    };

    onUploadFinish(uploadMusic);
  };

  return (
    <DialogForm onSubmit={handleSubmit}>
      <InputWithLabel name="file" type="file" label="歌曲文件" accept="audio/*" required />
      <div className="text-right">
        <LoadingButton text="保存" isLoading={isLoading} type="submit" />
      </div>
    </DialogForm>
  );
};

export default MusicFileForm;
