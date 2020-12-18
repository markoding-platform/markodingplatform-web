import dayjs from 'dayjs';

dayjs.locale('id');

export default function questionMap(data) {
  const { id, channelId, question, updatedAt, user } = data;
  return {
    id,
    imageUrl: user?.image || '/assets/avatar-min.png',
    comment: question,
    name: user?.name || '-',
    time: dayjs(updatedAt).format('dddd, DD MMM YYYY'),
    commentCount: 0,
    likeCount: 0,
    channelSlug: channelId,
  };
}
