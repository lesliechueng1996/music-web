import { useEffect, useState, useTransition } from 'react';
import MusicFileForm, { MusicFileProps } from './MusicFileForm';
import { getMusicInfo, updateMusicFile } from '@/actions/music-action';
import { toast } from 'sonner';
import { useModalDialog } from '@/components/ModalDialog';

type Props = {
  id: string;
};

type Music = {
  filePath: string;
  name: string;
};

const UploadMusic = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { closeDialog } = useModalDialog();
  const [musicInfo, setMusicInfo] = useState<Music | null>(null);

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

  const handleUploadMusic = (uploadMusicFn: () => Promise<MusicFileProps>) => {
    if (!musicInfo) {
      return;
    }
    startTransition(async () => {
      try {
        const { key, hash, duration } = await uploadMusicFn();
        await updateMusicFile(id, { filePath: key, fileHash: hash, durationSeconds: duration });
        closeDialog();
        toast.success('上传成功');
      } catch (e) {
        toast.error('上传失败');
      }
    });
  };

  return musicInfo ? (
    <MusicFileForm
      name={musicInfo.name}
      fileKey={musicInfo.filePath}
      isLoading={isPending}
      onUploadFinish={handleUploadMusic}
    />
  ) : null;
};

export default UploadMusic;
