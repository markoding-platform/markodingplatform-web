import PropTypes from 'prop-types';
import React from 'react';
import { BsCalendarFill, BsClockFill } from 'react-icons/bs';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import Image from 'next/image';
import styles from 'styles/event.module.scss';
import { Button } from 'react-bootstrap';

const EventDetail = ({ event }) => {
  return (
    <Layout>
      <div className={styles.eventContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

EventDetail.propTypes = {
  event: PropTypes.instanceOf(Object).isRequired,
};

EventDetail.getInitialProps = async (ctx) => {
  const { slug } = await ctx.query;
  return {
    event: {
      id: slug,
      title: 'Workshop Untuk Guru',
      src:
        'https://image.freepik.com/free-photo/back-school-concept-books-colored-pencils-clock_155003-9212.jpg',
      link: '/todo',
      date: '25 April 2021',
      time: '2PM - 5PM',
      content: 'Terra, Social enterprise, manufatrues and sells...',
    },
  };
};

export default EventDetail;
