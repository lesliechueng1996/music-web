'use server';

import { deleteUserById, saveUser } from '@/dao/user-dao';
import { revalidatePath } from 'next/cache';

export const createUser = async (param: Parameters<typeof saveUser>[0]) => {
  await saveUser(param);
  revalidatePath('/user');
};

export const removeUser = async (id: string) => {
  await deleteUserById(id);
};
