import * as React from "react";

export const useDebounce = (callback: CallableFunction, delay: number) => {
  const timeoutRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // @ts-ignore
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};
