'use client';

import { FormEventHandler, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const DialogForm = ({ children, onSubmit }: Props) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form className="space-y-5 max-h-96 overflow-y-auto px-2" onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default DialogForm;
