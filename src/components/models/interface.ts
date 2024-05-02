import { DropResult } from "@hello-pangea/dnd";
import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  order: number; 
}

type SetTodos = Dispatch<SetStateAction<Todo[]>>;

// export interface TodoFormProps {
//   addTodo: (todo: string) => void;
// }

// export interface MainProps {
//   todos: Todo[];
//   setTodos: SetTodos;
// }

// export interface FooterProps {
//   setTodos: SetTodos;
// }

export interface ClearListButtonProps {
  todos: Todo[];
  setTodos: SetTodos;
  isTodoCompleted: boolean;
  pinnedIds: number[];  
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
  setSelectedId: (id: number | null) => void; 
  handleSelect: (id: number | null) => void;
  toggleTodoComplete: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
  onEditingStateChange: (isFocused: boolean) => void;
  onDragEnd: (result: DropResult) => void; 
  pinnedIds: number[];
  setPinnedIds: (ids: number[]) => void;
}

export interface UndoListButtonProps {
  todos: Todo[];
  setTodos: SetTodos;
  removeItem: (index: number) => void;
}

export interface TodoItemProps {
  todo: Todo;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void; 
  updateTodo: (id: number, newText: string) => void;
  className?: string;
  onEditingStateChange: (isFocused: boolean) => void;
}

// export interface UseTodoManagement { 
//     inputValue: string;
//     setInputValue: Dispatch<SetStateAction<string>>;
//     handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     inputRef: React.RefObject<HTMLInputElement>;
//     pinnedIds: number[];
//     setPinnedIds: Dispatch<SetStateAction<number[]>>;
//     pinItem: (id: number) => void;
//     handlePinClick: (id: number | null) => void;
//     onDragEnd: (result: DropResult) => void;
//     todos: Todo[];
//     setTodos: Dispatch<SetStateAction<Todo[]>>;
//     loading: boolean;
//     showForm: boolean;
//     setShowForm: Dispatch<SetStateAction<boolean>>;
//     toggleTodoComplete: (id: number) => void;
//     createTodo: () => void;
//     updateTodos: () => void;
//     removeItem: (index: number) => void;
//     updateTodo: (id: number, newText: string) => void;
//     validateInput: () => boolean;
//     error: string | null;
//     handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
//     handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
//     handleButtonClick: () => void;
//     fixedStyle: any;  // 適切な型に変更する
//     formRef: React.RefObject<HTMLDivElement>;
//     placeholderStyle: any;  // 適切な型に変更する
//   }
