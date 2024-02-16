'use client';

import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import type { ComponentProps } from 'react';

type Props = {
  text: string;
  isLoading: boolean;
} & ComponentProps<typeof Button>;

function LoadingButton({ text, isLoading, ...props }: Props) {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  );
}

export default LoadingButton;
