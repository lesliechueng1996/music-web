import prisma from '@/lib/db';

export const saveLyricContent = async (name: string, content: string, hashCode: string, musicId: string) => {
  return prisma.lyric.create({
    data: {
      name,
      isFile: false,
      content,
      hashCode,
      musicId,
    },
  });
};

export const doesMusicHaveLyric = async (id: string) => {
  const count = await prisma.lyric.count({
    where: {
      musicId: id,
    },
  });
  return count > 0;
};

export const updateLyricContent = async (name: string, content: string, hashCode: string, musicId: string) => {
  return prisma.lyric.update({
    data: {
      name,
      isFile: false,
      content,
      hashCode,
    },
    where: {
      musicId,
    },
  });
};
