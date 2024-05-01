"use client";
// import { Todo } from "@/components/models/interface";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// 新しいTodoの作成
import useCreateTodo from "./data/useCreateTodo"; // 新しいTodoを作成するためのロジックを提供します。

// Todoリストの管理
import useUpdateTodos from "./data/useUpdateTodos"; // Todoリストの更新を管理するためのフック。
import useLocalStorage from "./data/useLocalStorage"; // ローカルストレージを使用してTodoリストを永続化するためのフック。
import useToggleTodoComplete from "./data/useToggleTodoComplete"; // Todoの完了状態のトグルを管理するフック。
import useDropTodo from "./data/useDropTodo"; // ドラッグアンドドロップを通じてTodoの順番を並び替えるためのフック。

// 入力とバリデーションの管理
import useInputChange from "./data/useInputChange"; // 入力フィールドの値変更を管理するためのフック。
import useInputValidation from "./data/useInputValidation"; // 入力値のバリデーションを行うためのフック。
import useHandleSubmit from "./data/useHandleSubmit"; // フォーム送信の処理を行うためのフック。

// UIスタイルと固定
import useScrollFixed from "./data/useScrollFixed"; // スクロール時に特定のUI要素の位置を固定するためのスタイリングフック。

// 選択とフォーカス管理
import useSelectionTimeout from "./data/useSelectionTimeout"; // 選択されたTodoアイテムの状態とタイムアウトを管理するためのフック。
import usePinTodo from "./data/usePinTodo";
import { Todo } from "@/components/models/interface";

function useTodoManagement() {
  // 入力関連の処理
  const { inputValue, setInputValue, handleChange } = useInputChange();
  const inputRef = useRef<HTMLInputElement>(null);

  // ピン止めとピン止めの状態保存
  const [pinnedIds, setPinnedIds] = useLocalStorage<number[]>("pinnedIds", []);
  const { pinItem, handlePinClick } = usePinTodo(pinnedIds, setPinnedIds,);

  // Todoリストの状態管理
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(true);

  // ドラッグアンドドロップの終了処理
  const { onDragEnd } = useDropTodo(todos, setTodos, pinnedIds, setPinnedIds);

  // UIスタイルの設定
  const { fixedStyle, formRef, placeholderStyle } = useScrollFixed();

  // 選択とフォーカスのタイムアウト管理
  // useTodoManagement フック内
  const { selectedId, setSelectedId, handleSelect, resetTimeoutOnFocusChange } =
    useSelectionTimeout();

  // Todo操作
  const { toggleTodoComplete } = useToggleTodoComplete(todos, setTodos);
  const { createTodo } = useCreateTodo(inputValue);
  const { updateTodos } = useUpdateTodos(todos, setTodos, handleChange);

  // 入力のバリデーション
  const { validateInput, error } = useInputValidation(
    (value: string) => value.trim().length > 0,
    inputValue
  );

  // フォームのサブミット処理
  const { handleSubmit } = useHandleSubmit(
    validateInput,
    createTodo,
    updateTodos
  );

  // 初期ローディング状態を管理するための効果
  useEffect(() => {
    // 200ミリ秒後にローディング状態をfalseに設定し、UIに表示変更を促す
    setTimeout(() => setLoading(false), 200);
  }, []);

  // 指定されたインデックスのTodoをリストから削除する関数
  const removeItem = useCallback(
    (index: number) => {
      const newTodos = [...todos]; // 現在のTodosのコピーを作成
      newTodos.splice(index, 1); // 指定インデックスのTodoを削除
      setTodos(newTodos); // 更新されたTodosリストをセット
    },
    [todos, setTodos]
  );

  // ボタンクリック時に入力フィールドにフォーカスを当てる処理
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // inputRefが存在すれば、その要素にフォーカスを設定
    }
  };

  // フォームのサブミット処理をハンドル
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // デフォルトのフォーム送信を防止
    handleSubmit(event); // カスタムのサブミット処理を実行
  };

  // 特定のTodoのテキストを更新する関数
  const updateTodo = useCallback(
    (id: number, newText: string) => {
      // Todoリストを走査し、該当するIDのTodoのテキストを更新
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      setTodos(updatedTodos); // 更新されたTodosリストをセット
    },
    [todos, setTodos]
  );

  return {
    // 入力管理
    inputValue, // 入力されたテキストの状態
    setInputValue, // inputValueを更新する関数
    handleChange, // 入力フィールドが変更されたときのハンドラ
    inputRef, // 入力エレメントへの参照

    // フォーム操作
    handleSubmit, // フォームのサブミットを処理する関数
    handleFormSubmit, // フォームのサブミットイベントを処理する関数
    showForm, // フォームを表示するかどうかの状態
    setShowForm, // showFormの状態を更新する関数
    handleButtonClick, // ボタンクリック時の処理を行う関数

    // Todoリストの管理
    todos, // Todoアイテムのリスト
    setTodos, // Todoリストを更新する関数
    removeItem, // 特定のTodoアイテムを削除する関数
    updateTodo, // Todoアイテムのテキストを更新する関数
    toggleTodoComplete, // Todoの完了状態を切り替える関数
    onDragEnd, // ドラッグアンドドロップの終了時に呼ばれる関数

    // ユーザーインタラクションとUIの管理
    selectedId, // 現在選択されているTodoアイテムのID
    handleSelect, // Todoアイテムの選択を処理する関数
    resetTimeoutOnFocusChange, // フォーカスが変わった時にタイムアウトをリセットする関数

    // バリデーションとエラー処理
    validateInput, // 入力のバリデーションを行う関数
    error, // エラーメッセージの状態

    // スタイルと参照
    fixedStyle, // スクロール時に固定されるスタイルを提供する
    formRef, // フォームのDOM参照
    placeholderStyle, // プレースホルダー用のスタイル

    // 状態とローディング
    loading, // ローディングの状態を示すフラグ
    pinnedIds,
    pinItem,
    handlePinClick,
    setSelectedId,
  };
}

export default useTodoManagement;
