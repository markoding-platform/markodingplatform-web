import useSWR from 'swr';
import SkilvulFetch from 'libraries/SkilvulFetch';
import canUseDOM from 'utils/canUseDOM';
import getCookie from 'utils/getCookie';
import MarkodingFetch from 'libraries/MarkodingFetch';
import skilvulAccountMap from '../map/skilvulAccountMap';

const updateSkilPoint = async (point) => {
  const res = await MarkodingFetch('/users/skilvul-point', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      skilvulPoint: point,
    }),
  });
  return res;
};

const useMySkilvulAccount = async () => {
  const userXID = canUseDOM && getCookie('userXID');
  const { data, error } = useSWR(
    `/api/skilvul?path=/users/${userXID}`,
    SkilvulFetch
  );
  const isLoading = !data && !error;
  if (!isLoading && data?.user) {
    const skilvulAccount = await skilvulAccountMap(data.user);
    const res = await updateSkilPoint(skilvulAccount.totalPoint);
    if (res && res.result) {
      skilvulAccount.totalPoint += res.result.markodingPoint;
    }
    return skilvulAccount;
  }
  return null;
};

export default useMySkilvulAccount;
