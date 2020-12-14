import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import { BsCalendarFill, BsClockFill } from 'react-icons/bs';

import styles from 'styles/event.module.scss';
import useEvents from 'containers/hooks/useEvents';
import EventLoader from './Loader';

dayjs.locale('id');

const EventDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useEvents({ url: `/events/${slug}` });
  // TODO: handle not found slug
  const event = data?.result || {};

  const isLoading = !data && !error;
  if (isLoading) {
    return <EventLoader />;
  }

  return (
    <>
      <div className="mb-4">
        <h1 className="h3">Event Terdekat</h1>
      </div>
      <div>
        <Image
          src={
            event.src ||
            'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg'
          }
          alt={event.title}
          layout="responsive"
          width={957}
          height={457}
          className="rounded"
        />
        <h1 className="h3 mt-4">{event.title}</h1>
        <div className="d-flex align-items-center">
          <p className={styles.dateTime}>
            <BsCalendarFill />
            <span>{dayjs(event.date).format('dddd, DD MMM YYYY')}</span>
          </p>
          <p className={styles.dateTime}>
            <BsClockFill />
            <div className="d-flex">
              <span className="pr-2">{event.startAt}</span>
              <span>{event.finishAt}</span>
            </div>
          </p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: event.description }} />
      </div>
      <div className={styles.eventFooter}>
        <Button type="block" variant="warning" block>
          Link Event
        </Button>
      </div>
    </>
  );
};

export default EventDetail;
