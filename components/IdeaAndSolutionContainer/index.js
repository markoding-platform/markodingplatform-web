import Image from 'next/image';
import range from 'utils/range';
import IdeaCard from 'components/IdeaCard';
import CardLoader from 'components/Shimmer/Card';

import emptyFolderSvg from 'svgs/empty-folder.svg';
import FilterIdea from './Filter';
import SortIdea from './Sort';
import {
  ideasWrapper,
  ideaCardWrapper,
  cardLoader,
  emptyIdeasWrapper,
} from './style.module.scss';
import useIdeaSolution from './hooks/useIdeaSolution';

const defaultPic =
  'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg';

const IdeaAndSolutionContainer = () => {
  const { data, error } = useIdeaSolution({ url: '/ideas' });
  const result = data?.result || [];

  const isLoading = !data && !error;

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
        {isLoading && renderLoader()}
        {!isLoading &&
          result.length > 0 &&
          !error &&
          result.map((idea) => {
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
          })}
      </div>
      {!isLoading && result.length === 0 && (
        <>
          <div className={emptyIdeasWrapper}>
            <Image
              src={emptyFolderSvg}
              height="209"
              width="209"
              alt="empty-folder"
              layout="fixed"
            />
            <h3 className="text-center pt-4">Belum Ada Ide Solusi</h3>
            <p className="text-center text-3rd">
              Data yang kamu inputkan belum terdaftar di sistem kami
            </p>
          </div>
        </>
      )}
    </>
  );
};

IdeaAndSolutionContainer.propTypes = {};

export default IdeaAndSolutionContainer;
