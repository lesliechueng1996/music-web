'use client';

import { CellContext } from '@tanstack/react-table';
import { Music } from './data-type';
import { Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfirmDelete from '@/components/ConfirmDelete';
import { removeMusic, softDeleteMusic, undoSoftDeleteMusic } from '@/actions/music-action';
import ModalDialog from '@/components/ModalDialog';
import EditMusic from './EditMusic';
import LoadingButton from '@/components/LoadingButton';
import { useTransition } from 'react';
import { toast } from 'sonner';
import UploadMusic from './UploadMusic';
import Link from 'next/link';

const RowAction = <TValue,>(data: CellContext<Music, TValue>) => {
  const [isPending, startTransition] = useTransition();

  const {
    row: { original },
  } = data;

  const handleUndoSoftDelete = () => {
    startTransition(async () => {
      try {
        await undoSoftDeleteMusic(original.id);
      } catch (e) {
        toast.error('操作失败');
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      {original.isDeleted && <LoadingButton Icon={Undo2} isLoading={isPending} onClick={handleUndoSoftDelete} />}
      <ModalDialog trigger={<Button variant="secondary">编辑</Button>} title="编辑歌曲">
        <EditMusic id={original.id} />
      </ModalDialog>
      <ModalDialog trigger={<Button variant="outline">上传歌曲</Button>} title="上传歌曲">
        <UploadMusic id={original.id} />
      </ModalDialog>
      <Link href={`/musics/${original.id}/lyric`}>
        <Button>编辑歌词</Button>
      </Link>
      <ConfirmDelete
        canSoftDelete={!original.isDeleted}
        onSoftDeleteConfirm={async () => {
          await softDeleteMusic(original.id);
        }}
        onDeleteConfirm={async () => {
          await removeMusic(original.id);
        }}
        description="是否确认删除此歌曲?"
      />
    </div>
  );
};

export default RowAction;
