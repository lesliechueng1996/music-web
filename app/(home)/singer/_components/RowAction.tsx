'use client';

import type { CellContext } from '@tanstack/react-table';
import type { Singer } from './data-type';
import { Button } from '@/components/ui/button';
import ConfirmDelete from '@/components/ConfirmDelete';
import { removeSinger, getUploadSingerImgToken, updateSingerImage } from '@/actions/singer-action';
import ModalDialog from '@/components/ModalDialog';
import EditSinger from './EditSinger';
import CropperImage from '@/components/CropperImage';
import * as qiniu from 'qiniu-js';
import { toast } from 'sonner';

function RowAction<TValue>(data: CellContext<Singer, TValue>) {
  const {
    row: { original },
  } = data;

  const handleUploadImage = async (file: File) => {
    const imageKey = original.image || null;
    const token = await getUploadSingerImgToken(imageKey);
    return new Promise<void>((resolve, reject) => {
      const observable = qiniu.upload(file, imageKey, token, {
        fname: file.name,
      });
      observable.subscribe({
        error: () => {
          toast.error('上传失败');
          reject();
        },
        complete: (res) => {
          const key = res.key;
          updateSingerImage(original.id, key).then(resolve, reject);
        },
      });
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <ModalDialog trigger={<Button variant="secondary">编辑</Button>} title="编辑歌手">
        <EditSinger id={original.id} />
      </ModalDialog>
      <ModalDialog trigger={<Button variant="outline">上传图片</Button>} title="上传图片" contentClass="max-w-3xl">
        <CropperImage saveCropImgAction={handleUploadImage} />
      </ModalDialog>
      <ConfirmDelete
        onDeleteConfirm={async () => {
          await removeSinger(original.id);
        }}
        description="是否确认此歌手?"
      />
    </div>
  );
}

export default RowAction;
