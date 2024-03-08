'use client';

import { PlayCircle, PauseCircle } from 'lucide-react';
import { Button } from './ui/button';

type Props = {
  isPlaying: boolean;
  onClick: () => void;
  size?: number;
  disabled?: boolean;
};

const PlayAndPauseBtn = ({ isPlaying, onClick, size = 36, disabled = false }: Props) => {
  return (
    <Button onClick={onClick} disabled={disabled} variant="ghost">
      {isPlaying ? <PauseCircle size={size} /> : <PlayCircle size={size} />}
    </Button>
  );
};

export default PlayAndPauseBtn;
