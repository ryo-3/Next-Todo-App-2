// Footer.tsx
"use client";
import React from "react";
import ClearListButton from "@/components/client/ui/ClearListButton.client";
import { FooterProps } from "@/components/models/interface";

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
