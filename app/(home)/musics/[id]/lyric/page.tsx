import { getMusicAndRelationById } from '@/services/music-service';
import MusicInfo from './_components/MusicInfo';
import { notFound } from 'next/navigation';
import MusicControl from './_components/MusicControl';
import LyricPanel from './_components/LyricPanel';
import AudioProvider from '@/providers/AudioProvider';

type Props = {
  params: {
    id: string;
  };
};

const imageUrlPrefix = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

const MusicLyricPage = async ({ params: { id } }: Props) => {
  const music = await getMusicAndRelationById(id);

  if (!music) {
    notFound();
  }

  const { name, singers, album } = music;

  return (
    <AudioProvider>
      <div className="flex gap-5">
        <div className="flex flex-col items-center gap-8 w-0 grow">
          <MusicInfo
            name={name}
            singerNames={singers.map((singer) => singer.singer.name)}
            albumName={album.name}
            albumImgUrl={album.image ? `${imageUrlPrefix}/${album.image}` : null}
          />
          <MusicControl url="http://localhost:3000/test.mp3" />
        </div>
        <div className="w-0 grow">
          <LyricPanel />
        </div>
      </div>
    </AudioProvider>
  );
};

export default MusicLyricPage;
