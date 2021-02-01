import move from 'array-move';

const getPodium = (data) => {
  const firstPos = 0;
  const secondPos = 1;

  const res = move(data, firstPos, secondPos);
  return res.slice(0, 3);
};

const transformLeaderboard = (data, startPosition = 1) => {
  if (!data) return [];
  return data.map((item, idx) => ({
    id: idx,
    avatarUrl: item.solutionSupportingPhotos?.[0] || '',
    name: item.solutionName,
    points: item.liked,
    position: idx + startPosition,
  }));
};
const leaderboardMap = (data) => {
  if (!data.length) return {};
  const rest = [...data];
  const restPodium = rest.slice(3);
  const podium = getPodium(rest);

  return {
    podium: transformLeaderboard(podium),
    restPodium: transformLeaderboard(restPodium, 4),
  };
};
export default leaderboardMap;
