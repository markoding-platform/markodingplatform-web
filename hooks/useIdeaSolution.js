import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useIdeaSolution = ({ url, isSkip = false }) => {
  return useSWR(!isSkip ? url : null, MarkodingFetch);
};

export default useIdeaSolution;
