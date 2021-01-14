import { useState, useContext, useMemo, createContext } from 'react';
import { node } from 'prop-types';
import { useRouter } from 'next/router';

import useIdeaSolution from 'hooks/useIdeaSolution';
import { teamMap } from 'map/teamMap';

const GlobalFormContext = createContext();

export const GlobalFormProvider = ({ children }) => {
  const { query, pathname } = useRouter();
  const isEditIdea = pathname.includes('/idea/edit');
  const { data, error } = useIdeaSolution({
    url: `/ideas/${query.slug}/users`,
    isSkip: !isEditIdea,
  });
  const result = data?.result;
  const isLoading = !data && !error;
  const idea = (!isLoading && result[0]?.idea) || {};
  const teams = teamMap(result || []);

  const teacher = useMemo(() => {
    if (teams.length) {
      return teams.filter((member) => member.profileType === 'teacher');
    }
    return [];
  }, [teams]);

  const [inputs, setInputs] = useState({});

  if (isLoading && isEditIdea) {
    return null;
  }

  return (
    <GlobalFormContext.Provider
      value={{ inputs, setInputs, idea, teacher: teacher?.[0] || {} }}
    >
      {children}
    </GlobalFormContext.Provider>
  );
};

GlobalFormProvider.propTypes = {
  children: node.isRequired,
};

export const useGlobalFormContext = () => useContext(GlobalFormContext);
