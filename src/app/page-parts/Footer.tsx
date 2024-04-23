// Footer.tsx
"use client";
import React from "react";
import ClearListButton from "@/components/client/ui/ClearListButton.client";
import { Todo } from "@/components/models/interface";

interface FooterProps {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Footer: React.FC<FooterProps> = ({ setTodos }) => {
    const clearTodos = () => setTodos([]);

    return (
        <footer>
            <nav>
                <ClearListButton onClear={clearTodos} />
            </nav>
        </footer>
    );
};

export default Footer;
