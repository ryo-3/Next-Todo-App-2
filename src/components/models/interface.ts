import { Dispatch, SetStateAction } from "react";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
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
