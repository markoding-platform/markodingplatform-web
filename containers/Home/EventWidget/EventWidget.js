import React from 'react';

import useEvents from 'hooks/useEvents';

import SectionCardWrapper from 'components/SectionCardWrapper';
import EventCard from 'components/EventCard';
import WidgetLoader from '../WidgetLoader';

const EventWidget = () => {
  const { data, error } = useEvents({ url: '/events?limit=3&offset=0' });
  const result = data?.result || [];
  const isLoading = !data && !error;

  return (
    <>
      {isLoading && <WidgetLoader />}
      {!isLoading && result.length ? (
        <div className="pb-5">
          <SectionCardWrapper title="Event Terdekat" link="/event">
            {result.length > 0 &&
              result.map((event = {}) => (
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
