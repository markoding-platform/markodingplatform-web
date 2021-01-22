import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import range from 'utils/range';

import IdeaCard from 'components/IdeaCard';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import CardLoader from 'components/Shimmer/Card';
import Pagination from 'components/Pagination';
import SortComponent from 'components/Sort';
import FilterIdea from 'components/Filter';
import useIdeaSolution from 'hooks/useIdeaSolution';
import emptyFolderSvg from 'svgs/empty-folder.svg';

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
  const [activeSort, setActiveSort] = useState('');
  const SORT_IDEA = [
    {
      id: 0,
      name: 'Sortir berdasarkan A-Z',
      value: 'solutionName',
    },
    {
      id: 1,
      name: 'Sortir berdasarkan Z-A',
      value: '-solutionName',
    },
  ];

  const FILTER_IDEA = [
    {
      id: 0,
      name: 'Berdasarkan bidang masalah',
      value: 'problemArea',
    },
    {
      id: 1,
      name: 'Berdasarkan tipe solusi',
      value: 'solutionType',
    },
  ];

  const { data: response, error } = useIdeaSolution({
    url: `/ideas?offset=${currentOffset}&limit=${LIMIT_PER_PAGE}&sort=${activeSort}`,
  });
  const result = response?.result || {};
  const { data, pages = {} } = result || {};
  const ideas = data || [];

  const isLoading = !response && !error;

  const handlePageChanged = useCallback(
    (page) => {
      const offset = LIMIT_PER_PAGE * page - LIMIT_PER_PAGE;
      router.replace(`/idea?page=${page}&start=${offset}`);
    },
    [router]
  );

  const handleClicSort = useCallback((sort = {}) => {
    setActiveSort(sort.value);
  }, []);

  const handleClickFilter = useCallback((filter) => {
    console.log(filter, filter);
  }, []);

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

  if (isLoading) {
    return <div className={ideasWrapper}>{renderLoader()}</div>;
  }
  return (
    <>
      <ScrollToTop />
      <div className="d-flex justify-content-between">
        <h2>Galeri Ide Solusi</h2>
        <div className="d-flex">
          <SortComponent
            sortItems={SORT_IDEA}
            onClickSortItem={handleClicSort}
          />
          <FilterIdea
            filterItems={FILTER_IDEA}
            onClickFilterItem={handleClickFilter}
          />
        </div>
      </div>

      {!isLoading && ideas.length > 0 && !error && (
        <>
          <div className={ideasWrapper}>
            {ideas.map((idea) => {
              const {
                id,
                solutionName,
                solutionSupportingPhotos,
                solutionMission,
                totalLikes,
                totalComments,
              } = idea;
              return (
                <div key={id} className={ideaCardWrapper}>
                  <IdeaCard
                    title={solutionName}
                    imageUrl={solutionSupportingPhotos?.[0] || defaultPic}
                    link={`/idea/${id}`}
                    description={solutionMission}
                    likeCount={totalLikes}
                    commentCount={totalComments}
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
