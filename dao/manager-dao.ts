import prisma from '@/lib/db';

export async function getManagerByUsername(username: string) {
  return prisma.manager.findUnique({
    where: {
      username,
    },
  });
}
