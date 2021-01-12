import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useDirectory = ({ path }) => {
  return useSWR(path, MarkodingFetch);
};

export default useDirectory;
