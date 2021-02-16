import dayjs from 'dayjs';
import Avatar from 'svgs/avatar.svg';

dayjs.locale('id');

export default function chatMap(data) {
  const { id, content, type, updatedAt, user } = data;
  return {
    id,
    avatarUrl: user?.imageUrl || Avatar,
    name: user?.name || '-',
    time: dayjs(updatedAt).format('DD MMM YYYY, HH:mm:ss'),
    payload: {
      text: type && type.trim() === 'text' ? content : null,
      image: type && type.trim() === 'image' ? content : null,
    },
    sender: user?.id,
  };
}
