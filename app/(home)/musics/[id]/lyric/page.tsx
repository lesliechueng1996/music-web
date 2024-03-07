import { getMusicAndRelationById } from '@/services/music-service';
import MusicInfo from './_components/MusicInfo';
import { notFound } from 'next/navigation';
import MusicControl from './_components/MusicControl';

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
    <div>
      <div className="flex flex-col items-center gap-8">
        <MusicInfo
          name={name}
          singerNames={singers.map((singer) => singer.singer.name)}
          albumName={album.name}
          albumImgUrl={album.image ? `${imageUrlPrefix}/${album.image}` : null}
        />
        <MusicControl />
      </div>
    </div>
  );
};

export default MusicLyricPage;
