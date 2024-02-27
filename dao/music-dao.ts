import { SqlPaginationAndOrder } from '@/lib/common';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';

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

export const getMusicByPage = async ({
  userId,
  name,
  albumId,
  singerId,
  skip,
  take,
  orderBy,
}: {
  userId: string;
  name?: string;
  albumId?: string;
  singerId?: string;
} & SqlPaginationAndOrder) => {
  const where: Prisma.MusicWhereInput = {
    userId,
  };

  if (name) {
    where.name = {
      contains: name,
    };
  }

  if (albumId) {
    where.albumId = albumId;
  }

  if (singerId) {
    where.singers = {
      some: {
        singerId,
      },
    };
  }

  const dataSql = prisma.music.findMany({
    include: {
      album: true,
      singers: {
        include: {
          singer: true,
        },
      },
      musicLists: {
        include: {
          musicList: true,
        },
      },
      lyric: true,
    },
    where,
    skip,
    take,
    orderBy,
  });

  const countSql = prisma.music.count({ where });

  return Promise.all([dataSql, countSql]);
};

export const updateIsDeletedById = async (id: string, isDeleted: boolean) => {
  return prisma.music.update({
    where: {
      id,
    },
    data: {
      isDeleted,
    },
  });
};

export const deleteMusicById = async (id: string) => {
  return prisma.music.delete({
    where: {
      id,
    },
  });
};

export const getMusicById = async (id: string) => {
  return prisma.music.findUnique({
    where: {
      id,
    },
    include: {
      singers: true,
    },
  });
};

export const updateMusicInfoById = async (
  id: string,
  param: {
    name: string;
    albumId: string;
    singerIds: string[];
  }
) => {
  const { singerIds, ...rest } = param;
  return prisma.music.update({
    where: {
      id,
    },
    data: {
      ...rest,
      singers: {
        deleteMany: {},
        createMany: {
          data: singerIds.map((id) => ({ singerId: id })),
        },
      },
    },
  });
};

export const updateMusicFileById = async (
  id: string,
  param: {
    filePath: string;
    fileHash: string;
    durationSeconds: number;
  }
) => {
  return prisma.music.update({
    where: {
      id,
    },
    data: param,
  });
};
