export default function skilvulAccountMap(data) {
  const { id, skilBadge, totalSkilBadge, totalSkilPoin, email } = data || {};
  return {
    id,
    email,
    badges: skilBadge,
    totalBadge: totalSkilBadge || 0,
    totalPoint: totalSkilPoin || 0,
  };
}
