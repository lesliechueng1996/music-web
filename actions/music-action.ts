'use server';

import {
  deleteMusicById,
  getMusicById,
  saveMusic,
  updateIsDeletedById,
  updateMusicFileById,
  updateMusicInfoById,
} from '@/dao/music-dao';
import { createUploadToken } from '@/lib/qiniu-server';
import { revalidatePath } from 'next/cache';

const bucket = process.env.QINIU_MUSIC_BUCKET ?? '';

export const getUploadMusicToken = async (fileName: string | null) => {
  return createUploadToken(bucket, fileName ?? undefined, 600);
};

export const createMusic = async (param: Parameters<typeof saveMusic>[0]) => {
  await saveMusic(param);
  revalidatePath(`/users/${param.userId}/music`);
};

export const softDeleteMusic = async (id: string) => {
  const music = await updateIsDeletedById(id, true);
  revalidatePath(`/users/${music.userId}/music`);
};

export const undoSoftDeleteMusic = async (id: string) => {
  const music = await updateIsDeletedById(id, false);
  revalidatePath(`/users/${music.userId}/music`);
};

export const removeMusic = async (id: string) => {
  const music = await deleteMusicById(id);
  revalidatePath(`/users/${music.userId}/music`);
};

export const getMusicInfo = async (id: string) => {
  const music = await getMusicById(id);
  if (!music) {
    return null;
  }
  return {
    name: music.name,
    filePath: music.filePath,
    albumId: music.albumId,
    singerIds: music.singers.map((s) => s.singerId),
  };
};

export const updateMusicInfo = async (
  id: string,
  param: {
    name: string;
    albumId: string;
    singerIds: string[];
  }
) => {
  const music = await updateMusicInfoById(id, param);
  revalidatePath(`/users/${music.userId}/music`);
};

export const updateMusicFile = async (
  id: string,
  param: {
    filePath: string;
    fileHash: string;
    durationSeconds: number;
  }
) => {
  const music = await updateMusicFileById(id, param);
  revalidatePath(`/users/${music.userId}/music`);
};
