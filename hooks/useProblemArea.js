import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';
import { problemAreaMap } from 'map/problemAreaMap';

const useProblemArea = ({ url }) => {
  const { data = {}, error } = useSWR(url, MarkodingFetch);
  const isLoading = !data && !error;
  const problemAreas = !isLoading ? data.result : [];
  const normalizeProblemArea = problemAreaMap(problemAreas) || [];

  return {
    data: normalizeProblemArea,
    error,
    isLoading,
  };
};

export default useProblemArea;
