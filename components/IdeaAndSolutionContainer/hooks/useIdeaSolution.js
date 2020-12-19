import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useIdeaSolution = ({ url }) => {
  return useSWR(url, MarkodingFetch);
};

export default useIdeaSolution;
