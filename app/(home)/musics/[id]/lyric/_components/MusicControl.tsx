'use client';

import MusicProcess from '@/components/MusicProcess';
import PlayAndPauseBtn from '@/components/PlayAndPauseBtn';
import VoiceControl from '@/components/VolumeControl';
import { BetweenHorizonalStart } from 'lucide-react';
import { useBoolean } from 'usehooks-ts';

const MusicControl = () => {
  const { value: isPlaying, setTrue: startPlaying, setFalse: stopPlaying, toggle: togglePlaying } = useBoolean(false);

  return (
    <div className="flex items-center gap-5 w-full">
      <PlayAndPauseBtn onClick={togglePlaying} isPlaying={isPlaying} />
      <MusicProcess
        className="grow"
        durationSeconds={200}
        isPlaying={isPlaying}
        onMove={() => {
          if (isPlaying) {
            stopPlaying();
          }
        }}
        onCommit={() => {
          if (!isPlaying) {
            startPlaying();
          }
        }}
      />
      <VoiceControl onVolumeChange={() => {}} />
      <button>
        <BetweenHorizonalStart size={32} />
      </button>
    </div>
  );
};

export default MusicControl;
