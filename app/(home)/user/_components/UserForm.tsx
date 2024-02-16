import DialogForm from '@/components/DialogForm';
import InputWithLabel from '@/components/InputWithLabel';
import LoadingButton from '@/components/LoadingButton';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export type FormData = {
  username: string;
  imei: string;
};

type Props = {
  initData?: FormData;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
};

const UserForm = ({ initData, onSubmit, isLoading }: Props) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formElm = e.target as HTMLFormElement;
    const formData = new FormData(formElm);
    const username = formData.get('username') as string;
    const imei = formData.get('imei') as string;

    if (!username) {
      toast.warning('用户名不能为空');
      return;
    }
    if (!imei) {
      toast.warning('IMEI不能为空');
      return;
    }

    onSubmit({ username, imei });
  };

  return (
    <DialogForm onSubmit={handleSubmit}>
      <InputWithLabel name="username" label="用户名" defaultValue={initData?.username ?? ''} maxLength={32} required />
      <InputWithLabel name="imei" label="IMEI" defaultValue={initData?.username ?? ''} maxLength={64} required />

      <div className="text-right">
        <LoadingButton text="保存" isLoading={isLoading} type="submit" />
      </div>
    </DialogForm>
  );
};

export default UserForm;
