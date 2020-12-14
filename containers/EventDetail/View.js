// import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import { BsCalendarFill, BsClockFill } from 'react-icons/bs';

import styles from 'styles/event.module.scss';
// import useEvents from 'containers/hooks/useEvents';

const EventDetail = () => {
  // const router = useRouter();
  // const { slug } = router;
  // const { data, error } = useEvents({ url: `/events/${slug}` });
  // const result = data?.result || [];
  // const isLoading = !result && !error;
  const event = {};
  return (
    <>
      <div className="mb-4">
        <h1 className="h3">Event</h1>
      </div>
      <div>
        <Image
          src={event.src}
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
            <span>{event.date}</span>
          </p>
          <p className={styles.dateTime}>
            <BsClockFill />
            <span>{event.time}</span>
          </p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: event.content }} />
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
