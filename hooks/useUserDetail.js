import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';
import userMap from 'map/userMap';

const useUserDetail = ({ url, isSkip }) => {
  const { data: response } = useSWR(!isSkip ? url : null, MarkodingFetch);
  const result = response?.result || {};
  const error = result?.error;

  const isLoading = !response && error;

  const user = (!isLoading && response?.ok && userMap(result)) || {};
  return {
    data: user,
    error,
    isLoading,
  };
};

export default useUserDetail;
