// src/hooks/useClearButtonModal.ts
import { useState } from "react";

export const useClearButtonModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal, setIsModalOpen };
};
