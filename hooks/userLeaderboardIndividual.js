import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';
import leaderboardIndividualMap from 'map/leaderboardIndividualMap';

const useLeaderboards = ({ url }) => {
  const { data: response } = useSWR(url, MarkodingFetch);
  const result = response?.result || {};
  const error = result?.error;

  const isLoading = !response && error;

  const individuals =
    (!isLoading && result && leaderboardIndividualMap(result)) || {};
  return {
    data: individuals,
    error,
    isLoading,
  };
};

export default useLeaderboards;
