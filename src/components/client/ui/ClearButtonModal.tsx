// src/components/client/ui/ClearButtonModal.tsx
import { ModalProps } from "@/components/models/interface";
import Modal from "./Modal";

const ClearButtonModal: React.FC<ModalProps> = ({
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      confirmText={confirmText}
      cancelText={cancelText}
    >
      {children}
    </Modal>
  );
};

export default ClearButtonModal;
