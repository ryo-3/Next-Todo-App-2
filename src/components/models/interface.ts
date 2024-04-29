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

export interface MainProps {
  todos: Todo[];
  setTodos: SetTodos;
}

export interface FooterProps {
  setTodos: SetTodos;
}

export interface ClearListButtonProps {
  todos: Todo[];
  setTodos: SetTodos;
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
  setTodos: SetTodos;
  selectedId: number | null;
  handleSelect: (id: number | null) => void;
  toggleTodoComplete: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
  onEditingStateChange: (isFocused: boolean) => void;
}

export interface UndoListButtonProps {
  todos: Todo[];
  setTodos: SetTodos;
  removeItem: (index: number) => void;
}
