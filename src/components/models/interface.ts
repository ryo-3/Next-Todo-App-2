import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
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

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  cancelText: string;
  children: ReactNode;
}

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoListProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  selectedId: number | null;
  handleSelect: (id: number | null) => void; // 型を変更
  toggleTodoComplete: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
  onEditingStateChange: (isFocused: boolean) => void;  // 新しいプロパティの追加
}

export interface UndoListButtonProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  removeItem: (index: number) => void;
}
