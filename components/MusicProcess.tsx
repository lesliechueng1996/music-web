'use client';

import { Slider } from '@/components/ui/slider';
import { secondsToMinutes } from '@/lib/duration';
import { cn } from '@/lib/utils';

type Props = {
  currentTime: number;
  durationSeconds: number;
  className?: string;
  onMove: (value: number) => void;
  onCommit: (value: number) => void;
  disabled?: boolean;
};

const MusicProcess = ({ currentTime, durationSeconds, className, onMove, onCommit, disabled = false }: Props) => {
  const handleMoveProcess = (values: number[]) => {
    onMove(values[0]);
  };

  const handleCommitProcess = (values: number[]) => {
    onCommit(values[0]);
  };

  return (
    <div className={cn('relative', className)}>
      <Slider
        disabled={disabled}
        value={[currentTime]}
        max={durationSeconds}
        onValueChange={handleMoveProcess}
        onValueCommit={handleCommitProcess}
        step={1}
      />
      <div className="absolute top-4 text-muted-foreground w-full flex justify-between">
        <span>{secondsToMinutes(currentTime)}</span>
        <span>{secondsToMinutes(durationSeconds)}</span>
      </div>
    </div>
  );
};

export default MusicProcess;
