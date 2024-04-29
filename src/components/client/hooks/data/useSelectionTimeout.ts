import { useState, useEffect } from 'react';

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
            }, 5000);
            setTimeoutId(newTimeoutId);
        }
    };

    // フォーカスの有無に基づいてタイマーを制御する関数
    const resetTimeoutOnFocusChange = (isFocused: boolean) => {
        resetTimeout();
        if (!isFocused && selectedId !== null) {
            const newTimeoutId = setTimeout(() => {
                setSelectedId(null); // フォーカスが外れた状態で5秒後に選択を解除
            }, 5000);
            setTimeoutId(newTimeoutId);
        }
    };

    useEffect(() => {
        return () => {
            resetTimeout();
        };
    }, [timeoutId]);

    return { selectedId, handleSelect, resetTimeoutOnFocusChange };
};

export default useSelectionTimeout;
