import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Guitar } from 'lucide-react';

type Props = {
  isPlaying: boolean;
  imageUrl: string | null;
};

const DiscPlaying = ({ isPlaying, imageUrl }: Props) => {
  return (
    <div className="relative w-56 h-72">
      <div className="absolute w-56 h-56 bottom-0">
        {imageUrl ? (
          <Image
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            src={imageUrl}
            width={144}
            height={144}
            alt="album"
          />
        ) : (
          <Guitar className="absolute bg-red-500 w-36 h-36 p-5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}

        <Image
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          src="/imgs/disc.png"
          width={200}
          height={200}
          alt="disc"
        />
      </div>
      <Image
        className={cn(
          'absolute top-0 left-[100px] origin-top-left transition-transform duration-300',
          isPlaying && 'rotate-[20deg]'
        )}
        src="/imgs/needle.png"
        width={120}
        height={120}
        alt="needle"
      />
    </div>
  );
};

export default DiscPlaying;
