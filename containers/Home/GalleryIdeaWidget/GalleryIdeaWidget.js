import React, { useState } from 'react';

import SectionCardWrapper from 'components/SectionCardWrapper';
import IdeaCard from 'components/IdeaCard';
import useIdeaSolution from 'hooks/useIdeaSolution';
import BlockAccessModal from 'components/BlockAccessModal';

import WidgetLoader from '../WidgetLoader';

const GalleryIdeaWidget = () => {
  const { data, error } = useIdeaSolution({ url: '/ideas?offset=0&limit=9' });
  const result = data?.result?.data || [];
  const [showBlockAccess, setShowBlockAccess] = useState(false);
  const isLoading = !data && !error;

  const handleAuth = (param) => {
    setShowBlockAccess(param);
  };

  return (
    <>
      {isLoading && <WidgetLoader />}
      {!isLoading && result.length ? (
        <div className="pb-5">
          <SectionCardWrapper title="Galeri Ide Solusi" link="/idea">
            {result.map((idea) => {
              const {
                id,
                solutionName,
                solutionSupportingPhotos,
                solutionMission,
                totalLikes,
                totalComments,
              } = idea;
              return (
                <IdeaCard
                  key={id}
                  title={solutionName}
                  imageUrl={solutionSupportingPhotos?.[0]}
                  link={`/idea/${id}`}
                  description={solutionMission}
                  likeCount={totalLikes}
                  commentCount={totalComments}
                  onBlockAuth={() => handleAuth(true)}
                />
              );
            })}
          </SectionCardWrapper>
        </div>
      ) : (
        <></>
      )}
      {showBlockAccess && (
        <BlockAccessModal
          show={showBlockAccess}
          onHide={() => handleAuth(false)}
        />
      )}
    </>
  );
};

export default GalleryIdeaWidget;
