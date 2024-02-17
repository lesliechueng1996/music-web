import type { ColumnDef } from '@tanstack/react-table';
import { Album } from './data-type';
import SortableHeader from '@/components/SortableHeader';
import RowAction from './RowAction';
import DataTable, { PaginationAndOrderUrl } from '@/components/DataTable';
import { searchAlbumPage } from '@/services/album-service';
import { DEFAULT_PAGE_SIZE } from '@/lib/common';
import ImageCell from './ImageCell';

const columns: ColumnDef<Album>[] = [
  {
    accessorKey: 'name',
    header: '专辑名',
  },
  {
    accessorKey: 'image',
    header: '封面',
    cell: ImageCell,
  },
  {
    accessorKey: 'description',
    header: '描述',
  },
  {
    accessorKey: 'musicCount',
    header: '歌曲数量',
  },
  {
    accessorKey: 'createdAt',
    meta: {
      label: '创建时间',
    },
    header: SortableHeader,
  },
  {
    id: 'actions',
    header: '操作',
    cell: RowAction,
  },
];

type Props = {
  name?: string;
} & PaginationAndOrderUrl;

const DataGrid = async ({ name = '', pageIndex, pageSize, sortField, isDesc }: Props) => {
  const { data, total } = await searchAlbumPage({
    name,
    pageIndex: Number(pageIndex) || 0,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
    sortField: sortField ?? null,
    isDesc: sortField ? isDesc === 'true' : null,
  });

  return (
    <div className="panel">
      <DataTable data={data} columns={columns} total={total} />
    </div>
  );
};

export default DataGrid;
