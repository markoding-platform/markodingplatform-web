export default function skilvulAccountMap(data) {
  const { id, skilBadge, totalSkilBadge, totalSkilPoin } = data;
  return {
    id,
    badges: skilBadge,
    totalBadge: totalSkilBadge,
    totalPoint: totalSkilPoin,
  };
}
