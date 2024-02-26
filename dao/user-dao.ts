import prisma from '@/lib/db';
import { SqlPaginationAndOrder } from '@/lib/common';
import { Prisma } from '@prisma/client';

export const saveUser = async ({ username, imei }: { username: string; imei: string }) => {
  return prisma.user.create({
    data: {
      username,
      imei,
    },
  });
};

export const getUserByPage = async ({
  username,
  imei,
  skip,
  take,
  orderBy,
}: {
  username: string;
  imei: string;
} & SqlPaginationAndOrder) => {
  const where: Prisma.UserWhereInput = {};

  if (username) {
    where.username = {
      contains: username,
    };
  }

  if (imei) {
    where.imei = {
      contains: imei,
    };
  }

  const dataSql = prisma.user.findMany({
    include: {
      _count: {
        select: {
          musics: true,
          musicLists: true,
        },
      },
    },
    where,
    skip,
    take,
    orderBy,
  });

  const countSql = prisma.user.count({ where });

  return Promise.all([dataSql, countSql]);
};

export const deleteUserById = async (id: string) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

export const getAllUsers = async () => prisma.user.findMany();
