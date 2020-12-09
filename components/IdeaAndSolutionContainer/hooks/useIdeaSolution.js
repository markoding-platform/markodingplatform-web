import useSWR from 'swr';

const BASE_URL = 'https://api.markoding.com';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useIdeaSolution = ({ url }) => {
  return useSWR(`${BASE_URL}${url}`, fetcher);
};

export default useIdeaSolution;
