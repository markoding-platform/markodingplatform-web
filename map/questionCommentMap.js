import dayjs from 'dayjs';

dayjs.locale('id');

export default function questionMap(data) {
  const { id, content, updatedAt, user } = data;
  return {
    id,
    avatarUrl: user?.image || '/assets/avatar-min.png',
    payload: {
      text: content,
    },
    userId: user?.id || null,
    name: user?.name || '-',
    time: dayjs(updatedAt).format('dddd, DD MMM YYYY'),
  };
}
