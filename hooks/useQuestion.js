import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useQuestion = ({ url }) => {
  return useSWR(url, MarkodingFetch);
};

export default useQuestion;
