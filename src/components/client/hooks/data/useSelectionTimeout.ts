import { useState, useEffect } from 'react';

const useSelectionTimeout = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleSelect = (id: number | null) => {
        setSelectedId(id);
        resetTimeout();
        if (id !== null) {
            const newTimeoutId = setTimeout(() => {
                if (!document.activeElement?.classList.contains('editable-item')) {
                    setSelectedId(null); // フォーカスが外れた状態で5秒後に選択を解除
                }
            }, 5000);
            setTimeoutId(newTimeoutId); // 新しいタイマーIDを設定
        }
    };

    const resetTimeout = () => {
        if (timeoutId) clearTimeout(timeoutId); // 既存のタイマーがあればクリア
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!event.target || !(event.target as HTMLElement).closest('.editable-item')) {
                resetTimeout();
            }
        };

        document.addEventListener("click", handleOutsideClick);
        document.addEventListener("keydown", resetTimeout);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            document.removeEventListener("click", handleOutsideClick);
            document.removeEventListener("keydown", resetTimeout);
        };
    }, [timeoutId]);

    return { selectedId, handleSelect };
};

export default useSelectionTimeout;
