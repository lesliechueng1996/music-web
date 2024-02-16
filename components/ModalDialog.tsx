'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, createContext, useContext } from 'react';
import { useBoolean } from 'usehooks-ts';

type ModalDialogContextType = {
  closeDialog: () => void;
};

const ModalDialogContext = createContext<ModalDialogContextType | null>(null);

type Props = {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
};

function ModalDialog({ trigger, title, children }: Props) {
  const { value, setFalse, setValue } = useBoolean(false);

  const context = {
    closeDialog: setFalse,
  };

  return (
    <ModalDialogContext.Provider value={context}>
      <Dialog open={value} onOpenChange={setValue}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="p-3">{children}</div>
        </DialogContent>
      </Dialog>
    </ModalDialogContext.Provider>
  );
}

export default ModalDialog;

export function useModalDialog() {
  const context = useContext(ModalDialogContext);

  if (!context) {
    throw new Error('useModalDialog must be used within a ModalDialog');
  }

  return context;
}
