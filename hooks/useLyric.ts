'use client';

import { AudioContext } from '@/providers/AudioProvider';
import { useContext } from 'react';

const useLyric = () => {
  const audioContext = useContext(AudioContext);

  if (!audioContext) {
    throw new Error('useLyric must be used within an AudioProvider');
  }

  const { lyricLines, insertLyricLine, removeLyricLine, putLyricLines } = audioContext;

  return { lyricLines, insertLyricLine, removeLyricLine, putLyricLines };
};

export default useLyric;
