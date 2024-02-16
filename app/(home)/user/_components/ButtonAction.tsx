import ModalDialog from '@/components/ModalDialog';
import { Button } from '@/components/ui/button';
import CreateUser from './CreateUser';

const ButtonAction = () => {
  return (
    <section className="panel">
      <ModalDialog trigger={<Button>新建用户</Button>} title="新建用户">
        <CreateUser />
      </ModalDialog>
    </section>
  );
};

export default ButtonAction;
