'use client';

import { getAlbumOptions } from '@/actions/album-action';
import { getSingerOptions } from '@/actions/singer-action';
import ComboboxWithLabel from '@/components/ComboboxWithLabel';
import DialogForm from '@/components/DialogForm';
import InputWithLabel from '@/components/InputWithLabel';
import LoadingButton from '@/components/LoadingButton';
import SelectWithLabel from '@/components/SelectWithLabel';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

export type FormData = {
  name: string;
  albumId: string;
  singerIds: string[];
};

type Props = {
  initData?: FormData;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
};

type Options = Array<{
  label: string;
  value: string;
}>;

const MusicInfoForm = ({ initData, onSubmit, isLoading }: Props) => {
  const [albumOptions, setAlbumOptions] = useState<Options>([]);
  const [singerOptions, setSingerOptions] = useState<Options>([]);

  useEffect(() => {
    Promise.all([getAlbumOptions(), getSingerOptions()]).then(([albumOptions, singerOptions]) => {
      setAlbumOptions(albumOptions);
      setSingerOptions(singerOptions);
    });
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formElm = e.target as HTMLFormElement;
    const formData = new FormData(formElm);
    const name = formData.get('name') as string;
    const albumId = formData.get('albumId') as string;
    const singerIds = formData.get('singerIds') as string;

    if (!name) {
      toast.warning('歌曲名不能为空');
      return;
    }

    if (!albumId) {
      toast.warning('请选择专辑');
      return;
    }

    if (!singerIds) {
      toast.warning('请选择歌手');
      return;
    }

    onSubmit({ name, albumId, singerIds: singerIds.split(',') });
  };

  return (
    <DialogForm onSubmit={handleSubmit}>
      <InputWithLabel name="name" label="歌曲名" maxLength={32} required defaultValue={initData?.name ?? ''} />
      <SelectWithLabel name="albumId" label="所属专辑" options={albumOptions} />
      <ComboboxWithLabel name="singerIds" label="歌手" options={singerOptions} placeholder="请选择歌手" />
      <div className="text-right">
        <LoadingButton text="下一步" isLoading={isLoading} type="submit" />
      </div>
    </DialogForm>
  );
};

export default MusicInfoForm;
