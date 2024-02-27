import { SqlPaginationAndOrder } from '@/lib/common';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';

export const saveAlbum = async ({ name, description }: { name: string; description: string }) => {
  return prisma.album.create({
    data: {
      name,
      description,
    },
  });
};

export const deleteAlbumById = async (id: string) => {
  return prisma.album.delete({
    where: {
      id,
    },
  });
};

export const getAlbumByPage = async ({
  name,
  skip,
  take,
  orderBy,
}: {
  name: string;
} & SqlPaginationAndOrder) => {
  const where: Prisma.AlbumWhereInput = {};

  if (name) {
    where.name = {
      contains: name,
    };
  }

  const dataSql = prisma.album.findMany({
    include: {
      _count: {
        select: {
          musics: true,
        },
      },
    },
    where,
    skip,
    take,
    orderBy,
  });

  const countSql = prisma.album.count({ where });

  return Promise.all([dataSql, countSql]);
};

export const getAlbumById = async (id: string) => {
  return prisma.album.findUnique({
    where: {
      id,
    },
  });
};

export const updateAlbumInfoById = async (id: string, { name, description }: { name: string; description: string }) => {
  return prisma.album.update({
    where: {
      id,
    },
    data: {
      name,
      description,
    },
  });
};

export const updateAlbumImageById = async (id: string, image: string) => {
  return prisma.album.update({
    where: {
      id,
    },
    data: {
      image,
    },
  });
};

export const getAllAlbums = async () => {
  return prisma.album.findMany();
};

export const getAllAlbumByUserId = async (userId: string) => {
  return prisma.album.findMany({
    distinct: ['id'],
    where: {
      musics: {
        some: {
          userId,
        },
      },
    },
  });
};
