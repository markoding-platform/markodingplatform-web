import { useState, useContext, useMemo, createContext } from 'react';
import { node } from 'prop-types';
import { useRouter } from 'next/router';

import useIdeaSolution from 'hooks/useIdeaSolution';
import { teamMap } from 'map/teamMap';

const IdeaFormContext = createContext();

export const IdeaFormProvider = ({ children }) => {
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

  const teamMember = useMemo(() => {
    if (teams.length) {
      return teams.filter((member) => member.profileType === 'student');
    }
    return [];
  }, [teams]);

  // const existingTeamMember = useMemo(() => {
  //   if (teams.length) {
  //     const existingTeam = teams.reduce((existingIds, member) => {
  //       if (member.isLeader && member.profileType === 'student') {
  //         existingIds.push(member.userId);
  //       }
  //       return existingIds;
  //     }, []);
  //     return existingTeam;
  //   }
  //   return [];
  // }, [teams]);

  const [inputs, setInputs] = useState({
    ideaSolution: {},
    teamIds: [],
  });

  if (isLoading && isEditIdea) {
    return null;
  }

  return (
    <IdeaFormContext.Provider
      value={{
        inputs,
        setInputs,
        idea,
        teacher: teacher?.[0] || {},
        teamMember,
      }}
    >
      {children}
    </IdeaFormContext.Provider>
  );
};

IdeaFormProvider.propTypes = {
  children: node.isRequired,
};

export const useIdeaFormContext = () => useContext(IdeaFormContext);
