import { createHash } from 'crypto';

export const joinLyricLines = (lyricLines: { time: string; text: string }[]) => {
  return lyricLines.map((line) => `[${line.time}]${line.text}`).join('\n');
};

export const calculateHash = (input: string): string => {
  const hash = createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
};

export const parseLyric = (lyric: string) => {
  const lines = lyric.split('\n');
  const lyricLines = lines.map((line) => {
    const firstBracketIndex = line.indexOf(']');
    const time = line.slice(1, firstBracketIndex);
    const text = line.slice(firstBracketIndex + 1);
    return { time, text };
  });
  return lyricLines;
};
