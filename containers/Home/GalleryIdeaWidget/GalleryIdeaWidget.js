import React from 'react';

import SectionCardWrapper from 'components/SectionCardWrapper';
import IdeaCard from 'components/IdeaCard';
import useIdeaSolution from 'components/IdeaAndSolutionContainer/hooks/useIdeaSolution';
import WidgetLoader from '../WidgetLoader';

const defaultPic =
  'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg';

const GalleryIdeaWidget = () => {
  const { data, error } = useIdeaSolution({ url: '/ideas' });
  const result = data?.result || [];
  const isLoading = !data && !error;

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
              } = idea;
              return (
                <IdeaCard
                  key={id}
                  title={solutionName}
                  imageUrl={solutionSupportingPhotos?.[0] || defaultPic}
                  link={`/idea/${id}`}
                  description={solutionMission}
                  likeCount={14}
                  commentCount={22}
                />
              );
            })}
          </SectionCardWrapper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default GalleryIdeaWidget;
