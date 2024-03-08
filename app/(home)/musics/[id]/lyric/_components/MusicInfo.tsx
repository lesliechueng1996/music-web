'use client';

import DiscPlaying from '@/components/DiscPlaying';
import useAudioPlayingStatus from '@/hooks/useAudioPlayingStatus';

type Props = {
  name: string;
  singerNames: string[];
  albumName: string;
  albumImgUrl: string | null;
};

const MusicInfo = ({ name, singerNames, albumName, albumImgUrl }: Props) => {
  const isPlaying = useAudioPlayingStatus();

  return (
    <div className="flex flex-col items-center max-w-xl space-y-3">
      <DiscPlaying isPlaying={isPlaying} imageUrl={albumImgUrl} />
      <p>歌曲名: {name}</p>
      <p>歌手: {singerNames.join(' ')}</p>
      <p>专辑: {albumName}</p>
    </div>
  );
};

export default MusicInfo;
