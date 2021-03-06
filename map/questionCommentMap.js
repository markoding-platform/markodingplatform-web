import dayjs from 'dayjs';
import Avatar from 'svgs/avatar.svg';

dayjs.locale('id');

export default function questionMap(data) {
  const { id, content, updatedAt, user } = data;
  return {
    id,
    avatarUrl: user?.imageUrl || Avatar,
    payload: {
      text: content,
    },
    userId: user?.id || null,
    name: user?.name || '-',
    time: dayjs(updatedAt).format('dddd, DD MMM YYYY'),
  };
}
