import { SqlPaginationAndOrder } from '@/lib/common';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';

export const saveSinger = async ({ name, description }: { name: string; description: string }) => {
  return prisma.singer.create({
    data: {
      name,
      description,
    },
  });
};

export const deleteSingerById = async (id: string) => {
  return prisma.singer.delete({
    where: {
      id,
    },
  });
};

export const getSingerByPage = async ({
  name,
  skip,
  take,
  orderBy,
}: {
  name: string;
} & SqlPaginationAndOrder) => {
  const where: Prisma.SingerWhereInput = {};

  if (name) {
    where.name = {
      contains: name,
    };
  }

  const dataSql = prisma.singer.findMany({
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

  const countSql = prisma.singer.count({ where });

  return Promise.all([dataSql, countSql]);
};

export const getSingerById = async (id: string) => {
  return prisma.singer.findUnique({
    where: {
      id,
    },
  });
};

export const updateSingerInfoById = async (
  id: string,
  { name, description }: { name: string; description: string }
) => {
  return prisma.singer.update({
    where: {
      id,
    },
    data: {
      name,
      description,
    },
  });
};

export const updateSingerImageById = async (id: string, image: string) => {
  return prisma.singer.update({
    where: {
      id,
    },
    data: {
      image,
    },
  });
};
