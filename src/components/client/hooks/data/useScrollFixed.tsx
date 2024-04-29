import { useEffect, useRef, useState, useMemo, useCallback } from "react";

function useBtnClickFixed() {
  const [isFixed, setIsFixed] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [initialFormHeight, setInitialFormHeight] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    if (formRef.current) {
      setInitialFormHeight(formRef.current.offsetHeight);
    }
  }, []);

  const setFixed = useCallback((fixed: boolean) => {
    setIsFixed(fixed);
  }, []);

  const placeholderStyle = useMemo(() => {
    return isFixed && initialFormHeight !== undefined
      ? { height: `${initialFormHeight}px` }
      : {};
  }, [isFixed, initialFormHeight]);

  const fixedStyle = useMemo<React.CSSProperties>(() => {
    return isFixed
      ? {
          position: "fixed",
          top: "15px",
          width: formRef.current?.offsetWidth + "px",
          zIndex: 1000, // Ensure it's above other content
        }
      : {};
  }, [isFixed, formRef.current?.offsetWidth]);

  return { placeholderStyle, fixedStyle, formRef, setFixed };
}

export default useBtnClickFixed;
