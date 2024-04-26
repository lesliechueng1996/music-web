'use client';

import { AudioContext } from '@/providers/AudioProvider';
import { useContext } from 'react';

const useLyric = () => {
  const audioContext = useContext(AudioContext);

  if (!audioContext) {
    throw new Error('useLyric must be used within an AudioProvider');
  }

  const { lyricLines, insertLyricLine, removeLyricLine, putLyricLines, loadLyric, getLyricString } = audioContext;

  return { lyricLines, insertLyricLine, removeLyricLine, putLyricLines, loadLyric, getLyricString };
};

export default useLyric;
