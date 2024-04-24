// todoリストの選択時
import { useState } from 'react';

const useSelectTodo = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleSelect = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };
  return { selectedId, handleSelect };
};

export default useSelectTodo;