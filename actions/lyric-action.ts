'use server';

import { doesMusicHaveLyric, saveLyricContent, updateLyricContent } from '@/dao/lyric-dao';
import { calculateHash } from '@/lib/lyric';

export const saveTextLyric = async (musicId: string, name: string, lyric: string) => {
  const hash = calculateHash(lyric);
  const hasLyric = await doesMusicHaveLyric(musicId);
  if (hasLyric) {
    await updateLyricContent(name, lyric, hash, musicId);
  } else {
    await saveLyricContent(name, lyric, hash, musicId);
  }
};
