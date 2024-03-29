'use server';

import { doesMusicHaveLyric, saveLyricContent } from '@/dao/lyric-dao';
import { calculateHash } from '@/lib/lyric';

export const saveTextLyric = async (musicId: string, name: string, lyric: string) => {
  const hash = calculateHash(lyric);
  const hasLyric = await doesMusicHaveLyric(musicId);
  if (hasLyric) {
  } else {
    await saveLyricContent(name, lyric, hash, musicId);
  }
};
