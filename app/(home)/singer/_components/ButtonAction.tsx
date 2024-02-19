import ModalDialog from '@/components/ModalDialog';
import { Button } from '@/components/ui/button';
import CreateSinger from './CreateSinger';

const ButtonAction = () => {
  return (
    <section className="panel">
      <ModalDialog trigger={<Button>添加歌手</Button>} title="添加歌手">
        <CreateSinger />
      </ModalDialog>
    </section>
  );
};

export default ButtonAction;
