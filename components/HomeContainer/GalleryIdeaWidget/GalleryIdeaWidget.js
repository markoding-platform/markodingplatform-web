import React from 'react';

import range from 'utils/range';

import CardLoader from 'components/Shimmer/Card';
import SectionCardWrapper from 'components/SectionCardWrapper';
import IdeaCard from 'components/IdeaCard';
import useIdeaSolution from 'components/IdeaAndSolutionContainer/hooks/useIdeaSolution';

const defaultPic =
  'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg';

const GalleryIdeaWidget = () => {
  const { data = [], error } = useIdeaSolution({ url: '/ideas' });

  const renderLoader = () => {
    const loaderArr = [];
    range(1, 6).forEach((item) => {
      loaderArr.push(<CardLoader key={item} className="m-4" />);
    });
    return loaderArr;
  };

  return (
    <>
      <div className="pb-5">
        {data.length && !error ? (
          <SectionCardWrapper title="Galeri Ide Solusi" link="/idea">
            {data.map((idea) => {
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
                  imageUrl={solutionSupportingPhotos?.[1] || defaultPic}
                  link={`/idea/${id}`}
                  description={solutionMission}
                  likeCount={14}
                  commentCount={22}
                />
              );
            })}
          </SectionCardWrapper>
        ) : (
          renderLoader()
        )}
      </div>
    </>
  );
};

export default GalleryIdeaWidget;
