'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useBoolean } from 'usehooks-ts';
import LoadingButton from './LoadingButton';
import { toast } from 'sonner';

type Props = {
  onDeleteConfirm: () => Promise<void>;
  description?: string;
};

function ConfirmDelete({ onDeleteConfirm, description }: Props) {
  const { value, setFalse, setValue } = useBoolean(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleComfirm = () => {
    startTransition(async () => {
      try {
        await onDeleteConfirm();
        setFalse();
        router.refresh();
      } catch (e) {
        toast.error('删除失败');
      }
    });
  };

  return (
    <div>
      <Dialog open={value} onOpenChange={setValue}>
        <DialogTrigger asChild>
          <Button variant="destructive">删除</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>确认</DialogTitle>
          </DialogHeader>
          <p>{description ?? '是否确认删除此记录?'}</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                取消
              </Button>
            </DialogClose>
            <LoadingButton
              type="button"
              variant="destructive"
              onClick={handleComfirm}
              text="删除"
              isLoading={isPending}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConfirmDelete;
