'use server';

import { deleteAlbumById, getAlbumById, saveAlbum, updateAlbumImageById, updateAlbumInfoById } from '@/dao/album-dao';
import { createUploadToken, deleteFile } from '@/lib/qiniu-server';
import { revalidatePath } from 'next/cache';

const bucket = process.env.QINIU_PIC_BUCKET ?? '';

export const createAlbum = async (param: Parameters<typeof saveAlbum>[0]) => {
  const album = await saveAlbum(param);
  revalidatePath('/album');
  return album.id;
};

export const removeAlbum = async (id: string) => {
  const album = await deleteAlbumById(id);
  if (album.image) {
    await deleteFile(bucket, album.image);
  }
};

export const getAlbumInfo = async (id: string) => {
  const album = await getAlbumById(id);
  if (!album) {
    return null;
  }
  return {
    id: album.id,
    name: album.name,
    description: album.description ?? '',
  };
};

export const updateAlbumInfo = async (...params: Parameters<typeof updateAlbumInfoById>) => {
  await updateAlbumInfoById(...params);
  revalidatePath('/album');
};

export const getUploadAlbumImgToken = async (fileName: string | null) => {
  return createUploadToken(bucket, fileName ?? undefined, 600);
};

export const updateAlbumImage = async (id: string, image: string) => {
  await updateAlbumImageById(id, image);
  revalidatePath('/album');
};
