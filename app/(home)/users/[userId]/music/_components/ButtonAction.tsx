import ModalDialog from '@/components/ModalDialog';
import { Button } from '@/components/ui/button';
import CreateMusic from './CreateMusic';

const ButtonAction = () => {
  return (
    <section className="panel">
      <ModalDialog trigger={<Button>添加歌曲</Button>} title="添加歌曲">
        <CreateMusic />
      </ModalDialog>
    </section>
  );
};

export default ButtonAction;
