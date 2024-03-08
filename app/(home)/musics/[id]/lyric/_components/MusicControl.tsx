'use client';

import ModalDialog from '@/components/ModalDialog';
import MusicProcess from '@/components/MusicProcess';
import PlayAndPauseBtn from '@/components/PlayAndPauseBtn';
import VoiceControl from '@/components/VolumeControl';
import { Button } from '@/components/ui/button';
import useAudio from '@/hooks/useAudio';
import { BetweenHorizonalStart, ChevronsLeft, ChevronsRight } from 'lucide-react';
import InsertLyricForm from './InsertLyricForm';

type Props = {
  url: string;
};

const initVolume = 0.5;

const MusicControl = ({ url }: Props) => {
  const {
    isLoading,
    isPlaying,
    startPlaying,
    stopPlaying,
    togglePlaying,
    currentTime,
    duration,
    handleProcessMove,
    handleProcessCommit,
    handleVolumeChange,
    fastForward,
    fastBackward,
    getCurrentTime,
  } = useAudio(url, initVolume);

  return (
    <div className="flex items-center w-full">
      <Button variant="ghost" disabled={isLoading} onClick={() => fastBackward(5)}>
        <ChevronsLeft size={32} />
      </Button>
      <PlayAndPauseBtn onClick={togglePlaying} isPlaying={isPlaying} disabled={isLoading} />
      <Button variant="ghost" disabled={isLoading} onClick={() => fastForward(5)}>
        <ChevronsRight size={32} />
      </Button>
      <MusicProcess
        className="grow"
        currentTime={currentTime}
        durationSeconds={duration}
        disabled={isLoading}
        onMove={handleProcessMove}
        onCommit={handleProcessCommit}
      />
      <VoiceControl defaultVolume={initVolume * 100} onVolumeChange={handleVolumeChange} disabled={isLoading} />
      <ModalDialog
        title="插入歌词"
        trigger={
          <Button variant="ghost" disabled={isLoading} onClick={() => stopPlaying()}>
            <BetweenHorizonalStart size={32} />
          </Button>
        }
      >
        <InsertLyricForm getCurrentTime={getCurrentTime} onFinished={startPlaying} />
      </ModalDialog>
    </div>
  );
};

export default MusicControl;
