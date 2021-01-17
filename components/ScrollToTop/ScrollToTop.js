import { useEffect } from 'react';
import canUseDOM from 'utils/canUseDOM';

const ScrollToTop = () => {
  useEffect(() => {
    if (canUseDOM) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  });
  return <></>;
};

export default ScrollToTop;
