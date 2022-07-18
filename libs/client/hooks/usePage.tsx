import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

interface SWRResponse<T> {
  ok: boolean;
  items: T[];
}

const usePage = <T,>(apiUrl: string) => {
  const [page, setPage] = useState(1);
  const [mergeData, setMergeData] = useState<T[]>([]);
  const { data } = useSWR<SWRResponse<T>>(`${apiUrl}?page=${page}`);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setPage, page]);

  const router = useRouter();
  const goback = apiUrl.slice(4);
  useEffect(() => {
    if (data) setMergeData((prev) => prev?.concat(data?.items));
  }, [data]);
  useEffect(() => {
    if (data?.ok === false) {
      router.push(`${goback}`);
    }
  }, [data, router, goback]);

  return mergeData;
};

export default usePage;

//element.scrollHeight - element.scrollTop === element.clientHeight => true: 요소를 끝까지 스크롤 한 경우
