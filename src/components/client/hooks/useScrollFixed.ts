import { useRef, useState, useEffect } from "react";

const useScrollFixed = (offsetTop = 15) => {
  const [isFixed, setIsFixed] = useState(false);
  const lastScrollY = useRef(0);
  const formRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const formTop = formRef.current ? formRef.current.offsetTop : 0;

      const scrollingDown = window.scrollY > lastScrollY.current;
      const shouldFix = window.scrollY >= formTop - offsetTop && scrollingDown;
      const shouldUnfix =
        window.scrollY < formTop - offsetTop && !scrollingDown;

      setIsFixed(shouldFix || shouldUnfix);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offsetTop]);

  return { isFixed, formRef };
};

export default useScrollFixed;
