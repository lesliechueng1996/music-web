'use server';

import { saveMusic } from '@/dao/music-dao';
import { createUploadToken } from '@/lib/qiniu-server';
import { revalidatePath } from 'next/cache';

const bucket = process.env.QINIU_MIUSIC_BUCKET ?? '';

export const getUploadMusicToken = async (fileName: string | null) => {
  return createUploadToken(bucket, fileName ?? undefined, 600);
};

export const createMusic = async (param: Parameters<typeof saveMusic>[0]) => {
  await saveMusic(param);
  revalidatePath(`/users/${param.userId}/music`);
};
