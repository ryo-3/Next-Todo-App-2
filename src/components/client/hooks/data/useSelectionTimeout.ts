// 選択状態の自動解除
import { useEffect, useState } from "react";

const useSelectionTimeout = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    // タイマーをリセットする関数
    const resetTimeout = () => {
        if (timeoutId) clearTimeout(timeoutId);
    };

    // IDを選択し、タイマーを設定する関数
    const handleSelect = (id: number | null) => {
        setSelectedId(id);
        resetTimeout();
        if (id !== null) {
            const newTimeoutId = setTimeout(() => {
                setSelectedId(null); // 5秒後に選択を解除
            }, 8000);
            setTimeoutId(newTimeoutId);
        }
    };

    // フォーカスの有無に基づいてタイマーを制御する関数
    const resetTimeoutOnFocusChange = (isFocused: boolean) => {
        resetTimeout();
        if (!isFocused && selectedId !== null) {
            const newTimeoutId = setTimeout(() => {
                setSelectedId(null); // フォーカスが外れた状態で5秒後に選択を解除
            }, 300);
            setTimeoutId(newTimeoutId);
        }
    };

    useEffect(() => {
        const handleFocus = () => resetTimeoutOnFocusChange(document.hasFocus());
        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleFocus);
        return () => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleFocus);
        };
    }, [selectedId, timeoutId]);

    useEffect(() => {
     
        return () => {
            resetTimeout();
        };
    }, [timeoutId]);

    return { selectedId, handleSelect, resetTimeoutOnFocusChange, setSelectedId };
};

export default useSelectionTimeout;