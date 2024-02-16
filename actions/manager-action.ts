'use server';

import { createManager } from '@/dao/manager-dao';
import { hash } from 'bcrypt';

export const registerManager = async (param: Parameters<typeof createManager>[0]) => {
  const hashPassword = await hash(param.password, 10);
  return createManager({
    ...param,
    password: hashPassword,
  });
};
