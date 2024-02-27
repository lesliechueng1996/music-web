'use client';

import { useId } from 'react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Props = {
  label: string;
  name: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  placeholder?: string;
  defaultValue?: string;
};

const SelectWithLabel = ({ label, name, options, placeholder, defaultValue }: Props) => {
  const id = `${name}-${useId()}}`;

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Select name={name} defaultValue={defaultValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectWithLabel;
