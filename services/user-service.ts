import { getAllUsers, getUserByPage } from '@/dao/user-dao';
import { PaginationAndOrder } from '@/lib/common';
import { generatePageAndOrderQuery, isPageValidated } from '@/lib/query-builder';
import toDateString from '@/lib/toDateString';

export const searchUserPage = async ({
  username,
  imei,
  pageIndex,
  pageSize,
  sortField,
  isDesc,
}: {
  username: string;
  imei: string;
} & PaginationAndOrder) => {
  if (!isPageValidated(pageIndex, pageSize)) {
    return {
      data: [],
      total: 0,
    };
  }

  const { skip, take, orderBy } = generatePageAndOrderQuery(pageIndex, pageSize, sortField, isDesc);

  const [data, total] = await getUserByPage({
    username,
    imei,
    skip,
    take,
    orderBy,
  });

  return {
    total,
    data: data.map((item) => ({
      id: item.id,
      username: item.username,
      imei: item.imei,
      avatar: item.avatar ?? '',
      musicCount: item._count.musics,
      musicListCount: item._count.musicLists,
      createdAt: toDateString(item.createdAt),
    })),
  };
};

export const getUserOptions = async () => {
  const allUsers = await getAllUsers();
  return allUsers.map((user) => ({
    id: user.id,
    username: user.username,
  }));
};
