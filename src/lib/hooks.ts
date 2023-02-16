import { useState, useRef, useCallback, useEffect } from "react";
export const useStateWithPromises = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const myResolveRef = useRef<any>(null);

  useEffect(() => {
    if (myResolveRef.current) {
      myResolveRef.current(state);
      myResolveRef.current = null;
    }
  }, [state]);

  const setStateWithPromises = useCallback(
    (newState: any) => {
      setState(newState);
      return new Promise((resolve) => (myResolveRef.current = resolve));
    },
    [setState]
  );

  return [state, setStateWithPromises];
};
