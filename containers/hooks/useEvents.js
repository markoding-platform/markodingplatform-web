import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useEvents = ({ url }) => {
  return useSWR(url, MarkodingFetch);
};

export default useEvents;
