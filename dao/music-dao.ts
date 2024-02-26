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
  const { singerIds, ...rest } = param;
  return prisma.music.create({
    data: {
      ...rest,
      singers: {
        createMany: {
          data: singerIds.map((id) => ({ singerId: id })),
        },
      },
    },
  });
};
