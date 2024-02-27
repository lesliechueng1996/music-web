import { PaginationAndOrderUrl } from '@/components/DataTable';
import ButtonAction from './_components/ButtonAction';
import SearchFilter from './_components/SearchFilter';
import DataGrid from './_components/DataGrid';

type Props = {
  params: {
    userId: string;
  };
  searchParams: {
    name?: string;
    albumId?: string;
    singerId?: string;
  } & PaginationAndOrderUrl;
};

const UserMusicPage = ({ params: { userId }, searchParams }: Props) => {
  return (
    <div className="space-y-5">
      <ButtonAction />
      <SearchFilter userId={userId} />
      <DataGrid userId={userId} {...searchParams} />
    </div>
  );
};

export default UserMusicPage;
