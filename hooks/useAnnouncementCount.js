import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useAnnouncementCount = () => {
  const { data: response } = useSWR('/announcements/count', MarkodingFetch);
  if (response && response.ok) {
    return response.result;
  }
  return 0;
};

export default useAnnouncementCount;
