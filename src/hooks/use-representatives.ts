import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useRepresentatives() {
  const { data, error, mutate } = useSWR('/api/representatives', fetcher);

  return {
    representatives: data || [],
    isLoading: !error && !data,
    isError: error,
    mutateRepresentatives: mutate,
  };
}
