import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';
import navItems from 'components/NavMenu/navItems';

const useNavItem = () => {
  const menus = navItems;
  const { data } = useSWR('/channels', MarkodingFetch);
  if (data && data.ok && data.result) {
    menus[
      menus.map((m, i) => [i, m]).filter((m) => m[1].id === 7)[0][0]
    ].children = [
      ...data.result.map((c) => {
        return {
          id: c.id,
          text: `#${c.name}`,
          link: `/question/${c.id}`,
          withBadge: false,
        };
      }),
    ];
  }
  return menus;
};

export default useNavItem;
