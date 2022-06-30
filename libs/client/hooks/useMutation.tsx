import { useState } from "react";

interface IMutation<T> {
  loading: boolean;
  data?: T;
  error?: any;
}

type UseMutationResult<T> = [(data: any) => void, IMutation<T>];

const useMutation = <T extends any>(url: string): UseMutationResult<T> => {
  // const [loading, setLoading] = useState(false);

  const [state, setState] = useState<IMutation<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  // const [data, setData] = useState<undefined | T>(undefined);
  // const [error, setError] = useState<undefined | any>(undefined);
  const mutation = async <T extends {}>(data: T) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const fetchData = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      try {
        const json = await fetchData.json();
        setState((prev) => ({ ...prev, data: json }));
      } catch (error) {}
    } catch (error) {
      setState((prev) => ({ ...prev, error }));
    }
    setState((prev) => ({ ...prev, loading: false }));
  };

  return [mutation, { ...state }];
};

export default useMutation;
