import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useEvents from 'hooks/useEvents';
import range from 'utils/range';
import CardLoader from 'components/Shimmer/Card';
import EventCard from 'components/EventCard';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import Pagination from 'components/Pagination';
import SortComponent from 'components/Sort';
import { eventGrid } from './styles.module.scss';

const View = () => {
  const SORT_EVENT = [
    {
      id: 0,
      name: 'Sortir berdasarkan A-Z',
      value: 'title',
    },
    {
      id: 1,
      name: 'Sortir berdasarkan Z-A',
      value: '-title',
    },
  ];

  const router = useRouter();
  const { query } = router;
  const limit = 9;
  const currentOffset = Number(query?.start) || 0;
  const currentPage = Number(query?.page) || 1;
  const [activeSort, setActiveSort] = useState('');

  const { data: response, error } = useEvents({
    url: `/events?limit=${limit}&offset=${currentOffset}&sort=${activeSort}`,
  });
  const result = response?.result || {};
  const { data, pages = {} } = result;
  const events = data || [];

  const isLoading = !response && !error;

  const renderLoader = () => {
    const loaderArr = [];
    range(1, 6).forEach((item) => {
      loaderArr.push(
        <div key={item} className="w-100">
          <CardLoader className="m-1" />
        </div>
      );
    });
    return loaderArr;
  };

  const handlePageChanged = useCallback(
    (page) => {
      const offset = limit * page - limit;
      router.replace(`/event/?page=${page}&start=${offset}`);
    },
    [router]
  );

  const handleClickSort = useCallback((sort = {}) => {
    setActiveSort(sort.value);
  }, []);

  return (
    <div className="inner-section">
      <div className="d-flex align-items-center  justify-content-between mb-4">
        <h1 className="h3">Event Terdekat</h1>
        <div className="d-flex">
          <SortComponent
            sortItems={SORT_EVENT}
            onClickSortItem={handleClickSort}
          />
        </div>
      </div>
      <Row>
        {isLoading && renderLoader()}
        {!isLoading && events.length > 0 && !error ? (
          events.map((event) => (
            <Col key={event.id} xs={6} lg={4}>
              <div className={eventGrid}>
                <EventCard
                  key={event.id}
                  imageUrl={event.imageUrl}
                  title={event.title}
                  startDate={event.startDate}
                  finishDate={event.finishDate}
                  startAt={event.startAt}
                  finishAt={event.finishAt}
                  link={`/event/${event.id}`}
                />
              </div>
            </Col>
          ))
        ) : (
          <></>
        )}
      </Row>
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          totalRecords={pages.count}
          totalPages={pages.totalPages}
          pageLimit={limit}
          onPageChanged={handlePageChanged}
          defaultPage={currentPage}
        />
      </div>
    </div>
  );
};

export default View;
