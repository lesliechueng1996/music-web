import DialogForm from '@/components/DialogForm';
import InputWithLabel from '@/components/InputWithLabel';
import LoadingButton from '@/components/LoadingButton';
import TextareaWithLabel from '@/components/TextareaWithLabel';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export type FormData = {
  name: string;
  description: string;
};

type Props = {
  initData?: FormData;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
};

const SingerForm = ({ initData, onSubmit, isLoading }: Props) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formElm = e.target as HTMLFormElement;
    const formData = new FormData(formElm);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if (!name) {
      toast.warning('歌手名不能为空');
      return;
    }

    onSubmit({ name, description });
  };

  return (
    <DialogForm onSubmit={handleSubmit}>
      <InputWithLabel name="name" label="歌手名" defaultValue={initData?.name ?? ''} maxLength={32} required />
      <TextareaWithLabel
        name="description"
        label="描述"
        defaultValue={initData?.description ?? ''}
        className="resize-none"
      />

      <div className="text-right">
        <LoadingButton text="保存" isLoading={isLoading} type="submit" />
      </div>
    </DialogForm>
  );
};

export default SingerForm;
