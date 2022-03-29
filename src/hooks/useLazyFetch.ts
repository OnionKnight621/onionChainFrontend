//TODO: refactor Fetch hooks, bear away duplicated code
import { useReducer, useRef } from "react";

interface State<T> {
  data?: T;
  loading?: boolean;
  error?: Error;
}

interface HookOpts {
  options?: any;
  useCache?: boolean;
  onSuccess?: any;
  onError?: any;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: "loading"; payload: boolean }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

type returnable<T> = [any, State<T>];

function useLazyFetch<T = unknown>(
  url?: string,
  hookOptions?: HookOpts
): returnable<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    loading: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, loading: action.payload };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  function lazyFetch(options?) {
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "loading", payload: true });

      // If a cache exists for this url, return it
      if (cache.current[url] && hookOptions?.useCache) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const opt = options || hookOptions?.options || undefined;
        const response = await fetch(url, opt);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: "loading", payload: false });
        dispatch({ type: "fetched", payload: data });

        if (hookOptions?.onSuccess) {
          hookOptions.onSuccess(response);
        }
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: "loading", payload: false });
        dispatch({ type: "error", payload: error as Error });

        if (hookOptions?.onError) {
          hookOptions.onError(error);
        }
      }
    };

    void fetchData();
  }

  return [lazyFetch, state];
}

export default useLazyFetch;
