'use client';

import DialogForm from '@/components/DialogForm';
import InputWithLabel from '@/components/InputWithLabel';
import LoadingButton from '@/components/LoadingButton';
import { useModalDialog } from '@/components/ModalDialog';
import TextareaWithLabel from '@/components/TextareaWithLabel';
import useLyric from '@/hooks/useLyric';
import { secondsToLyricTime } from '@/lib/duration';
import { FormEventHandler } from 'react';

type Props = {
  getCurrentTime: () => number;
  onFinished: () => void;
};

const InsertLyricForm = ({ getCurrentTime, onFinished }: Props) => {
  const { insertLyricLine } = useLyric();
  const { closeDialog } = useModalDialog();

  const handleInsertLyric: FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const time = formData.get('time') as string;
    const lyric = formData.get('lyric') as string;
    insertLyricLine({ time, text: lyric });
    closeDialog();
    onFinished();
  };

  return (
    <DialogForm onSubmit={handleInsertLyric}>
      <InputWithLabel name="time" label="时间" defaultValue={secondsToLyricTime(getCurrentTime())} />
      <TextareaWithLabel name="lyric" label="歌词" />
      <div className="text-right">
        <LoadingButton text="保存" isLoading={false} type="submit" />
      </div>
    </DialogForm>
  );
};

export default InsertLyricForm;
