import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useElections() {
  const { data, error } = useSWR("/api/elections", fetcher);
  return {
    elections: data,
    isLoading: !error && !data,
    isError: error,
  };
}
