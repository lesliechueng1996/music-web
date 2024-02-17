import { PaginationAndOrderUrl } from '@/components/DataTable';
import ButtonAction from './_components/ButtonAction';
import DataGrid from './_components/DataGrid';
import SearchFilter from './_components/SearchFilter';

type Props = {
  searchParams: {
    username?: string;
    role?: string;
  } & PaginationAndOrderUrl;
};

const AlbumPage = ({ searchParams }: Props) => {
  return (
    <div className="space-y-5">
      <ButtonAction />
      <SearchFilter />
      <DataGrid {...searchParams} />
    </div>
  );
};

export default AlbumPage;
