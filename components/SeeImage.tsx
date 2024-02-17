import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Eye } from 'lucide-react';
import Image from 'next/image';

type Props = {
  url: string;
};

const SeeImage = ({ url }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Eye size={20} />
      </PopoverTrigger>
      <PopoverContent className="w-28 text-center">
        <Image src={url} width={100} height={100} alt="album image" />
      </PopoverContent>
    </Popover>
  );
};

export default SeeImage;
