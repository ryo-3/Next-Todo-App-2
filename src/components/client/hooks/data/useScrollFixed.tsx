import { useEffect, useRef, useState, useMemo } from "react";

function useScrollFixed() {
  const [isFixed, setIsFixed] = useState(false);
  const formRef = useRef<HTMLDivElement>(null); // フォーム要素への参照
  const lastScrollY = useRef(0); // 最後のスクロール位置を記憶するためのref
  const [initialFormHeight, setInitialFormHeight] = useState<
    number | undefined
  >(undefined);
  const [initialFormTop, setInitialFormTop] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (formRef.current) {
      setInitialFormHeight(formRef.current.offsetHeight);
      setInitialFormTop(formRef.current.offsetTop);
      const formHeight = formRef.current.offsetHeight;

      const handleScroll = () => {
        // スクロールが上に移動しているかどうかを判定
        const scrollingUp = window.scrollY < lastScrollY.current;

        if (window.scrollY >= formHeight + 15 && !scrollingUp) {
          setIsFixed(true); // スクロール位置がフォームの上端以上で、かつ下にスクロールしている場合はfixedを適用
        } else if (scrollingUp && window.scrollY <= formHeight + 15) {
          setIsFixed(false); // 上にスクロールしていて、かつスクロール位置がヘッダーの高さ以下になった場合はfixedを解除
        }

        // 現在のスクロール位置を記録
        lastScrollY.current = window.scrollY;
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const placeholderStyle = useMemo<React.CSSProperties>(() => {
    return isFixed && initialFormHeight !== undefined
      ? { paddingTop: `${initialFormHeight + 15 }px` }
      : {};
  }, [isFixed, initialFormHeight]);

  const fixedStyle = useMemo<React.CSSProperties>(() => {
    return isFixed
      ? {
          position: "fixed",
          top: `15px`,
          width: formRef.current?.offsetWidth + "px",
          zIndex: 1000,
        }
      : {};
  }, [isFixed, formRef.current?.offsetWidth]);

  return { placeholderStyle, fixedStyle, formRef };
}

export default useScrollFixed;
