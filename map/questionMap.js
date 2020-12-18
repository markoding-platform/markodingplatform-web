import dayjs from 'dayjs';

dayjs.locale('id');

export default function questionMap(data) {
  const { id, channelId, content, updatedAt, user, comments, likes } = data;
  return {
    id,
    imageUrl: user?.image || '/assets/avatar-min.png',
    comment: content,
    name: user?.name || '-',
    time: dayjs(updatedAt).format('dddd, DD MMM YYYY'),
    commentCount: +comments,
    likeCount: +likes,
    channelSlug: channelId,
  };
}
