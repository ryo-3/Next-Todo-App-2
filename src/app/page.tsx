"use client";
import React, { FormEvent, useState, useRef, useEffect } from "react";
import { TodoProvider } from "@/components/client/context/TodoContext"; // Todoデータのコンテキストプロバイダー
import { DeletedItemProvider } from "@/components/client/context/DeletedItemContext"; // 削除されたTodoデータのコンテキストプロバイダー
import { UndoStackProvider } from "@/components/client/context/UndoStackContext"; // Undo操作のスタックを管理するコンテキストプロバイダー
// Todoの管理に関するロジックを提供するカスタムフック
import useTodoManagement from "@/components/client/hooks/useManagement";

// UIコンポーネント
import TodoForm from "@/components/client/ui/TodoForm"; // Todo入力フォームコンポーネント
import TodoList from "@/components/client/ui/TodoList"; // Todoリスト表示コンポーネント
import AddTodoButton from "@/components/client/ui/AddTodoButton"; // Todo追加のためのフローティングアクションボタンコンポーネント
import ClearListButton from "@/components/client/ui/ClearListButton.client"; // Todoリストをクリアするボタンコンポーネント
import UndoListButton from "@/components/client/ui/UndoListButton.client"; // Undo操作を行うボタンコンポーネント
import PinButton from "@/components/client/ui/PinButton"; // PinButton コンポーネントのインポート

const Page: React.FC = () => {
  const {
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

    // 選択とインタラクションの管理
    selectedId, // 現在選択されているTodoアイテムのID
    handleSelect, // Todoアイテムの選択を処理する関数
    setSelectedId, // `selectedId`を更新する関数
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

    // ピン管理
    pinnedIds, // ピン留めされたTodoアイテムのIDリスト
    handlePinClick, // Todoアイテムのピン留めと解除を処理する関数
    setPinnedIds, // ピン留めされたTodoアイテムのIDリストを更新する関数
    isPinned, // Todoアイテムがピン留めされているかどうかを確認する関数
  } = useTodoManagement();

  return (
    <TodoProvider>
      <DeletedItemProvider>
        <UndoStackProvider>
          <main>
            {/* 新しいTodoを追加するためのボタン */}
            <AddTodoButton
              onClick={handleButtonClick} // ボタンクリック時のイベントハンドラ
              inputRef={inputRef} // Todo入力フォームへの参照
            />

            {/* Todoフォームの表示制御 */}
            {showForm && (
              // フォームの参照とプレースホルダーのスタイル
              <div ref={formRef} style={placeholderStyle}>
                {/* Todoフォームコンポーネント */}
                <TodoForm
                  inputValue={inputValue} // フォームの入力値
                  handleChange={handleChange} // 入力値変更時のハンドラ
                  handleSubmit={handleFormSubmit} // フォーム送信時のイベントハンドラ
                  error={error} // フォームのエラーメッセージ
                  showForm={showForm} // フォームの表示状態
                  inputRef={inputRef} // 入力フォームへの参照
                  fixedStyle={fixedStyle} // スクロール時に固定されるスタイル
                  formRef={formRef} // フォームのDOM参照
                />
              </div>
            )}

            {/* ローディング表示制御 */}
            {loading ? (
              <div className="text-slate-800 pt-6 pl-2">読み込み中...</div> // ローディングテキスト
            ) : (
              <TodoList
                todos={todos} // Todoアイテムのリスト
                setTodos={setTodos} // Todoリストを更新する関数
                toggleTodoComplete={toggleTodoComplete} // Todoの完了状態を切り替える関数
                updateTodo={updateTodo} // Todoアイテムのテキストを更新する関数
                selectedId={selectedId} // 現在選択されているTodoアイテムのID
                handleSelect={handleSelect} // Todoアイテムの選択を処理する関数
                onEditingStateChange={resetTimeoutOnFocusChange} // 編集状態が変わった時にタイムアウトをリセットする関数
                onDragEnd={onDragEnd} // ドラッグアンドドロップの終了時に呼ばれる関数
                pinnedIds={pinnedIds} // ピン留めされたTodoアイテムのIDリスト
                setSelectedId={setSelectedId} // `selectedId`を更新する関数
                setPinnedIds={setPinnedIds} // ピン留めされたTodoアイテムのIDリストを更新する関数
              />
            )}

            {/* Todoリストクリアボタン */}
            <ClearListButton
              todos={todos} // Todoアイテムのリスト
              setTodos={setTodos} // Todoリストを更新する関数
              isTodoCompleted={todos.some((todo) => todo.completed)} // Todoが完了しているかどうか
              pinnedIds={pinnedIds}
            />

            {/* Undo操作ボタン */}
            <UndoListButton
              todos={todos} // Todoアイテムのリスト
              setTodos={setTodos} // Todoリストを更新する関数
              removeItem={removeItem} // 特定のTodoアイテムを削除する関数
            />
            {/* Pin止め機能ボタン */}
            
            {selectedId && ( // Todoアイテムが選択されている場合
              // ピン留めボタンの表示とピン留め状態の切り替え
              <PinButton isPinned={isPinned} onClick={handlePinClick} />
            )}
          </main>
        </UndoStackProvider>
      </DeletedItemProvider>
    </TodoProvider>
  );
};

export default Page;
