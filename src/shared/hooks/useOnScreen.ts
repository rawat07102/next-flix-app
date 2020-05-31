import { MutableRefObject, useEffect, useState } from "react";

export function useOnScreen(
  ref: MutableRefObject<Element | null>,
  rootMargin = "0px"
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.unobserve(ref.current!);
    };
  }, []);

  return isIntersecting;
}
