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
import FloatingActionButton from "@/components/client/ui/AddTodoButton"; // Todo追加のためのフローティングアクションボタンコンポーネント
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
  } = useTodoManagement();

  return (
    <TodoProvider>
      <DeletedItemProvider>
        <UndoStackProvider>
          <main>
            {/* フローティングアクションボタン：新しいTodoを追加するためのボタン */}
            <FloatingActionButton
              onClick={handleButtonClick} // ボタンクリック時のイベントハンドラ
              inputRef={inputRef} // Todo入力フォームへの参照
            />

            {/* Todoフォームの表示制御 */}
            {showForm && (
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
                selectedId={selectedId} // 選択中のTodoアイテムのID
                setSelectedId={setSelectedId} 
                handleSelect={handleSelect} // Todoアイテムの選択をハンドルする関数
                toggleTodoComplete={toggleTodoComplete} // Todoの完了状態のトグル
                updateTodo={updateTodo} // Todoアイテムのテキスト更新
                onEditingStateChange={resetTimeoutOnFocusChange} // 編集状態の変更時のタイムアウトリセット
                onDragEnd={onDragEnd} // ドラッグアンドドロップの終了時のイベント
                pinnedIds={pinnedIds}
              />
            )}

            {/* Todoリストクリアボタン */}
            <ClearListButton
              todos={todos} // Todoアイテムのリスト
              setTodos={setTodos} // Todoリストを更新する関数
              isTodoCompleted={todos.some((todo) => todo.completed)} // Todoが完了しているかどうか
            />

            {/* Undo操作ボタン */}
            <UndoListButton
              todos={todos} // Todoアイテムのリスト
              setTodos={setTodos} // Todoリストを更新する関数
              removeItem={removeItem} // 特定のTodoアイテムを削除する関数
            />
            {/* Pin止め機能ボタン */}
            {selectedId && <PinButton onClick={() => handlePinClick(selectedId)} />}
          </main>
        </UndoStackProvider>
      </DeletedItemProvider>
    </TodoProvider>
    
  );
};

export default Page;
