import { useEffect } from 'react';
import { func } from 'prop-types';
// eslint-disable-next-line react/display-name
const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

useOutsideClick.propTypes = {
  callback: func.isRequired,
};
export default useOutsideClick;
