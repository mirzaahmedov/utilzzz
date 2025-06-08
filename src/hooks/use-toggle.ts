import { useCallback, useState } from "react";

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState(state => !state), []);
  const open = useCallback(() => setState(true), []);
  const close = useCallback(() => setState(false), []);

  return { state, toggle, open, close } as const;
};
