'use client';

import useSearchFilter from '@/hooks/useSearchFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchFilter = () => {
  const { formRef, searchParams, handleSearch } = useSearchFilter();

  return (
    <div className="panel">
      <form ref={formRef} className="flex items-center gap-5 flex-wrap" onSubmit={handleSearch}>
        <Input name="name" placeholder="专辑名" className="max-w-sm" defaultValue={searchParams.get('name') ?? ''} />
        <Button type="submit">搜索</Button>
      </form>
    </div>
  );
};

export default SearchFilter;
