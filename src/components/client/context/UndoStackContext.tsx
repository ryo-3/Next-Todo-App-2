// src/contexts/UndoStackContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Todo } from '@/components/models/interface';

interface UndoAction {
  type: "partial" | "full";
  items: { item: Todo; deletedIndex: number }[];
}

interface UndoStackContextType {
  undoStack: UndoAction[];
  setUndoStack: React.Dispatch<React.SetStateAction<UndoAction[]>>;
}

export const UndoStackContext = createContext<UndoStackContextType | null>(null);

export const UndoStackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [undoStack, setUndoStack] = useState<UndoAction[]>([]);

  return (
    <UndoStackContext.Provider value={{ undoStack, setUndoStack }}>
      {children}
    </UndoStackContext.Provider>
  );
};

export const useUndoStack = () => {
  const context = useContext(UndoStackContext);
  if (!context) {
    throw new Error('useUndoStack must be used within a UndoStackProvider');
  }
  return context;
};