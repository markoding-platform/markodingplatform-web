import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useDirectory = ({ url }) => {
  const { data: response, error } = useSWR(url, MarkodingFetch);
  const result = response?.result || {};
  const { data, pages = {} } = result;
  const dirs = data || [];
  const isLoading = !response && !error;
  return {
    data: dirs,
    pages,
    error,
    isLoading,
  };
};

export default useDirectory;
