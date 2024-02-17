import ModalDialog from '@/components/ModalDialog';
import { Button } from '@/components/ui/button';
import CreateAlbum from './CreateAlbum';

const ButtonAction = () => {
  return (
    <section className="panel">
      <ModalDialog trigger={<Button>新建专辑</Button>} title="新建专辑">
        <CreateAlbum />
      </ModalDialog>
    </section>
  );
};

export default ButtonAction;
