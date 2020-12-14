import React from 'react';

import useEvents from 'containers/hooks/useEvents';

import SectionCardWrapper from 'components/SectionCardWrapper';
import EventCard from 'components/EventCard';
import WidgetLoader from '../WidgetLoader';

const EventWidget = () => {
  const { data, error } = useEvents({ url: '/events' });
  const result = data?.result || [];
  const isLoading = !result && !error;

  return (
    <>
      {isLoading && <WidgetLoader />}
      {!isLoading && result.length ? (
        <div className="pb-5">
          <SectionCardWrapper title="Event Terdekat" link="/event">
            {data?.result.map((event) => (
              <EventCard
                key={event.id}
                imageUrl="https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg"
                title={event.title}
                date={event.date}
                time={event.time}
                link={`/event/${event.id}`}
              />
            ))}
          </SectionCardWrapper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default EventWidget;
