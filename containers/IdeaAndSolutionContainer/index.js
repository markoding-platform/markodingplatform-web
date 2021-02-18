import { useCallback, useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import range from 'utils/range';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import BlockAccessModal from 'components/BlockAccessModal';
import IdeaCard from 'components/IdeaCard';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import CardLoader from 'components/Shimmer/Card';
import Pagination from 'components/Pagination';
import SortComponent from 'components/Sort';
import FilterIdea from 'components/Filter';
import useIdeaSolution from 'hooks/useIdeaSolution';
import emptyFolderSvg from 'svgs/empty-folder.svg';
import useProblemArea from 'hooks/useProblemArea';

import {
  ideaCardWrapper,
  cardLoader,
  emptyIdeasWrapper,
} from './style.module.scss';

import { LIMIT_PER_PAGE } from './constant';

const IdeaAndSolutionContainer = () => {
  const router = useRouter();
  const { query } = router;
  const currentOffset = Number(query?.start) || 0;
  const currentPage = Number(query?.page) || 1;
  const [activeSort, setActiveSort] = useState('');
  const [showBlockAccess, setShowBlockAccess] = useState(false);

  const { data: problemAreas } = useProblemArea({
    url: '/ideas/problem-area',
  });

  const [activeFilter, setActiveFilter] = useState({
    id: null,
    value: null,
    name: '',
  });

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
      id: 1,
      name: 'Berdasarkan tipe solusi digital Web',
      value: 'web',
    },
    {
      id: 2,
      name: 'Berdasarkan tipe solusi digital Mobile',
      value: 'mobile',
    },
    {
      id: 3,
      name: 'Berdasarkan tipe solusi digital Game',
      value: 'game',
    },
    ...problemAreas,
  ];
  const queryFilter = useMemo(() => {
    if (!activeFilter.id) return '';
    if (activeFilter.name.includes('tipe solusi')) {
      return `&solutionType=${activeFilter.value}`;
    }

    return `&problemAreaId=${activeFilter.id}`;
  }, [activeFilter]);

  const { data: response, error } = useIdeaSolution({
    url: `/ideas?offset=${currentOffset}&limit=${LIMIT_PER_PAGE}&sort=${activeSort}${queryFilter}`,
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

  const handleClickFilter = useCallback(
    (filter) => {
      if (currentOffset > 0 || currentPage > 1) {
        router.replace(`/idea`);
      }
      setActiveFilter(filter);
    },
    [currentOffset, currentPage, router]
  );

  const renderLoader = () => {
    const loaderArr = [];
    range(1, 9).forEach((item) => {
      loaderArr.push(
        <Col key={item} xs={6} lg={4}>
          <CardLoader className={cardLoader} />
        </Col>
      );
    });
    return loaderArr;
  };

  const handleAuth = useCallback((param) => {
    setShowBlockAccess(param);
  }, []);

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
      <Row className="mt-4">
        {isLoading && renderLoader()}
        {!isLoading && ideas.length > 0 && !error && (
          <>
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
                <Col key={id} xs={6} lg={4}>
                  <div className={ideaCardWrapper}>
                    <IdeaCard
                      title={solutionName}
                      imageUrl={solutionSupportingPhotos?.[0] || ''}
                      link={`/idea/${id}`}
                      description={solutionMission}
                      likeCount={totalLikes}
                      commentCount={totalComments}
                      onBlockAuth={() => handleAuth(true)}
                    />
                  </div>
                </Col>
              );
            })}
          </>
        )}
      </Row>
      {!isLoading && ideas.length > 0 && !error && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            totalRecords={pages.count}
            totalPages={pages.totalPages}
            pageLimit={LIMIT_PER_PAGE}
            onPageChanged={handlePageChanged}
            defaultPage={currentPage}
          />
        </div>
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
      {showBlockAccess && (
        <BlockAccessModal
          show={showBlockAccess}
          onHide={() => handleAuth(false)}
        />
      )}
    </>
  );
};

IdeaAndSolutionContainer.propTypes = {};

export default IdeaAndSolutionContainer;
