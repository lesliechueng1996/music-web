'ust client';

import { ComponentProps, useId } from 'react';
import { Label } from './ui/label';
import Combobox from './Combobox';

type Props = {
  label: string;
  name: string;
} & Omit<ComponentProps<typeof Combobox>, 'id'>;

function ComboboxWithLabel({ label, name, ...props }: Props) {
  const id = `${name}-${useId()}}`;

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Combobox {...props} id={id} name={name} />
      </div>
    </div>
  );
}

export default ComboboxWithLabel;
