import prisma from '@/lib/db';

export const getManagerByUsername = async (username: string) => {
  return prisma.manager.findUnique({
    where: {
      username,
    },
  });
};

export const getManagerById = async (id: string) => {
  return prisma.manager.findUnique({
    where: {
      id,
    },
  });
};

export const saveManager = async ({
  username,
  password,
  email,
  avatar,
}: {
  username: string;
  password: string;
  email: string;
  avatar?: string;
}) => {
  return prisma.manager.create({
    data: {
      username,
      password,
      email,
      avatar,
    },
  });
};
