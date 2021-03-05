import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useDirectory = ({ url }) => {
  return useSWR(url, MarkodingFetch);
};

export default useDirectory;
