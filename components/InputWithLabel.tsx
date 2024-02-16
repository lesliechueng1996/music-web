'ust client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ComponentProps, useId } from 'react';

type Props = {
  label: string;
  name: string;
} & ComponentProps<typeof Input>;

function InputWithLabel({ name, label, placeholder, ...props }: Props) {
  const id = `${name}-${useId()}}`;

  const inputPlaceholder = placeholder ?? `请输入${label}`;

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input name={name} id={id} placeholder={inputPlaceholder} {...props} />
      </div>
    </div>
  );
}

export default InputWithLabel;
