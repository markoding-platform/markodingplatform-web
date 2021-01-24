import dayjs from 'dayjs';

dayjs.locale('id');

export default function questionMap(data) {
  const { id, content, updatedAt, user, comments, likes, channel } = data;
  return {
    id,
    imageUrl: user?.image || '/assets/avatar-min.png',
    comment: content,
    userId: user?.id || null,
    name: user?.name || '-',
    time: dayjs(updatedAt).format('dddd, DD MMM YYYY'),
    commentCount: +comments,
    likeCount: +likes,
    channelSlug: channel?.id || null,
  };
}
