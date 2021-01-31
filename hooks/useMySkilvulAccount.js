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

const useMySkilvulAccount = () => {
  const userXID = canUseDOM && getCookie('userXID');
  const { data, error } = useSWR(
    `/api/skilvul?path=/users/${userXID}`,
    SkilvulFetch
  );
  const isLoading = !data && !error;
  if (!isLoading && data?.user) {
    const skilvulAccount = skilvulAccountMap(data.user);
    updateSkilPoint(skilvulAccount.totalPoint); // kalo sudah ada api badges penggunaan ini harus diubah
    return skilvulAccount;
  }
  return null;
};

export default useMySkilvulAccount;
