import { useState, useRef, useCallback, useEffect } from "react";
export const useStateWithPromises = <T>(
  initialState: T
): [T, (newState: T) => Promise<unknown>] => {
  const [state, setState] = useState<T>(initialState);
  const myResolveRef = useRef<any>(null);

  useEffect(() => {
    if (myResolveRef.current) {
      myResolveRef.current(state);
      myResolveRef.current = null;
    }
  }, [state]);

  const setStateWithPromises = useCallback(
    (newState: T) => {
      setState(newState);
      return new Promise((resolve) => (myResolveRef.current = resolve));
    },
    [setState]
  );

  return [state, setStateWithPromises];
};
