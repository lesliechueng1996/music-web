'use client';

import { Loader2, LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import type { ComponentProps } from 'react';

type TextProps = {
  text: string;
  isLoading: boolean;
} & ComponentProps<typeof Button>;

type IconProps = {
  Icon: LucideIcon;
  isLoading: boolean;
} & ComponentProps<typeof Button>;

type Props = TextProps | IconProps;

function LoadingButton(props: Props) {
  if ('Icon' in props) {
    const { Icon, isLoading, ...rest } = props;
    return (
      <Button variant="outline" size="icon" {...rest} disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
      </Button>
    );
  }

  const { text, isLoading, ...rest } = props;
  return (
    <Button {...rest} disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  );
}

export default LoadingButton;
