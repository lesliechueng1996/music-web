'use server';

import { saveManager } from '@/dao/manager-dao';
import { hash } from 'bcrypt';

export const registerManager = async (param: Parameters<typeof saveManager>[0]) => {
  const hashPassword = await hash(param.password, 10);
  return saveManager({
    ...param,
    password: hashPassword,
  });
};
