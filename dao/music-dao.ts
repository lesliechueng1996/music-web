import prisma from '@/lib/db';

export const saveMusic = async (param: {
  name: string;
  filePath: string;
  fileHash: string;
  durationSeconds: number;
  albumId: string;
  userId: string;
  singerIds: string[];
}) => {
  return prisma.music.create({
    data: {
      ...param,
      singers: {
        createMany: {
          data: param.singerIds.map((id) => ({ singerId: id })),
        },
      },
    },
  });
};
