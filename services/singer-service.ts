import { getSingerByPage } from '@/dao/singer-dao';
import { PaginationAndOrder } from '@/lib/common';
import { generatePageAndOrderQuery, isPageValidated } from '@/lib/query-builder';
import toDateString from '@/lib/toDateString';

export const searchSingerPage = async ({
  name,
  pageIndex,
  pageSize,
  sortField,
  isDesc,
}: {
  name: string;
} & PaginationAndOrder) => {
  if (!isPageValidated(pageIndex, pageSize)) {
    return {
      data: [],
      total: 0,
    };
  }

  const { skip, take, orderBy } = generatePageAndOrderQuery(pageIndex, pageSize, sortField, isDesc);

  const [data, total] = await getSingerByPage({
    name,
    skip,
    take,
    orderBy,
  });

  return {
    total,
    data: data.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image || null,
      description: item.description ?? '',
      musicCount: item._count.musics,
      createdAt: toDateString(item.createdAt),
      updatedAt: item.updatedAt.getTime(),
    })),
  };
};
