'use client';

import useAudioPlaying from './useAudioPlaying';

const useAudioPlayingStatus = () => {
  const { isPlaying } = useAudioPlaying();

  return isPlaying;
};

export default useAudioPlayingStatus;
