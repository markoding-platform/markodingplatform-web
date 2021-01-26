import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useBlog = ({ url }) => {
  const { data: response, error } = useSWR(url, MarkodingFetch);
  const result = response?.result || {};
  const { data, pages = {} } = result;
  const blogs = data || [];
  const isLoading = !response && !error;
  return {
    data: blogs,
    pages,
    error,
    isLoading,
  };
};

export default useBlog;
