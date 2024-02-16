import { PaginationAndOrderUrl } from '@/components/DataTable';
import ButtonAction from './_components/ButtonAction';
import SearchFilter from './_components/SearchFilter';
import DataGrid from './_components/DataGrid';

type Props = {
  searchParams: {
    username?: string;
    role?: string;
  } & PaginationAndOrderUrl;
};

const UserPage = ({ searchParams }: Props) => {
  return (
    <div className="space-y-5">
      <ButtonAction />
      <SearchFilter />
      <DataGrid {...searchParams} />
    </div>
  );
};

export default UserPage;
