// src/components/client/ui/Modal.tsx
import { ModalProps } from "@/components/models/interface";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-700 bg-opacity-50">
      <div className="bg-white rounded-lg max-w-sm mx-auto px-10 pt-7">
        <p className="text-lg text-center mb-4">{title}</p>
        {children}
        <div className="flex justify-center mt-5 mb-5">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-black rounded-md px-5 py-3 mr-5"
            onClick={onClose} //閉じるボタン
          >
            {cancelText}
          </button>
          <button
            className="Bg-brown text-white rounded-md px-5 py-2"
            onClick={onConfirm} //　削除ボタン
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
