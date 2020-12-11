import range from 'utils/range';
import IdeaCard from 'components/IdeaCard';
import CardLoader from 'components/Shimmer/Card';

import FilterIdea from './Filter';
import SortIdea from './Sort';
import { ideasWrapper, ideaCardWrapper, cardLoader } from './style.module.scss';
import useIdeaSolution from './hooks/useIdeaSolution';

const defaultPic =
  'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg';

const IdeaAndSolutionContainer = () => {
  const { data = [], error } = useIdeaSolution({ url: '/ideas' });

  const renderLoader = () => {
    const loaderArr = [];
    range(1, 6).forEach((item) => {
      loaderArr.push(
        <div key={item} className={ideaCardWrapper}>
          <CardLoader className={cardLoader} />
        </div>
      );
    });
    return loaderArr;
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Galeri Ide Solusi</h2>
        <div className="d-flex">
          <SortIdea />
          <FilterIdea />
        </div>
      </div>
      <div className={ideasWrapper}>
        {data.length && !error
          ? data.map((idea) => {
              const {
                id,
                solutionName,
                solutionSupportingPhotos,
                solutionMission,
              } = idea;
              return (
                <div key={id} className={ideaCardWrapper}>
                  <IdeaCard
                    title={solutionName}
                    imageUrl={solutionSupportingPhotos?.[1] || defaultPic}
                    link={`/idea/${id}`}
                    description={solutionMission}
                  />
                </div>
              );
            })
          : renderLoader()}
      </div>
    </>
  );
};

IdeaAndSolutionContainer.propTypes = {};

export default IdeaAndSolutionContainer;
