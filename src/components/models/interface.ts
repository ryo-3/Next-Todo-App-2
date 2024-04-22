export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoFormProps {
  addTodo: (todo: string) => void; // addTodoは文字列を引数に取り、返り値がない（void）関数
}
