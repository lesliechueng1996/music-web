import { PAGE_SIZE_OPTIONS } from './common';

export function generatePageAndOrderQuery(
  pageIndex: number,
  pageSize: number,
  sortField: string | null,
  isDesc: boolean | null
): {
  take: number;
  skip: number;
  orderBy?: {
    [key: string]: 'asc' | 'desc';
  };
} {
  const paginationQuery = {
    take: pageSize,
    skip: pageIndex * pageSize,
  };

  if (sortField) {
    return {
      ...paginationQuery,
      orderBy: {
        [sortField]: isDesc ? 'desc' : 'asc',
      },
    };
  }

  return paginationQuery;
}

export function isPageValidated(pageIndex: unknown, pageSize: unknown) {
  if (typeof pageIndex !== 'number' || typeof pageSize !== 'number') {
    return false;
  }

  return pageIndex >= 0 && PAGE_SIZE_OPTIONS.includes(pageSize);
}
