import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export interface MaximizerProps {
  children: (props: {
    ref: RefObject<HTMLDivElement | null>;
    isMaximized: boolean;
    toggleMaximize: VoidFunction;
  }) => React.ReactNode;
}
export const Maximizer = ({ children }: MaximizerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMaximized, setMaximized] = useState(false);

  const toggleMaximize = useCallback(() => setMaximized(prev => !prev), []);
  useEffect(() => {
    if (isMaximized) {
      ref.current?.classList.add("maximized");
    } else {
      ref.current?.classList.remove("maximized");
    }
  }, [isMaximized]);

  return children({
    ref,
    isMaximized,
    toggleMaximize,
  });
};
