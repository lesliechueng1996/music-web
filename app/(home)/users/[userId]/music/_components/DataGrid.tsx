import type { ColumnDef } from '@tanstack/react-table';
import { Music } from './data-type';
import SortableHeader from '@/components/SortableHeader';
// import RowAction from './RowAction';
import DataTable, { PaginationAndOrderUrl } from '@/components/DataTable';
// import { searchSingerPage } from '@/services/singer-service';
import { DEFAULT_PAGE_SIZE } from '@/lib/common';
import AlbumCell from './AlbumCell';
import SingersCell from './SingersCell';
import MusicListsCell from './MusicListsCell';
import { searchMusicPage } from '@/services/music-service';
import DurationCell from './DurationCell';
import BooleanCell from './BooleanCell';
import RowAction from './RowAction';
import InfoCell from './InfoCell';

const columns: ColumnDef<Music>[] = [
  {
    accessorKey: 'name',
    header: '歌曲名',
  },
  {
    accessorKey: 'fileHash',
    header: '文件信息',
    cell: InfoCell,
  },
  {
    accessorKey: 'durationSeconds',
    meta: {
      label: '时长',
    },
    header: SortableHeader,
    cell: DurationCell,
  },
  {
    accessorKey: 'album',
    header: '专辑名',
    cell: AlbumCell,
  },
  {
    accessorKey: 'singers',
    header: '歌手',
    cell: SingersCell,
  },
  {
    accessorKey: 'musicLists',
    header: '歌单',
    cell: MusicListsCell,
  },
  {
    accessorKey: 'isFavorite',
    header: '收藏',
    cell: BooleanCell,
  },
  {
    accessorKey: 'isDeleted',
    header: '是否删除',
    cell: BooleanCell,
  },
  {
    accessorKey: 'hasLyric',
    header: '是否有歌词',
    cell: BooleanCell,
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
  userId: string;
  name?: string;
  albumId?: string;
  singerId?: string;
} & PaginationAndOrderUrl;

const DataGrid = async ({ userId, name, albumId, singerId, pageIndex, pageSize, sortField, isDesc }: Props) => {
  const { data, total } = await searchMusicPage({
    userId,
    name,
    albumId,
    singerId,
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
