import { getMusicById, getMusicByPage } from '@/dao/music-dao';
import { PaginationAndOrder } from '@/lib/common';
import { generatePageAndOrderQuery, isPageValidated } from '@/lib/query-builder';
import toDateString from '@/lib/toDateString';

export const searchMusicPage = async ({
  userId,
  name,
  albumId,
  singerId,
  pageIndex,
  pageSize,
  sortField,
  isDesc,
}: {
  userId: string;
  name?: string;
  albumId?: string;
  singerId?: string;
} & PaginationAndOrder) => {
  if (!isPageValidated(pageIndex, pageSize)) {
    return {
      data: [],
      total: 0,
    };
  }
  const { skip, take, orderBy } = generatePageAndOrderQuery(pageIndex, pageSize, sortField, isDesc);

  const [data, total] = await getMusicByPage({
    userId,
    name,
    albumId,
    singerId,
    skip,
    take,
    orderBy,
  });

  return {
    total,
    data: data.map((item) => ({
      id: item.id,
      name: item.name,
      filePath: item.filePath,
      fileHash: item.fileHash,
      durationSeconds: item.durationSeconds,
      album: {
        id: item.album.id,
        name: item.album.name,
      },
      isFavorite: item.isFavorite,
      createdAt: toDateString(item.createdAt),
      isDeleted: item.isDeleted,
      hasLyric: item.lyric !== null,
      singers: item.singers.map((singer) => ({
        id: singer.singer.id,
        name: singer.singer.name,
      })),
      musicLists: item.musicLists.map((musicList) => ({
        id: musicList.musicList.id,
        name: musicList.musicList.name,
      })),
    })),
  };
};

export const getMusicAndRelationById = async (id: string) => {
  const music = await getMusicById(id);
  return music;
};
