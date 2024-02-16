import { getManagerById } from '@/dao/manager-dao';
import { auth } from '@/lib/auth';

export const getSelf = async () => {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  const managerId = session.user.id;
  const manager = await getManagerById(managerId);
  if (!manager) {
    throw new Error('Manager not found');
  }
  return manager;
};

export const getCurrentManagerAvatar = async () => {
  try {
    const manager = await getSelf();
    return {
      image: manager.avatar,
      fallback: manager.username[0].toUpperCase(),
    };
  } catch (e) {
    return null;
  }
};
