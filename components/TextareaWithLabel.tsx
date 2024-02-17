'ust client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ComponentProps, useId } from 'react';

type Props = {
  label: string;
  name: string;
} & ComponentProps<typeof Textarea>;

function TextareaWithLabel({ name, label, placeholder, ...props }: Props) {
  const id = `${name}-${useId()}}`;

  const inputPlaceholder = placeholder ?? `请输入${label}`;

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Textarea name={name} id={id} placeholder={inputPlaceholder} {...props} />
      </div>
    </div>
  );
}

export default TextareaWithLabel;
