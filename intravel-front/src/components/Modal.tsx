import { ComponentProps, ReactNode } from 'react';


interface ModalProps extends ComponentProps<'div'> {
  children: ReactNode;
}

export function Modal({ children, ...props }: ModalProps) {
  return (
    <div {...props} className="fixed inset-0 bg-gray-950/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-gray-900 space-y-5" >
        {children}
      </div>
    </div>
  );
}
