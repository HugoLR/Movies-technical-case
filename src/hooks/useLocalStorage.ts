import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: unknown) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T), avoidStore = false) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined" && !avoidStore) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  return [storedValue, setValue];
}

export default useLocalStorage;
