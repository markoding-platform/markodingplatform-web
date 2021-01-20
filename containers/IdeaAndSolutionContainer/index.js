import { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import range from 'utils/range';

import IdeaCard from 'components/IdeaCard';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import CardLoader from 'components/Shimmer/Card';
import Pagination from 'components/Pagination';
import useIdeaSolution from 'hooks/useIdeaSolution';
import emptyFolderSvg from 'svgs/empty-folder.svg';
import FilterIdea from './Filter';
import SortIdea from './Sort';
import {
  ideasWrapper,
  ideaCardWrapper,
  cardLoader,
  emptyIdeasWrapper,
} from './style.module.scss';

import { LIMIT_PER_PAGE } from './constant';

const defaultPic =
  'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg';

const IdeaAndSolutionContainer = () => {
  const router = useRouter();
  const { query } = router;
  const currentOffset = Number(query?.start) || 0;
  const currentPage = Number(query?.page) || 1;

  const { data: response, error } = useIdeaSolution({
    url: `/ideas?offset=${currentOffset}&limit=${LIMIT_PER_PAGE}`,
  });
  const result = response?.result || {};
  const { data: ideas, pages = {} } = result;

  const isLoading = !response && !error;

  const handlePageChanged = useCallback(
    (page) => {
      const offset = LIMIT_PER_PAGE * page - LIMIT_PER_PAGE;
      router.replace(`/idea?page=${page}&start=${offset}`);
    },
    [router]
  );

  const renderLoader = () => {
    const loaderArr = [];
    range(1, 9).forEach((item) => {
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
      <ScrollToTop />
      <div className="d-flex justify-content-between">
        <h2>Galeri Ide Solusi</h2>
        <div className="d-flex">
          <SortIdea />
          <FilterIdea />
        </div>
      </div>

      {isLoading && <div className={ideasWrapper}>{renderLoader()}</div>}
      {!isLoading && ideas.length > 0 && !error && (
        <>
          <div className={ideasWrapper}>
            {ideas.map((idea) => {
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
                    imageUrl={solutionSupportingPhotos?.[0] || defaultPic}
                    link={`/idea/${id}`}
                    description={solutionMission}
                  />
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              totalRecords={pages.count}
              totalPages={pages.totalPages}
              pageLimit={LIMIT_PER_PAGE}
              onPageChanged={handlePageChanged}
              defaultPage={currentPage}
            />
          </div>
        </>
      )}
      {!isLoading && ideas.length === 0 && (
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
