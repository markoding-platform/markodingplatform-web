import useSWR from 'swr';
import SkilvulFetch from 'libraries/SkilvulFetch';
import canUseDOM from 'utils/canUseDOM';
import getCookie from 'utils/getCookie';
import skilvulAccountMap from '../map/skilvulAccountMap';

const useMySkilvulAccount = () => {
  const userXID = canUseDOM && getCookie('userXID');
  const { data, error } = useSWR(
    `/api/skilvul?path=/users/${userXID}`,
    SkilvulFetch
  );
  const isLoading = !data && !error;
  if (!isLoading && data?.user) {
    return skilvulAccountMap(data.user);
  }
  return null;
};

export default useMySkilvulAccount;
