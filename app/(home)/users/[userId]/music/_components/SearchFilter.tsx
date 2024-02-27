'use client';

import useSearchFilter from '@/hooks/useSearchFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { getAlbumOptionsByUserId } from '@/actions/album-action';
import { getSingerOptionsByUserId } from '@/actions/singer-action';

type Options = { label: string; value: string }[];

type Props = {
  userId: string;
};

const SearchFilter = ({ userId }: Props) => {
  const { formRef, searchParams, handleSearch } = useSearchFilter();

  const [albumOptions, setAlbumOptions] = useState<Options>([]);
  const [singerOptions, setSingerOptions] = useState<Options>([]);

  useEffect(() => {
    Promise.all([getAlbumOptionsByUserId(userId), getSingerOptionsByUserId(userId)]).then(
      ([albumOptions, singerOptions]) => {
        setAlbumOptions(albumOptions);
        setSingerOptions(singerOptions);
      }
    );
  }, [userId]);

  return (
    <div className="panel">
      <form ref={formRef} className="flex items-center gap-5 flex-wrap" onSubmit={handleSearch}>
        <Input name="name" placeholder="歌曲名" className="max-w-sm" defaultValue={searchParams.get('name') ?? ''} />
        <Select name="albumId">
          <SelectTrigger className="w-[360px]">
            <SelectValue placeholder="选择专辑" />
          </SelectTrigger>
          <SelectContent>
            {albumOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select name="singerId">
          <SelectTrigger className="w-[360px]">
            <SelectValue placeholder="选择歌手" />
          </SelectTrigger>
          <SelectContent>
            {singerOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">搜索</Button>
      </form>
    </div>
  );
};

export default SearchFilter;
