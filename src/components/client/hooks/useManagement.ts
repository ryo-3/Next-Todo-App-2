"use client";

// 必要なReactフックをインポート
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
import useCreateTodo from "./data/useCreateTodo"; // 新しいTodoを作成するためのロジックを提供します

// Todoリストの管理
import useUpdateTodos from "./data/useUpdateTodos"; // Todoリストの更新を管理するためのフック
import useLocalStorage from "./data/useLocalStorage"; // ローカルストレージを使用してTodoリストを永続化するためのフック
import useToggleTodoComplete from "./data/useToggleTodoComplete"; // Todoの完了状態のトグルを管理するフック
import useDropTodo from "./data/useDropTodo"; // ドラッグアンドドロップを通じてTodoの順番を並び替えるためのフック

// 入力とバリデーションの管理
import useInputChange from "./data/useInputChange"; // 入力フィールドの値変更を管理するためのフック
import useInputValidation from "./data/useInputValidation"; // 入力値のバリデーションを行うためのフック
import useHandleSubmit from "./data/useHandleSubmit"; // フォーム送信の処理を行うためのフック

// UIスタイルと固定
import useScrollFixed from "./data/useScrollFixed"; // スクロール時に特定のUI要素の位置を固定するためのスタイリングフック

// 選択とフォーカス管理
import useSelectionTimeout from "./data/useSelectionTimeout"; // 選択されたTodoアイテムの状態とタイムアウトを管理するためのフック
import usePinTodo from "./data/usePinTodo"; // ピン留めされたTodoの操作を行うためのフック
import { Todo } from "@/components/models/interface";

function useTodoManagement() {
  // 入力管理
  const { inputValue, setInputValue, handleChange } = useInputChange(); // 入力関連の処理
  const inputRef = useRef<HTMLInputElement>(null); // 入力エレメントへの参照

  // ピン管理
  const [pinnedIds, setPinnedIds] = useLocalStorage<number[]>("pinnedIds", []); // ピン止めとピン止めの状態保存

  // Todoリストの管理
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []); // Todoリストの状態管理
  const [loading, setLoading] = useState(true); // ローディングの状態
  const [showForm, setShowForm] = useState(true); // フォームの表示状態

  const { onDragEnd } = useDropTodo(todos, setTodos, pinnedIds, setPinnedIds); // ドラッグアンドドロップの終了処理

  // UIスタイルと固定
  const { fixedStyle, formRef, placeholderStyle } = useScrollFixed(); // UIスタイルの設定

  // 選択とフォーカス管理
  const { selectedId, setSelectedId, handleSelect, resetTimeoutOnFocusChange } =
    useSelectionTimeout(); // 選択とフォーカスのタイムアウト管理

  // ピン管理の操作
  const { handlePinClick } = usePinTodo(
    selectedId, // selectedIdを渡す
    pinnedIds,
    setPinnedIds
  );

  // Todo操作
  const { toggleTodoComplete } = useToggleTodoComplete(todos, setTodos); // Todoの完了状態を切り替える
  const { createTodo } = useCreateTodo(inputValue); // 新しいTodoの作成
  const { updateTodos } = useUpdateTodos(todos, setTodos, handleChange); // Todoの更新

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

  // 特定のTodoの削除処理
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

  // 特定のTodoのテキストを更新する処理
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

  // 指定されたTodoがピン留めされているかどうかを確認する
  const isPinned = pinnedIds.includes(selectedId ?? -1);

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

    // 選択とUIの管理
    selectedId, // 現在選択されているTodoアイテムのID
    handleSelect, // Todoアイテムの選択を処理する関数
    resetTimeoutOnFocusChange, // フォーカスが変わった時にタイムアウトをリセットする関数
    setSelectedId, // `selectedId`を更新する関数

    // バリデーションとエラー処理
    validateInput, // 入力のバリデーションを行う関数
    error, // エラーメッセージの状態

    // スタイルと参照
    fixedStyle, // スクロール時に固定されるスタイルを提供する
    formRef, // フォームのDOM参照
    placeholderStyle, // プレースホルダー用のスタイル

    // 状態とローディング
    loading, // ローディングの状態を示すフラグ

    // ピン管理
    pinnedIds, // ピン留めされたTodoアイテムのIDリスト
    handlePinClick, // Todoアイテムのピン留めと解除を処理する関数
    setPinnedIds, // ピン留めされたTodoアイテムのIDリストを更新する関数
    isPinned, // Todoアイテムがピン留めされているかどうかを確認する関数
  };
}

export default useTodoManagement;
