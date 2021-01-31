export default function skilvulAccountMap(data) {
  const { id, skilBadge, totalSkilBadge, totalSkilPoin } = data || {};
  return {
    id,
    badges: skilBadge,
    totalBadge: totalSkilBadge || 0,
    totalPoint: totalSkilPoin || 0,
  };
}
