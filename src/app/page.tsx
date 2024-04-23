// app/page.tsx
"use client";
import React from "react";
import Header from "./page-parts/Header";
import Main from "./page-parts/Main";
import Footer from "./page-parts/Footer";
import { Todo } from "@/components/models/interface";
import useLocalStorage from "@/components/client/hooks/useLocalStorage";

export async function loader() {
    const res = await fetch('https://api.example.com/todos');
    const todos: Todo[] = await res.json();
    return { props: { todos } };  // ここで取得したtodosをpropsとして返す
}

interface PageProps {
    todos: Todo[];
}

const Page: React.FC<PageProps> = ({ todos }) => {
    const [clientTodos, setClientTodos] = useLocalStorage<Todo[]>("todos", todos);

    return (
        <div className="w-full bg-green-50 h-screen">
            <Header />
            <Main todos={clientTodos} setTodos={setClientTodos} />
            <Footer setTodos={setClientTodos} />
        </div>
    );
};

export default Page;
