'use client';

import { Slider } from '@/components/ui/slider';
import { secondsToMinutes } from '@/lib/duration';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

type Props = {
  durationSeconds: number;
  isPlaying: boolean;
  className?: string;
  onMove: (value: number) => void;
  onCommit: (value: number) => void;
};

const MusicProcess = ({ durationSeconds, isPlaying, className, onMove, onCommit }: Props) => {
  const [currentTime, setCurrentTime] = useState(0);

  useInterval(
    () => {
      if (currentTime < durationSeconds) {
        setCurrentTime(currentTime + 1);
      }
    },
    isPlaying ? 1000 : null
  );

  const handleMoveProcess = (values: number[]) => {
    setCurrentTime(values[0]);
    onMove(values[0]);
  };

  const handleCommitProcess = (values: number[]) => {
    setCurrentTime(values[0]);
    onCommit(values[0]);
  };

  return (
    <div className={cn('relative', className)}>
      <Slider
        value={[currentTime]}
        max={durationSeconds}
        step={1}
        onValueChange={handleMoveProcess}
        onValueCommit={handleCommitProcess}
      />
      <div className="absolute top-4 text-muted-foreground w-full flex justify-between">
        <span>{secondsToMinutes(currentTime)}</span>
        <span>{secondsToMinutes(durationSeconds)}</span>
      </div>
    </div>
  );
};

export default MusicProcess;
