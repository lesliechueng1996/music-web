'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import { Badge } from './ui/badge';

export type Option = {
  value: string;
  label: string;
};

type Props = {
  placeholder: string;
  id: string;
  name: string;
  options: Option[];
};

export default function Combobox({ placeholder, options, ...inputProps }: Props) {
  const [open, setOpen] = useState(false);
  const [selectList, setSelectList] = useState<Option[]>([]);

  const handleSelectItem = (selectValue: string) => {
    if (selectList.find((item) => item.value === selectValue)) {
      setSelectList(selectList.filter((item) => item.value !== selectValue));
    } else {
      const selectOption = options.find((option) => option.value === selectValue);
      if (!selectOption) {
        return;
      }
      setSelectList([...selectList, selectOption]);
    }
  };

  const isValueInSelectList = (value: string) => selectList.find((item) => item.value === value);

  const inputValue = selectList.map((item) => item.value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-80 justify-between">
          {selectList.length > 0 ? (
            <div className="flex items-center gap-2 overflow-hidden">
              {selectList.map((item) => (
                <Badge key={item.value}>{item.label}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">{placeholder}</p>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          <input type="hidden" className="hidden" value={inputValue} {...inputProps} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="搜索" />
          <CommandEmpty>无结果</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem key={option.value} value={option.value} onSelect={handleSelectItem}>
                <Check
                  className={cn('mr-2 h-4 w-4', isValueInSelectList(option.value) ? 'opacity-100' : 'opacity-0')}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
