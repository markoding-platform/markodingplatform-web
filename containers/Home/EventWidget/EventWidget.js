import React from 'react';

import useEvents from 'hooks/useEvents';

import SectionCardWrapper from 'components/SectionCardWrapper';
import EventCard from 'components/EventCard';
import WidgetLoader from '../WidgetLoader';

const EventWidget = () => {
  const { data: response, error } = useEvents({
    url: '/events?limit=3&offset=0',
  });
  const result = response?.result || {};
  const { data } = result;
  const events = data || [];

  const isLoading = !response && !error;

  return (
    <>
      {isLoading && <WidgetLoader />}
      {!isLoading && events.length ? (
        <div className="pb-5">
          <SectionCardWrapper title="Event Terdekat" link="/event">
            {events.length > 0 &&
              events.map((event = {}) => (
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
