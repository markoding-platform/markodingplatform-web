import { useState, useContext, createContext } from 'react';
import { node } from 'prop-types';
import { useRouter } from 'next/router';

import useIdeaSolution from 'hooks/useIdeaSolution';

const GlobalFormContext = createContext();

export const GlobalFormProvider = ({ children }) => {
  const { query, pathname } = useRouter();
  const isEditIdea = pathname.includes('/idea/edit');
  const { data, error } = useIdeaSolution({
    url: `/ideas/${query.slug}`,
    isSkip: !isEditIdea,
  });
  const isLoading = !data && !error;
  const idea = !isLoading ? data?.result : {};

  const [inputs, setInputs] = useState({});

  if (isLoading && isEditIdea) {
    return null;
  }

  return (
    <GlobalFormContext.Provider value={{ inputs, setInputs, idea }}>
      {children}
    </GlobalFormContext.Provider>
  );
};

GlobalFormProvider.propTypes = {
  children: node.isRequired,
};

export const useGlobalFormContext = () => useContext(GlobalFormContext);
