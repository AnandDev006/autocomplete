import * as React from "react";

export function useSafeDispatch(dispatch: React.Dispatch<any>) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const safeDispatch = React.useCallback(
    (action: any) => (mounted.current ? dispatch(action) : void 0),
    [dispatch]
  );

  return safeDispatch;
}
