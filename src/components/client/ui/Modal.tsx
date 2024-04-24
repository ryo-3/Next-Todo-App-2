import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-700 bg-opacity-50">
        <div className="bg-white rounded-lg max-w-sm mx-4">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
            </button>
         
          <div className="px-8  pt-3 pb-5 text-center">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;