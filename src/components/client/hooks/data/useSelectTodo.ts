import { useState } from 'react';

const useSelectTodo = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleSelect = (id: number | null) => {
    setSelectedId(id);
  };
  return { selectedId, handleSelect };
};

export default useSelectTodo;