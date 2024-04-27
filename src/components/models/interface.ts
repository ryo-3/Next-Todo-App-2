import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  index: number; // インデックス番号を追加
}

type SetTodos = Dispatch<SetStateAction<Todo[]>>;
export interface TodoFormProps {
  addTodo: (todo: string) => void;
}

export interface TodoFormProps {
  addTodo: (todo: string) => void; // addTodoは文字列を引数に取り、返り値がない（void）関数
}

export interface MainProps {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export interface FooterProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface ClearListButtonProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isTodoCompleted: boolean;
}

export interface ClearListButtonProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isTodoCompleted: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  cancelText: string;
  children: ReactNode;
}

export interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedId: number | null;
  handleSelect: (id: number) => void;
  toggleTodoComplete: (id: number) => void;
  index?: number; // indexプロパティを追加
}


export interface UndoListButtonProps {
  deletedItems: { item: Todo; deletedIndex: number }[];
  setDeletedItems: Dispatch<
    SetStateAction<{ item: Todo; deletedIndex: number }[]>
  >;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  onClick: () => void; // onClickプロパティを追加
}
