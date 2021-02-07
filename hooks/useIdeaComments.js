import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useIdeaComments = ({ url, isSkip = false }) => {
  const { data: response } = useSWR(!isSkip ? url : null, MarkodingFetch);
  const result = response?.result || {};
  const { data = [], pages = {} } = result;
  const error = result?.error;
  const isLoading = !response && error;

  return {
    data,
    pages,
    error,
    isLoading,
  };
};

export default useIdeaComments;
