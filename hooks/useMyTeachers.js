import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';
import teachersMap from 'map/teachersMap';

const useMyTeachers = ({ url }) => {
  const { data, error } = useSWR(url, MarkodingFetch);
  const isLoading = !data && !error;
  const teachers = (!isLoading && teachersMap(data.result)) || [];
  return {
    data: teachers,
    error,
    isLoading,
  };
};

export default useMyTeachers;
