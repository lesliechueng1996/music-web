import { createHash } from 'crypto';

export const joinLyricLines = (lyricLines: { time: string; text: string }[]) => {
  return lyricLines.map((line) => `[${line.time}]${line.text}`).join('\n');
};

export const calculateHash = (input: string): string => {
  const hash = createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
};
