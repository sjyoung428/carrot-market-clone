import { useState } from "react";

interface IMutation {
  loading: boolean;
  data?: object;
  error?: object;
}

const useMutation = (
  url: string
): [<T extends {}>(data: T) => void, IMutation] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  const mutation = async <T extends {}>(data: T) => {
    setLoading(true);
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
        setData(json);
      } catch (e) {}
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  return [mutation, { loading, data, error }];
};

export default useMutation;
