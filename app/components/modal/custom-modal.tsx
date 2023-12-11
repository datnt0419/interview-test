import { useDisclosure } from '@/app/hooks';
import React, { PropsWithChildren, useId } from 'react';
import { createPortal } from 'react-dom';

export type ModalStateProps = ReturnType<typeof useDisclosure>;

interface CustomModalProps extends PropsWithChildren, Partial<ModalStateProps> {
  modalTitle: string;
  renderFooter?: React.ReactNode;
}

export function CustomModal(props: CustomModalProps) {
  const { modalTitle, children, isOpen, onClose, renderFooter } = props;
  const uuIdModal = useId();

  // const { isOpen, onClose, onOpen } = disclosureModal;

  // const triggerButton =
  //   typeof trigger === 'function' ? trigger(disclosureModal) : trigger;

  // const triggerModal = React.cloneElement(triggerButton, {
  //   onClick: onOpen,
  // });

  const ModalBase = (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          {/*content*/}
          <div className="relative  flex w-[700px] flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
              <h3 className="text-3xl font-semibold">{modalTitle}</h3>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md bg-white p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto  p-6">{children}</div>
            {/*footer*/}
            {renderFooter && renderFooter}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );

  const modalPortal = createPortal(ModalBase, document.body, uuIdModal);
  return <>{isOpen ? modalPortal : null}</>;
}
