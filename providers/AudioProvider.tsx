'use client';

import { ReactNode, createContext, useCallback, useRef, useState } from 'react';
import { useBoolean } from 'usehooks-ts';
import { nanoid } from 'nanoid';

type LyricLine = {
  id: string;
  time: string;
  text: string;
};

type AudioContextType = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  playAt: (time: number) => void;
  startPlaying: () => void;
  stopPlaying: () => void;
  togglePlaying: () => void;
  lyricLines: LyricLine[];
  insertLyricLine: (line: Omit<LyricLine, 'id'>) => void;
  removeLyricLine: (id: string) => void;
};

export const AudioContext = createContext<AudioContextType | null>(null);

type Props = {
  children: ReactNode;
};

const AudioProvider = ({ children }: Props) => {
  const { value: isPlaying, setTrue: startPlaying, setFalse: stopPlaying, toggle: togglePlaying } = useBoolean(false);
  const [lyricLines, setLyricLines] = useState<LyricLine[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAt = useCallback(
    (time: number) => {
      setCurrentTime(time);
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
      if (!isPlaying) {
        startPlaying();
      }
    },
    [isPlaying, startPlaying]
  );

  const insertLyricLine = (line: Omit<LyricLine, 'id'>) => {
    setLyricLines((prev) =>
      [
        ...prev,
        {
          ...line,
          id: nanoid(),
        },
      ].toSorted((a, b) => a.time.localeCompare(b.time))
    );
  };

  const removeLyricLine = (id: string) => {
    setLyricLines((prev) => prev.filter((line) => line.id !== id));
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        isPlaying,
        currentTime,
        setCurrentTime,
        playAt,
        startPlaying,
        stopPlaying,
        togglePlaying,
        lyricLines,
        insertLyricLine,
        removeLyricLine,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
