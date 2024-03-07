'use client';

import { PlayCircle, PauseCircle } from 'lucide-react';

type Props = {
  isPlaying: boolean;
  onClick: () => void;
  size?: number;
};

const PlayAndPauseBtn = ({ isPlaying, onClick, size = 36 }: Props) => {
  return <button onClick={onClick}>{isPlaying ? <PauseCircle size={size} /> : <PlayCircle size={size} />}</button>;
};

export default PlayAndPauseBtn;
