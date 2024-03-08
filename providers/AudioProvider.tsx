'use client';

import { ReactNode, createContext, useState } from 'react';
import { useBoolean } from 'usehooks-ts';
import { nanoid } from 'nanoid';

type LyricLine = {
  id: string;
  time: string;
  text: string;
};

type AudioContextType = {
  isPlaying: boolean;
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

  const insertLyricLine = (line: Omit<LyricLine, 'id'>) => {
    setLyricLines((prev) => [
      ...prev,
      {
        ...line,
        id: nanoid(),
      },
    ]);
  };

  const removeLyricLine = (id: string) => {
    setLyricLines((prev) => prev.filter((line) => line.id !== id));
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
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
