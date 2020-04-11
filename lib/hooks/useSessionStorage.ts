import React from "react";

const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    if (typeof window !== "undefined") {
      const item = window.sessionStorage.getItem(key);
      return !!item ? JSON.parse(item) : initialValue;
    } else {
      return initialValue;
    }
  });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
