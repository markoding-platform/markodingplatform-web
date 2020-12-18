import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useAnnouncement = () => {
  return useSWR('/announcements', MarkodingFetch);
};

export default useAnnouncement;
