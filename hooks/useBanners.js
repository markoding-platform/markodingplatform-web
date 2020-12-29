import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useBanners = ({ url }) => {
  return useSWR(url, MarkodingFetch);
};

export default useBanners;
