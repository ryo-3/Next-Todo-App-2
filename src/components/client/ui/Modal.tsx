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
          <div className="flex justify-between p-2">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
            </button>
          </div>
          <div className="px-8  py-1 text-center">{children}</div>
          <div className="flex justify-center p-2">
            {/* ボタンがある場合はここに配置 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;