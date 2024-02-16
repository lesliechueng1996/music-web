export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

export type PaginationAndOrder = {
  pageIndex: number;
  pageSize: number;
  sortField: string | null;
  isDesc: boolean | null;
};

export type SqlPaginationAndOrder = {
  skip: number;
  take: number;
  orderBy:
    | {
        [key: string]: 'asc' | 'desc';
      }
    | undefined;
};
