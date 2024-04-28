import React, { createContext, useState, useContext } from "react";
import { Todo } from "@/components/models/interface";

interface DeletedItemContextType {
  deletedItems: { item: Todo; deletedIndex: number }[];
  setDeletedItems: React.Dispatch<
    React.SetStateAction<{ item: Todo; deletedIndex: number }[]>
  >;
}

const DeletedItemContext = createContext<DeletedItemContextType | undefined>(
  undefined
);

export const DeletedItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [deletedItems, setDeletedItems] = useState<
    { item: Todo; deletedIndex: number }[]
  >([]);

  return (
    <DeletedItemContext.Provider value={{ deletedItems, setDeletedItems }}>
      {children}
    </DeletedItemContext.Provider>
  );
};

export const useDeletedItemContext = () => {
  const context = useContext(DeletedItemContext);
  if (!context) {
    throw new Error(
      "useDeletedItemContext must be used within a DeletedItemProvider"
    );
  }
  return context;
};