import { useCallback } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import { BsCalendarFill, BsClockFill } from 'react-icons/bs';

import styles from 'styles/event.module.scss';
import useEvents from 'hooks/useEvents';
import EventLoader from './Loader';

dayjs.locale('id');

const EventDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useEvents({ url: `/events/${slug}` });
  const event = data?.result || {};

  const handleFormatTime = useCallback((time) => {
    if (!time) return '';
    const splitTime = time.split(':');
    return `${splitTime[0]}:${splitTime[1]}`;
  }, []);

  const isLoading = !data && !error;
  if (isLoading) {
    return <EventLoader />;
  }

  const { startAt, finishAt } = event;
  const timeString =
    (startAt &&
      finishAt &&
      `${handleFormatTime(startAt)} - ${handleFormatTime(finishAt)}`) ||
    '';

  const eventLink = (link) => {
    window.location.replace(link);
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="h3">Event Terdekat</h1>
      </div>
      {!error ? (
        <>
          <div>
            <Image
              src={event.imageUrl}
              alt={event.title}
              layout="responsive"
              width={957}
              height={457}
              className="rounded"
            />
            <h1 className="h3 mt-4">{event.title}</h1>
            <div className="d-lg-flex align-items-center">
              <p className={styles.dateTime}>
                <BsCalendarFill />
                <span>
                  {`${dayjs(event.startDate).format('dddd, MMM DD YYYY')}`}
                </span>
              </p>
              <p className={styles.dateTime}>
                <BsClockFill />
                <div className="d-flex">
                  <span>{timeString}</span>
                </div>
              </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
          </div>
          <div className={styles.eventFooter}>
            <Button
              type="block"
              variant="warning"
              block
              onClick={() => eventLink(event.link)}
            >
              Link Event
            </Button>
          </div>
        </>
      ) : (
        <p className="text-danger">Data Not Found</p>
      )}
    </>
  );
};

export default EventDetail;
