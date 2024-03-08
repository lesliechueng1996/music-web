'use client';

import { useContext } from 'react';
import { AudioContext } from '@/providers/AudioProvider';

const useAudioPlaying = () => {
  const audioContext = useContext(AudioContext);

  if (!audioContext) {
    throw new Error('useAudioPlaying must be used within an AudioProvider');
  }

  return audioContext;
};

export default useAudioPlaying;
