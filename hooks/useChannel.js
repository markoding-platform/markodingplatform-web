import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useChannels = ({ url }) => {
  return useSWR(url, MarkodingFetch);
};

export default useChannels;
