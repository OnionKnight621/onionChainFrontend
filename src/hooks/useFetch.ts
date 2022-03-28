import { useEffect, useReducer, useRef } from "react";

interface State<T> {
  data?: T;
  loading?: boolean;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: "loading"; payload: boolean }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

interface HookOpts {
  options?: RequestInit;
  onSuccess?: any;
  onError?: any;
}

function useFetch<T = unknown>(url?: string, hookOptions?: HookOpts): State<T> {
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

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "loading", payload: true });

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const opt = hookOptions?.options || undefined;
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

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
}

export default useFetch;
