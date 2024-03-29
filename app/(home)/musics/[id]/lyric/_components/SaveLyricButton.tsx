'use client';

import { saveTextLyric } from '@/actions/lyric-action';
import LoadingButton from '@/components/LoadingButton';
import { Input } from '@/components/ui/input';
import useLyric from '@/hooks/useLyric';
import { joinLyricLines } from '@/lib/lyric';
import { useParams } from 'next/navigation';
import { FormEventHandler, useTransition } from 'react';
import { toast } from 'sonner';

const SaveLyricButton = () => {
  const [isPending, startTransition] = useTransition();
  const { lyricLines } = useLyric();
  const params = useParams<{ id: string }>();

  const handleOnSave: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const lyricName = formData.get('lyricName') as string;
    const musicId = params.id;
    const plainText = joinLyricLines(lyricLines);

    startTransition(async () => {
      try {
        await saveTextLyric(musicId, lyricName, plainText);
        toast.success('保存成功');
      } catch (e) {
        toast.error('保存失败');
      }
    });
  };

  return (
    <form onSubmit={handleOnSave} className="flex gap-3 items-center">
      <Input name="lyricName" placeholder="自定义文件名" type="text" className="max-w-64" />
      <LoadingButton type="submit" text="保存" isLoading={isPending} />
    </form>
  );
};

export default SaveLyricButton;
