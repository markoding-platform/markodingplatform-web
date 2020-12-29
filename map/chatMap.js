import dayjs from 'dayjs';

dayjs.locale('id');

export default function chatMap(data) {
  const { id, content, type, updatedAt, user } = data;
  return {
    id,
    avatarUrl: user?.image || '/assets/avatar-min.png',
    name: user?.name || '-',
    time: dayjs(updatedAt).format('DD MMM YYYY, HH:mm:ss'),
    payload: {
      text: type && type.trim() === 'text' ? content : null,
      image: type && type.trim() === 'image' ? content : null,
    },
    sender: user?.id,
  };
}
