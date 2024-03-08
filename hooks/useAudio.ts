'use client';

import { useEffect, useRef, useState } from 'react';
import { useBoolean, useInterval } from 'usehooks-ts';
import useAudioPlaying from './useAudioPlaying';

const useAudio = (url: string, initVolumePercent: number) => {
  const { value: isLoading, setFalse: loadFinished } = useBoolean(true);
  // const { value: isPlaying, setTrue: startPlaying, setFalse: stopPlaying, toggle: togglePlaying } = useBoolean(false);
  const { isPlaying, startPlaying, stopPlaying, togglePlaying } = useAudioPlaying();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const syncCurrentTime = () => {
    setCurrentTime(Math.round(audioRef.current?.currentTime || 0));
  };

  useInterval(
    () => {
      if (currentTime <= duration) {
        syncCurrentTime();
      }
    },
    isPlaying ? 1000 : null
  );

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.volume = initVolumePercent;
    }

    const handleCanPlayThrough = () => {
      loadFinished();
    };
    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);

    const handleEnded = () => {
      setCurrentTime(Math.round(audioRef.current?.duration || 0));
      stopPlaying();
    };
    audioRef.current.addEventListener('ended', handleEnded);

    const handleLoadedMetadata = () => {
      setDuration(Math.round(audioRef.current?.duration || 0));
    };
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioRef.current?.removeEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current?.removeEventListener('ended', handleEnded);
      audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current?.pause();
      audioRef.current?.remove();
    };
  }, [url, initVolumePercent, loadFinished, stopPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const handleProcessMove = (time: number) => {
    if (isPlaying) {
      stopPlaying();
    }
    setCurrentTime(time);
  };

  const handleProcessCommit = (time: number) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    if (!isPlaying) {
      startPlaying();
    }
  };

  const handleVolumeChange = (volumePercent: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volumePercent;
    }
  };

  const fastForward = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
      syncCurrentTime();
    }
  };

  const fastBackward = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime -= seconds;
      syncCurrentTime();
    }
  };

  const getCurrentTime = () => audioRef.current?.currentTime || 0;

  return {
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
  };
};

export default useAudio;
