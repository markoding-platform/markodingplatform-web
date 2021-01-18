import useSWR from 'swr';
import SkilvulFetch from 'libraries/SkilvulFetch';
import courseMap from 'map/courseMap';

const useCourse = ({ url }) => {
  const { data: courseRes, error } = useSWR(url, SkilvulFetch);
  const isLoading = !courseRes && !error;
  return {
    courses:
      courseRes && courseRes.products ? courseRes.products.map(courseMap) : [],
    error,
    isLoading,
  };
};

export default useCourse;
