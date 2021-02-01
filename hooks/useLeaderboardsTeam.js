import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';
import leaderboardMap from 'map/leaderboardMap';

const useLeaderboards = ({ url }) => {
  const { data: response } = useSWR(url, MarkodingFetch);
  const result = response?.result || {};
  const { data, pages = {} } = result;
  const error = result?.error;

  const isLoading = !response && error;

  const teams = (!isLoading && data && leaderboardMap(data)) || {};
  return {
    data: teams,
    pages,
    error,
    isLoading,
  };
};

export default useLeaderboards;
