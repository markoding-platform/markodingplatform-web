import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useAnnouncementCount = () => {
  const { data: response } = useSWR('/announcements/count', MarkodingFetch);
  return response?.result || 0;
};

export default useAnnouncementCount;
