import { useCallback, useRef } from "react";

const useDebounce = (
  callback: (filter: string, value: string) => void,
  delay: number,
) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (filterName: string, value: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        callback(filterName, value);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedFunction;
};

export default useDebounce;
