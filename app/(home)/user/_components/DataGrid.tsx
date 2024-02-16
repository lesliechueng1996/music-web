import type { ColumnDef } from '@tanstack/react-table';
import { User } from './data-type';
import SortableHeader from '@/components/SortableHeader';
import RowAction from './RowAction';
import DataTable, { PaginationAndOrderUrl } from '@/components/DataTable';
import { searchUserPage } from '@/services/user-service';
import { DEFAULT_PAGE_SIZE } from '@/lib/common';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'username',
    header: '用户名',
  },
  {
    accessorKey: 'imei',
    header: 'IMEI',
  },
  {
    accessorKey: 'avatar',
    header: '头像路径',
  },
  {
    accessorKey: 'musicCount',
    header: '歌曲数量',
  },
  {
    accessorKey: 'musicListCount',
    header: '歌单数量',
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
  username?: string;
  imei?: string;
} & PaginationAndOrderUrl;

const DataGrid = async ({ username = '', imei = '', pageIndex, pageSize, sortField, isDesc }: Props) => {
  const { data, total } = await searchUserPage({
    username,
    imei,
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
