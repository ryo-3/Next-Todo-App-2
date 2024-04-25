import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
// Todoリストを更新する関数の型定義
type SetTodos = Dispatch<SetStateAction<Todo[]>>;
// TodoFormコンポーネントのプロパティ
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
