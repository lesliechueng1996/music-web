'use server';

import {
  deleteSingerById,
  getAllSingers,
  getSingerById,
  saveSinger,
  updateSingerImageById,
  updateSingerInfoById,
} from '@/dao/singer-dao';
import { createUploadToken, deleteFile } from '@/lib/qiniu-server';
import { revalidatePath } from 'next/cache';

const bucket = process.env.QINIU_PIC_BUCKET ?? '';

export const createSinger = async (param: Parameters<typeof saveSinger>[0]) => {
  const singer = await saveSinger(param);
  revalidatePath('/singer');
  return singer.id;
};

export const removeSinger = async (id: string) => {
  const singer = await deleteSingerById(id);
  if (singer.image) {
    await deleteFile(bucket, singer.image);
  }
};

export const getSingerInfo = async (id: string) => {
  const singer = await getSingerById(id);
  if (!singer) {
    return null;
  }
  return {
    id: singer.id,
    name: singer.name,
    description: singer.description ?? '',
  };
};

export const updateSingerInfo = async (...params: Parameters<typeof updateSingerInfoById>) => {
  await updateSingerInfoById(...params);
  revalidatePath('/singer');
};

export const getUploadSingerImgToken = async (fileName: string | null) => {
  return createUploadToken(bucket, fileName ?? undefined, 600);
};

export const updateSingerImage = async (id: string, image: string) => {
  await updateSingerImageById(id, image);
  revalidatePath('/singer');
};

export const getSingerOptions = async () => {
  const singers = await getAllSingers();
  return singers.map((singer) => ({
    label: singer.name,
    value: singer.id,
  }));
};
