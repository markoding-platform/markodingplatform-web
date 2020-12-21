import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useBlog = ({ url }) => {
  const { data, error } = useSWR(url, MarkodingFetch);
  const isLoading = !data && !error;
  return {
    data,
    error,
    isLoading,
  };
};

export default useBlog;
