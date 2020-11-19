import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import EventCard from 'components/EventCard';
import styles from 'styles/event.module.scss';

const Event = () => {
  const [events, setEvents] = useState([]);
  const getEvents = () => {
    const dataDummy = [
      {
        id: 'one',
        title: 'Workshop Untuk Guru',
        src:
          'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg',
        link: '/todo',
        date: '25 April 2021',
        time: '2PM - 5PM',
        description: 'Terra, Social enterprise, manufatrues and sells...',
      },
      {
        id: 'two',
        title: 'Workshop Untuk Siswa',
        src:
          'https://image.freepik.com/free-psd/girl-doing-stretching-exercises_23-2148253770.jpg',
        link: '/todo',
        date: '3 Mei 2021',
        time: '1PM - 5PM',
        description: 'Terra, Social enterprise, manufatrues and sells...',
      },
      {
        id: 'three',
        title: 'Workshop Untuk Mentor',
        src:
          'https://image.freepik.com/free-photo/smiling-teacher-with-drink-classroom_23-2148201042.jpg',
        link: '/todo',
        date: '25 Jun 2021',
        time: '1PM - 4PM',
        description: 'Terra, Social enterprise, manufatrues and sells...',
      },
    ];
    setEvents(dataDummy);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Layout>
      <div className={styles.eventContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            <div className="d-flex align-items-center mb-4">
              <h1 className="h3">Event Terdekat</h1>
            </div>
            <Row>
              {events.map((event) => (
                <Col key={event.id} xs={6} lg={4}>
                  <div className={styles.eventGrid}>
                    <EventCard
                      key={event.id}
                      imageUrl={event.src}
                      title={event.title}
                      date={event.date}
                      time={event.time}
                      link={`/event/${event.id}`}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Event;
