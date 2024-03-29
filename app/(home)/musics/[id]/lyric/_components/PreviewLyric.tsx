'use client';

import ScrollLyric from '@/components/ScrollLyric';
import useAudioPlaying from '@/hooks/useAudioPlaying';
import useLyric from '@/hooks/useLyric';

const PreviewLyric = () => {
  const { lyricLines } = useLyric();
  const { currentTime, stopPlaying, playAt } = useAudioPlaying();

  if (lyricLines.length === 0) {
    return <div>暂无歌词</div>;
  }

  const handleSwitchLyric = (_: number, time: number) => {
    playAt(time);
  };

  return (
    <ScrollLyric
      lyrics={lyricLines}
      currentTime={currentTime}
      onStartScroll={stopPlaying}
      onSwitchLyric={handleSwitchLyric}
    />
  );
};

export default PreviewLyric;
