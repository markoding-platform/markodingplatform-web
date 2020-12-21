import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useEvents from 'hooks/useEvents';
import range from 'utils/range';
import CardLoader from 'components/Shimmer/Card';
import EventCard from 'components/EventCard';
import { eventGrid } from './styles.module.scss';

const View = () => {
  const { data, error } = useEvents({ url: '/events' });
  const result = data?.result || [];
  const isLoading = !result && !error;

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

  return (
    <div className="inner-section">
      <div className="d-flex align-items-center mb-4">
        <h1 className="h3">Event Terdekat</h1>
      </div>
      <Row>
        {isLoading && renderLoader()}
        {!isLoading && result.length && !error ? (
          result.map((event) => (
            <Col key={event.id} xs={6} lg={4}>
              <div className={eventGrid}>
                <EventCard
                  key={event.id}
                  imageUrl="https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg"
                  title={event.title}
                  date={event.date}
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
    </div>
  );
};

export default View;
